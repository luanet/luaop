import { app, dialog } from 'electron'
import i18n from 'i18next'

export const selectDirectory = async function (options = {}) {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    title: i18n.t('selectDirectory'),
    defaultPath: app.getPath('home'),
    properties: [
      'openDirectory',
      'createDirectory'
    ],
    ...options
  })

  if (canceled || filePaths.length === 0) {
    return
  }

  return filePaths[0]
}
