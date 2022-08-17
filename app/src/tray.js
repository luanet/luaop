import { Menu, Tray, shell, app, ipcMain } from 'electron'
import i18n from 'i18next'
import path from 'path'
import logger from 'electron-log'
import store from './common/store'
import { STATUS } from './daemon/consts'
import { IS_MAC, IS_WIN, VERSION, GO_IPFS_VERSION } from './common/consts'

function buildCheckbox (key, label) {
  return {
    id: key,
    label: i18n.t(label),
    click: () => { ipcMain.emit(`toggle_${key}`) },
    type: 'checkbox',
    checked: false
  }
}

// Notes on this: we are only supporting accelerators on macOS for now because
// they natively work as soon as the menu opens. They don't work like that on Windows
// or other OSes and must be registered globally. They still collide with global
// accelerator. Please see ../utils/setup-global-shortcut.js for more info.
function buildMenu (ctx) {
  return Menu.buildFromTemplate([
    ...[
      ['ipfsIsStarting', 'IPFS Is Starting', 'yellow'],
      ['ipfsIsRunning', 'IPFS Is Running', 'green'],
      ['ipfsIsStopping', 'IPFS Is Stopping', 'yellow'],
      ['ipfsIsNotRunning', 'IPFS Is Not Running', 'gray'],
      ['ipfsHasErrored', 'IPFS Has Errored', 'red'],
    ].map(([id, status, color]) => ({
      id: id,
      label: i18n.t(status),
      visible: false,
      enabled: false,
      icon: path.resolve(path.join(__dirname, `../assets/icons/status/${color}.png`))
    })),
    {
      label: IS_MAC ? i18n.t('Preferences') : i18n.t('Settings'),
      submenu: [
        buildCheckbox('autoLaunch', 'Launch On Startup'),
      ]
    },
    {
      label: i18n.t('About'),
      submenu: [
        {
          label: i18n.t('Versions'),
          enabled: false
        },
        {
          label: `ipfs-desktop ${VERSION}`,
          click: () => { shell.openExternal(`https://github.com/ipfs-shipyard/ipfs-desktop/releases/v${VERSION}`) }
        },
        { type: 'separator' },
        {
          id: 'checkForUpdates',
          label: i18n.t('Check For Updates'),
          click: () => { ctx.manualCheckForUpdates() }
        },
        { type: 'separator' },
        {
          label: i18n.t('View On GitHub'),
          click: () => { shell.openExternal('https://github.com/ipfs-shipyard/ipfs-desktop/blob/master/README.md') }
        }
      ]
    },
    {
      label: i18n.t('Quit'),
      click: () => { app.quit() },
      accelerator: IS_MAC ? 'Command+Q' : null
    }
  ])
}

const on = 'on'
const off = 'off'

function icon (color) {
  const dir = path.resolve(path.join(__dirname, '../assets/icons/tray'))

  if (!IS_MAC) {
    return path.join(dir, `${color}-big.png`)
  }

  return path.join(dir, `${color}-22Template.png`)
}

// Ok this one is pretty ridiculous:
// Tray must be global or it will break due to GC:
// https://www.electronjs.org/docs/faq#my-apps-tray-disappeared-after-a-few-minutes
let tray = null

export const setupTray = function (ctx) {
  logger.info('[tray] starting')
  tray = new Tray(icon(off))
  let menu = null

  const state = {
    status: null,
    gcRunning: false,
    isUpdating: false
  }

  const popupMenu = (event) => {
    // https://github.com/ipfs-shipyard/ipfs-desktop/issues/1762 ¯\_(ツ)_/¯
    if (event && typeof event.preventDefault === 'function') event.preventDefault()

    tray.popUpContextMenu()
  }

  if (!IS_MAC) {
    // Show the context menu on left click on other
    // platforms than macOS.
    tray.on('click', popupMenu)
  }
  tray.on('right-click', popupMenu)
  tray.on('double-click', () => ctx.launchWebUI('/'))

  const setupMenu = () => {
    menu = buildMenu(ctx)

    tray.setContextMenu(menu)
    tray.setToolTip('IPFS Desktop')

    menu.on('menu-will-show', () => { ipcMain.emit('menubar-will-open') })
    menu.on('menu-will-close', () => { ipcMain.emit('menubar-will-close') })

    updateMenu()
  }

  const updateMenu = () => {
    const { status, gcRunning, isUpdating } = state
    const errored = status === STATUS.STARTING_FAILED || status === STATUS.STOPPING_FAILED

    menu.getMenuItemById('ipfsIsStarting').visible = status === STATUS.STARTING_STARTED && !gcRunning && !isUpdating
    menu.getMenuItemById('ipfsIsRunning').visible = status === STATUS.STARTING_FINISHED && !gcRunning && !isUpdating
    menu.getMenuItemById('ipfsIsStopping').visible = status === STATUS.STOPPING_STARTED && !gcRunning && !isUpdating
    menu.getMenuItemById('ipfsIsNotRunning').visible = status === STATUS.STOPPING_FINISHED && !gcRunning && !isUpdating
    menu.getMenuItemById('ipfsHasErrored').visible = errored && !gcRunning && !isUpdating

    menu.getMenuItemById('checkForUpdates').enabled = !isUpdating
    menu.getMenuItemById('checkForUpdates').visible = !isUpdating

    if (status === STATUS.STARTING_FINISHED) {
      tray.setImage(icon(on))
    } else {
      tray.setImage(icon(off))
    }

    if (!IS_MAC && !IS_WIN) {
      // On Linux, in order for changes made to individual MenuItems to take effect,
      // you have to call setContextMenu again - https://electronjs.org/docs/api/tray
      tray.setContextMenu(menu)
    }
  }

  ipcMain.on('ipfsd', status => {
    state.status = status
    updateMenu()
  })

  ipcMain.on('gcRunning', () => {
    state.gcRunning = true
    updateMenu()
  })

  ipcMain.on('gcEnded', () => {
    state.gcRunning = false
    updateMenu()
  })

  ipcMain.on('updating', () => {
    state.isUpdating = true
    updateMenu()
  })

  ipcMain.on('updatingEnded', () => {
    state.isUpdating = false
    updateMenu()
  })

  ipcMain.on('configUpdated', () => { updateMenu() })
  ipcMain.on('languageUpdated', () => { setupMenu() })

  setupMenu()

  ctx.tray = tray
  logger.info('[tray] started')
}
