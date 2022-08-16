import { app, ipcMain } from 'electron'
import fs from 'fs-extra'
import { join } from 'path'
import { ipfsNotRunningDialog } from '../dialogs'
import store from '../common/store'
import { STATUS } from './consts'
import createDaemon from './daemon'

export const setupDaemon = async function (ctx) {
  let ipfsd = null
  let status = null
  let wasOnline = null

  const updateStatus = (stat, id = null) => {
    status = stat
    ipcMain.emit('ipfsd', status, id)
  }

  const getIpfsd = async (optional = false) => {
    if (optional) {
      return ipfsd
    }

    if (!ipfsd) {
      await ipfsNotRunningDialog(ctx)
    }

    return ipfsd
  }

  const runAndStatus = (fn) => async () => {
    await fn()
    return status
  }

  const startIpfs = async () => {
    if (ipfsd) {
      return
    }

    console.log('[ipfsd] start daemon', { withAnalytics: 'DAEMON_START' })
    const config = store.get('ipfsConfig')
    updateStatus(STATUS.STARTING_STARTED)

    const res = await createDaemon(config)

    if (res.err) {
      console.log(res.err)
      updateStatus(STATUS.STARTING_FAILED)
      return
    }

    ipfsd = res.ipfsd

    console.log(`[daemon] IPFS_PATH: ${ipfsd.path}`)
    console.log(`[daemon] PeerID:    ${res.id}`)

    // Update the path if it was blank previously.
    // This way we use the default path when it is
    // not set.
    if (!config.path || typeof config.path !== 'string') {
      config.path = ipfsd.path
      store.set('ipfsConfig', config)
    }

    updateStatus(STATUS.STARTING_FINISHED, res.id)
  }

  const stopIpfs = async () => {
    if (!ipfsd) {
      return
    }

    const log = console.log('[ipfsd] stop daemon', { withAnalytics: 'DAEMON_STOP' })
    updateStatus(STATUS.STOPPING_STARTED)

    if (!fs.pathExistsSync(join(ipfsd.path, 'config'))) {
      // Is remote api... ignore
      ipfsd = null
      updateStatus(STATUS.STOPPING_FINISHED)
      return
    }

    try {
      await ipfsd.stop()
      log.end()
      updateStatus(STATUS.STOPPING_FINISHED)
    } catch (err) {
      console.error(`[ipfsd] ${err.toString()}`)
      updateStatus(STATUS.STOPPING_FAILED)
    } finally {
      ipfsd = null
    }
  }

  const restartIpfs = async () => {
    await stopIpfs()
    await startIpfs()
  }

  ctx.startIpfs = runAndStatus(startIpfs)
  ctx.stopIpfs = runAndStatus(stopIpfs)
  ctx.restartIpfs = runAndStatus(restartIpfs)
  ctx.getIpfsd = getIpfsd

  ipcMain.on('ipfsConfigChanged', restartIpfs)

  app.on('before-quit', async () => {
    if (ipfsd) await stopIpfs()
  })

  await startIpfs()

  ipcMain.on('online-status-changed', (_, isOnline) => {
    if (wasOnline === false && isOnline && ipfsd) {
      restartIpfs()
    }

    wasOnline = isOnline
  })
}
