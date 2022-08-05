import React from 'react';
import { withTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { PrimaryButton } from '@toolbox/buttons';
import DialogLink from '@toolbox/dialog/link';
import SignInTooltipWrapper from '@shared/signInTooltipWrapper';
import { selectAccountBalance } from '@store/selectors';
import EmptyBalanceTooltipWrapper from './emptyBalanceTooltipWrapper';
import styles from './balanceInfo.css';

// eslint-disable-next-line complexity
const ActionBar = ({
  address, t, activeToken,
}) => {
  const hostBalance = useSelector(selectAccountBalance);
  const disableButtons = hostBalance === 0;
  const initialValue = { recipient: address };

  const sendTitle = t('Clain {{token}}', { token: activeToken });

  return (
    <SignInTooltipWrapper position="bottom">
      <EmptyBalanceTooltipWrapper hostBalance={hostBalance}>
        <div className={styles.actionRow}>
          <DialogLink component="send" className={`${styles.button} tx-send-bt`} data={initialValue}>
            <PrimaryButton
              className={`${styles.sendButton} ${styles[activeToken]} open-send-dialog`}
              size="m"
              disabled={disableButtons}
            >
              {sendTitle}
            </PrimaryButton>
          </DialogLink>
        </div>
      </EmptyBalanceTooltipWrapper>
    </SignInTooltipWrapper>
  );
};

export default withTranslation()(ActionBar);
