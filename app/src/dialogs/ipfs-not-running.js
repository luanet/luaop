import i18n from 'i18next'
import dialog from './dialog'
import { STATUS } from '../daemon/consts'

export const ipfsNotRunningDialog = async function ({ startIpfs }) {
  console.log('[ipfs-not-running] an action needs ipfs to be running')

  const option = dialog({
    title: i18n.t('ipfsNotRunningDialog.title'),
    message: i18n.t('ipfsNotRunningDialog.message'),
    buttons: [
      i18n.t('start'),
      i18n.t('cancel')
    ]
  })

  if (option !== 0) {
    return false
  }

  return (await startIpfs()) === STATUS.STARTING_FINISHED
}
