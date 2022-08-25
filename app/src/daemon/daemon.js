import { createController } from 'ipfsd-ctl'
import i18n from 'i18next'
import { showDialog } from '../dialogs'
import { applyDefaults, migrateConfig, checkPorts, configExists, checkValidConfig, rmApiFile, apiFileExists } from './config'
import * as ipfsHttpModule from 'ipfs-http-client'
import log from 'electron-log'
import { path as ipfsPath } from 'go-ipfs'

function cannotConnectDialog (addr) {
  showDialog({
    title: i18n.t('cannotConnectToApiDialog.title'),
    message: i18n.t('cannotConnectToApiDialog.message', { addr }),
    type: 'error',
    buttons: [
      i18n.t('close')
    ]
  })
}

async function spawn ({ flags, repo }) {
  const ipfsBin = ipfsPath();
  log.info(`ipfs bin path: ${ipfsBin}`);
  const ipfsd = await createController({
    ipfsHttpModule,
    ipfsBin,
    ipfsOptions: {
      repo: repo
    },
    remote: false,
    disposable: false,
    test: false,
    args: flags
  })

  if (!checkValidConfig(ipfsd)) {
    throw new Error(`repository at ${ipfsd.path} is invalid`)
  }

  if (configExists(ipfsd)) {
    migrateConfig(ipfsd)
    return { ipfsd, isRemote: false }
  }

  // If config does not exist, but $IPFS_PATH/api exists, then
  // it is a remote repository.
  if (apiFileExists(ipfsd)) {
    return { ipfsd, isRemote: true }
  }

  await ipfsd.init()

  applyDefaults(ipfsd)
  return { ipfsd, isRemote: false }
}

function listenToIpfsLogs (ipfsd, callback) {
  let stdout, stderr

  const listener = data => {
    callback(data.toString())
  }

  const interval = setInterval(() => {
    if (!ipfsd.subprocess) {
      return
    }

    stdout = ipfsd.subprocess.stdout
    stderr = ipfsd.subprocess.stderr

    stdout.on('data', listener)
    stderr.on('data', listener)

    clearInterval(interval)
  }, 20)

  const stop = () => {
    clearInterval(interval)

    if (stdout) stdout.removeListener('data', listener)
    if (stderr) stderr.removeListener('data', listener)
  }

  return stop
}

async function startIpfsWithLogs (ipfsd) {
  let err, id
  let isMigrating, isErrored, isFinished
  let logs = ''

  const isSpawnedDaemonDead = (ipfsd) => {
    if (typeof ipfsd.subprocess === 'undefined') throw new Error('undefined ipfsd.subprocess, unable to reason about startup errors')
    if (ipfsd.subprocess === null) return false // not spawned yet or remote
    if (ipfsd.subprocess?.failed) return true // explicit failure

    // detect when spawned ipfsd process is gone/dead
    // by inspecting its pid - it should be alive
    const { pid } = ipfsd.subprocess
    try {
      // signal 0 throws if process is missing, noop otherwise
      process.kill(pid, 0)
      return false
    } catch (e) {
      return true
    }
  }

  const stopListening = listenToIpfsLogs(ipfsd, data => {
    logs += data.toString()
    const line = data.toLowerCase()
    isMigrating = isMigrating || line.includes('migration')
    isErrored = isErrored || isSpawnedDaemonDead(ipfsd)
    isFinished = isFinished || line.includes('daemon is ready')

    if (!isMigrating && !isErrored) {
      return
    }
  })

  try {
    await ipfsd.start()
    const idRes = await ipfsd.api.id()
    id = idRes.id
  } catch (e) {
    err = e
  } finally {
    // stop monitoring daemon output - we only care about startup phase
    stopListening()

    // Show startup error using the same UI as migrations.
    // This is catch-all that will show stdout/stderr of ipfs daemon
    // that failed to start, allowing user to self-diagnose or report issue.
    isErrored = isErrored || isSpawnedDaemonDead(ipfsd)
    if (isErrored) { // save daemon output to error.log
      if (logs.trim().length === 0) {
        logs = 'ipfs daemon failed to start and produced no output (see error.log for details)'
      }

      console.error(logs)
    }
  }

  return {
    err, id, logs
  }
}

export default async function (opts) {
  let ipfsd, isRemote

  try {
    log.info('Starting ipfs daemon')
    const res = await spawn(opts)
    ipfsd = res.ipfsd
    isRemote = res.isRemote
  } catch (err) {
    return { err: err.toString() }
  }

  if (!isRemote) {
    try {
      await checkPorts(ipfsd)
    } catch (err) {
      return { err }
    }
  }

  let errLogs = await startIpfsWithLogs(ipfsd)
  log.info('Started daemon')
  if (errLogs.err) {
    if (!errLogs.err.message.includes('ECONNREFUSED') && !errLogs.err.message.includes('ERR_CONNECTION_REFUSED')) {
      return { ipfsd, err: errLogs.err, logs: errLogs.logs }
    }

    if (!configExists(ipfsd)) {
      cannotConnectDialog(ipfsd.apiAddr.toString())
      return { ipfsd, err: errLogs.err, logs: errLogs.logs }
    }

    rmApiFile(ipfsd)
    errLogs = await startIpfsWithLogs(ipfsd)
  }

  return { ipfsd, err: errLogs.err, logs: errLogs.logs, id: errLogs.id }
}
