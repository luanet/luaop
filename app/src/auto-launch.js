import { app } from 'electron'
import i18n from 'i18next'
import os from 'os'
import path from 'path'
import fs from 'fs-extra'
import untildify from 'untildify'
import createToggler from './common/create-toggler'
import store from './common/store'
import { IS_MAC, IS_WIN } from './common/consts'
import { showDialog, recoverableErrorDialog } from './dialogs'

const CFG_KEY = 'autoLaunch'

function isSupport () {
  const plat = os.platform()
  return plat === 'linux' || plat === 'win32' || plat === 'darwin'
}

function getDesktopFile () {
  return path.join(untildify('~/.config/autostart/'), 'ipfs-desktop.desktop')
}

async function enable () {
  if (app.setLoginItemSettings && (IS_MAC || IS_WIN)) {
    app.setLoginItemSettings({ openAtLogin: true })
    return
  }

  const desktop = `[Desktop Entry]
Type=Application
Version=1.0
Name=IPFS Desktop
Comment=IPFS Desktop Startup Script
Exec="${process.execPath}"
Icon=ipfs-desktop
StartupNotify=false
Terminal=false`

  await fs.outputFile(getDesktopFile(), desktop)
}

async function disable () {
  if (app.setLoginItemSettings && (IS_MAC || IS_WIN)) {
    app.setLoginItemSettings({ openAtLogin: false })
    return
  }

  await fs.remove(getDesktopFile())
}

module.exports = async function () {
  const activate = async ({ newValue, oldValue, feedback }) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('[launch on startup] unavailable during development')

      if (feedback) {
        showDialog({
          title: 'Launch at Login',
          message: 'Not available during development.',
          buttons: [i18n.t('close')]
        })
      }

      return
    }

    if (!isSupport()) {
      console.log('[launch on startup] not supported on this platform')

      if (feedback) {
        showDialog({
          title: i18n.t('launchAtLoginNotSupported.title'),
          message: i18n.t('launchAtLoginNotSupported.message'),
          buttons: [i18n.t('close')]
        })
      }

      return false
    }

    if (newValue === oldValue) return

    try {
      if (newValue === true) {
        await enable()
        console.log('[launch on startup] enabled')
      } else {
        await disable()
        console.log('[launch on startup] disabled')
      }

      return true
    } catch (err) {
      console.error(`[launch on startup] ${err.toString()}`)

      if (feedback) {
        recoverableErrorDialog(err, {
          title: i18n.t('launchAtLoginFailed.title'),
          message: i18n.t('launchAtLoginFailed.message')
        })
      }

      return false
    }
  }

  activate({ newValue: store.get(CFG_KEY, false) })
  createToggler(CFG_KEY, activate)
}

export const CONFIG_KEY = CFG_KEY
export const isSupported = isSupport
