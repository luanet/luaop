import { txStatusTypes } from '@constants';

const illustrations = {
  default: {
    [txStatusTypes.signatureSuccess]: 'transactionPending',
    [txStatusTypes.broadcastSuccess]: 'transactionSuccess',
    [txStatusTypes.broadcastError]: 'transactionError',
    [txStatusTypes.signatureError]: 'transactionError',
    [txStatusTypes.hwRejected]: 'HwRejection',
  },
  vote: {
    [txStatusTypes.signatureSuccess]: 'votingSuccess',
    [txStatusTypes.broadcastSuccess]: 'votingSuccess',
    [txStatusTypes.broadcastError]: 'transactionError',
    [txStatusTypes.signatureError]: 'transactionError',
    [txStatusTypes.hwRejected]: 'HwRejection',
  },
  registerMultisignature: {
    [txStatusTypes.signatureSuccess]: 'registerMultisignatureSuccess',
    [txStatusTypes.broadcastSuccess]: 'registerMultisignatureSuccess',
    [txStatusTypes.broadcastError]: 'registerMultisignatureError',
    [txStatusTypes.signatureError]: 'registerMultisignatureError',
    [txStatusTypes.hwRejected]: 'HwRejection',
  },
  signMultisignature: {
    [txStatusTypes.multisigSignaturePartialSuccess]: 'multisignaturePartialSuccess',
    [txStatusTypes.multisigSignatureSuccess]: 'multisignaturePartialSuccess',
    [txStatusTypes.signatureSuccess]: 'registerMultisignatureSuccess',
    [txStatusTypes.signatureError]: 'registerMultisignatureError',
    [txStatusTypes.broadcastSuccess]: 'transactionSuccess',
    [txStatusTypes.broadcastError]: 'transactionError',
    [txStatusTypes.hwRejected]: 'HwRejection',
  },
};
