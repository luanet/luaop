import { app, BrowserWindow } from 'electron'
import { join } from 'path'
import fs from 'fs-extra'
import { multiaddr } from 'multiaddr'
import http from 'http'
import portfinder from 'portfinder'
import { shell } from 'electron'
import i18n from 'i18next'
import { showDialog } from '../dialogs'
import store from '../common/store'

export const configExists = function (ipfsd) {
  return fs.pathExistsSync(join(ipfsd.path, 'config'))
}

export const apiFileExists = function (ipfsd) {
  return fs.pathExistsSync(join(ipfsd.path, 'api'))
}

export const rmApiFile = function (ipfsd) {
  return fs.removeSync(join(ipfsd.path, 'api'))
}

function configPath (ipfsd) {
  return join(ipfsd.path, 'config')
}

function readConfigFile (ipfsd) {
  return fs.readJsonSync(configPath(ipfsd))
}

function writeConfigFile (ipfsd, config) {
  fs.writeJsonSync(configPath(ipfsd), config, { spaces: 2 })
}

// Set default minimum and maximum of connections to maintain
// by default. This must only be called for repositories created
// by IPFS Desktop. Existing ones shall remain intact.
export const applyDefaults = function (ipfsd) {
  const config = readConfigFile(ipfsd)

  // Ensure strict CORS checking
  // See: https://github.com/ipfs/js-ipfsd-ctl/issues/333
  config.API = { HTTPHeaders: {} }

  config.Swarm = config.Swarm || {}
  config.Swarm.DisableNatPortMap = false
  config.Swarm.ConnMgr = config.Swarm.ConnMgr || {}
  config.Swarm.ConnMgr.GracePeriod = '1m'
  config.Swarm.ConnMgr.LowWater = 20
  config.Swarm.ConnMgr.HighWater = 40

  config.Discovery = config.Discovery || {}
  config.Discovery.MDNS = config.Discovery.MDNS || {}
  config.Discovery.MDNS.Enabled = true

  writeConfigFile(ipfsd, config)
}

const getRpcApiPort = (config) => getHttpPort(config.Addresses.API)
const getGatewayPort = (config) => getHttpPort(config.Addresses.Gateway)
function getHttpPort (addrs) {
  let httpUrl = null

  if (Array.isArray(addrs)) {
    httpUrl = addrs.find(v => v.includes('127.0.0.1'))
  } else {
    httpUrl = addrs
  }

  const gw = parseCfgMultiaddr(httpUrl)
  return gw.nodeAddress().port
}

// Apply one-time updates to the config of IPFS node.
// This is the place where we execute fixes and performance tweaks for existing users.
export const migrateConfig = function (ipfsd) {
  // Bump revision number when new migration rule is added
  const REVISION = 4
  const REVISION_KEY = 'daemonConfigRevision'
  const CURRENT_REVISION = store.get(REVISION_KEY, 0)

  // Migration is applied only once per revision
  if (CURRENT_REVISION >= REVISION) return

  // Read config
  let config = null
  let changed = false
  try {
    config = readConfigFile(ipfsd)
  } catch (err) {
    // This is a best effort check, dont blow up here, that should happen else where.
    console.log(`[daemon] migrateConfig: error reading config file: ${err.message || err}`)
    return
  }

  if (CURRENT_REVISION < 1) {
    // Cleanup https://github.com/ipfs-shipyard/ipfs-desktop/issues/1631
    if (config.Discovery && config.Discovery.MDNS && config.Discovery.MDNS.enabled) {
      config.Discovery.MDNS.Enabled = config.Discovery.MDNS.Enabled || true
      delete config.Discovery.MDNS.enabled
      changed = true
    }
  }

  if (CURRENT_REVISION < 3) {
    const api = config.API || {}
    const httpHeaders = api.HTTPHeaders || {}
    const accessControlAllowOrigin = httpHeaders['Access-Control-Allow-Origin'] || []

    const addURL = url => {
      if (!accessControlAllowOrigin.includes(url)) {
        accessControlAllowOrigin.push(url)
        return true
      }
      return false
    }

    const addedWebUI = addURL('https://webui.ipfs.io')
    const addedGw = addURL(`http://webui.ipfs.io.ipns.localhost:${getGatewayPort(config)}`)

    // https://github.com/ipfs/ipfs-companion/issues/1068 in go-ipfs <0.13
    // TODO: remove addedApiPort after go-ipfs 0.13 ships
    const addedApiPort = addURL(`http://127.0.0.1:${getRpcApiPort(config)}`)

    if (addedWebUI || addedGw || addedApiPort) {
      httpHeaders['Access-Control-Allow-Origin'] = accessControlAllowOrigin
      api.HTTPHeaders = httpHeaders
      config.API = api
      changed = true
    }
  }

  if (CURRENT_REVISION < 4) {
    // lower ConnMgr https://github.com/ipfs/ipfs-desktop/issues/2039
    const { GracePeriod, LowWater, HighWater } = config.Swarm.ConnMgr
    if (GracePeriod === '300s') {
      config.Swarm.ConnMgr.GracePeriod = '1m'
      changed = true
    }
    if (LowWater > 20) {
      config.Swarm.ConnMgr.LowWater = 20
      changed = true
    }
    if (HighWater > 40) {
      config.Swarm.ConnMgr.HighWater = 40
      changed = true
    }
  }

  if (changed) {
    try {
      writeConfigFile(ipfsd, config)
      store.set(REVISION_KEY, REVISION)
    } catch (err) {
      console.log(`[daemon] migrateConfig: error writing config file: ${err.message || err}`)
      return
    }
  }
  store.set(REVISION_KEY, REVISION)
}

const parseCfgMultiaddr = (addr) => (addr.includes('/http')
  ? multiaddr(addr)
  : multiaddr(addr).encapsulate('/http')
)

async function checkIfAddrIsDaemon (addr) {
  const options = {
    timeout: 3000, // 3s is plenty for localhost request
    method: 'POST',
    host: addr.address,
    port: addr.port,
    path: '/api/v0/refs?arg=/ipfs/QmUNLLsPACCz1vLxQVkXqqLX5R1X345qqfHbsf67hvA3Nn'
  }

  return new Promise(resolve => {
    const req = http.request(options, function (r) {
      resolve(r.statusCode === 200)
    })

    req.on('error', () => {
      resolve(false)
    })

    req.end()
  })
}

const findFreePort = async (port) => {
  port = Math.max(port, 1024)
  return portfinder.getPortPromise({ port })
}

async function checkPortsArray (ipfsd, addrs) {
  addrs = addrs.filter(Boolean)

  for (const addr of addrs) {
    const ma = parseCfgMultiaddr(addr)
    const port = parseInt(ma.nodeAddress().port, 10)

    if (port === 0) {
      continue
    }

    const isDaemon = await checkIfAddrIsDaemon(ma.nodeAddress())

    if (isDaemon) {
      continue
    }

    const freePort = await findFreePort(port)

    if (port !== freePort) {
      const opt = showDialog({
        title: i18n.t('multipleBusyPortsDialog.title'),
        message: i18n.t('multipleBusyPortsDialog.message'),
        type: 'error',
        buttons: [
          i18n.t('multipleBusyPortsDialog.action'),
          i18n.t('close')
        ]
      })

      if (opt === 0) {
        shell.openPath(join(ipfsd.path, 'config'))
      }

      throw new Error('ports already being used')
    }
  }
}

export const checkPorts = async function (ipfsd) {
  const config = readConfigFile(ipfsd)

  const apiIsArr = Array.isArray(config.Addresses.API)
  const gatewayIsArr = Array.isArray(config.Addresses.Gateway)

  if (apiIsArr || gatewayIsArr) {
    console.log('[daemon] custom configuration with array of API or Gateway addrs')
    return checkPortsArray(ipfsd, [].concat(config.Addresses.API, config.Addresses.Gateway))
  }

  const configApiMa = parseCfgMultiaddr(config.Addresses.API)
  const configGatewayMa = parseCfgMultiaddr(config.Addresses.Gateway)

  const isApiMaDaemon = await checkIfAddrIsDaemon(configApiMa.nodeAddress())
  const isGatewayMaDaemon = await checkIfAddrIsDaemon(configGatewayMa.nodeAddress())

  if (isApiMaDaemon && isGatewayMaDaemon) {
    console.log('[daemon] ports busy by a daemon')
    return
  }

  const apiPort = parseInt(configApiMa.nodeAddress().port, 10)
  const gatewayPort = parseInt(configGatewayMa.nodeAddress().port, 10)

  const freeGatewayPort = await findFreePort(gatewayPort)
  let freeApiPort = await findFreePort(apiPort)

  // ensure the picked ports are different
  while (freeApiPort === freeGatewayPort) {
    freeApiPort = await findFreePort(freeApiPort + 1)
  }

  const busyApiPort = apiPort !== freeApiPort
  const busyGatewayPort = gatewayPort !== freeGatewayPort

  if (!busyApiPort && !busyGatewayPort) {
    return
  }

  // two "0" in config mean "pick free ports without any prompt"
  const promptUser = (apiPort !== 0 || gatewayPort !== 0)

  if (promptUser) {
    let message = null
    let options = null

    if (busyApiPort && busyGatewayPort) {
      console.log('[daemon] api and gateway ports busy')
      message = 'busyPortsDialog'
      options = {
        port1: apiPort,
        alt1: freeApiPort,
        port2: gatewayPort,
        alt2: freeGatewayPort
      }
    } else if (busyApiPort) {
      console.log('[daemon] api port busy')
      message = 'busyPortDialog'
      options = {
        port: apiPort,
        alt: freeApiPort
      }
    } else {
      console.log('[daemon] gateway port busy')
      message = 'busyPortDialog'
      options = {
        port: gatewayPort,
        alt: freeGatewayPort
      }
    }

    const opt = showDialog({
      title: i18n.t(`${message}.title`),
      message: i18n.t(`${message}.message`, options),
      type: 'error',
      buttons: [
        i18n.t(`${message}.action`, options),
        i18n.t('close')
      ]
    })

    if (opt !== 0) {
      throw new Error('ports already being used')
    }
  }

  if (busyApiPort) {
    config.Addresses.API = config.Addresses.API.replace(apiPort.toString(), freeApiPort.toString())
  }

  if (busyGatewayPort) {
    config.Addresses.Gateway = config.Addresses.Gateway.replace(gatewayPort.toString(), freeGatewayPort.toString())
  }

  writeConfigFile(ipfsd, config)
  console.log('[daemon] ports updated')
}

export const checkValidConfig = function (ipfsd) {
  if (!fs.pathExistsSync(ipfsd.path)) {
    // If the repository doesn't exist, skip verification.
    return true
  }

  try {
    const stats = fs.statSync(ipfsd.path)
    if (!stats.isDirectory()) {
      throw new Error('IPFS_PATH must be a directory')
    }

    if (!configExists(ipfsd)) {
      // Config is generated automatically if it doesn't exist.
      return true
    }

    // This should catch errors such having no configuration file,
    // IPFS_DIR not being a directory, or the configuration file
    // being corrupted.
    readConfigFile(ipfsd)
    return true
  } catch (e) {
    // Save to error.log
    console.error(e)

    // Hide other windows so the user focus in on the dialog
    BrowserWindow.getAllWindows().forEach(w => w.hide())

    // Show blocking dialog
    showDialog({
      title: i18n.t('invalidRepositoryDialog.title'),
      message: i18n.t('invalidRepositoryDialog.message', { path: ipfsd.path }),
      buttons: [i18n.t('quit')]
    })

    // Only option is to quit
    app.quit()
  }
}
