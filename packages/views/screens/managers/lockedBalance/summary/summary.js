import React from 'react';

import { MODULE_ASSETS_NAME_ID_MAP } from '@transaction/configuration/moduleAssets';
import TransactionSummary from '@transaction/components/TransactionSummary';
import { fromRawLsk } from '@token/utilities/lsk';
import { getUnlockableUnlockObjects } from '@wallet/utils/account';
import TransactionInfo from '@transaction/components/TransactionInfo';
import styles from './summary.css';

const moduleAssetId = MODULE_ASSETS_NAME_ID_MAP.unlockToken;

const Summary = ({
  currentBlockHeight,
  balanceUnlocked,
  rawTransaction,
  prevStep,
  nextStep,
  wallet,
  t,
}) => {
  const transaction = {
    nonce: wallet.sequence.nonce,
    fee: fromRawLsk(rawTransaction.selectedFee),
    asset: {
      unlockObjects: getUnlockableUnlockObjects(
        wallet.dpos?.unlocking, currentBlockHeight,
      ),
    },
  };

  const onSubmit = () => {
    nextStep({
      rawTransaction,
      actionFunction: balanceUnlocked,
    });
  };

  const onConfirmAction = {
    label: t('Confirm'),
    onClick: onSubmit,
  };
  const onCancelAction = {
    label: t('Cancel'),
    onClick: () => { prevStep(); },
  };

  return (
    <TransactionSummary
      title={t('Unlock LSK summary')}
      confirmButton={onConfirmAction}
      cancelButton={onCancelAction}
      fee={!wallet.summary.isMultisignature && rawTransaction.selectedFee.value}
      classNames={`${styles.box} ${styles.summaryContainer}`}
    >
      <TransactionInfo
        moduleAssetId={moduleAssetId}
        transaction={transaction}
        account={wallet}
        isMultisignature={wallet.summary.isMultisignature}
      />
    </TransactionSummary>
  );
};

export default Summary;
