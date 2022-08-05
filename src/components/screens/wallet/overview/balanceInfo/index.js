import React from 'react';
import { withTranslation } from 'react-i18next';
import { fromRawLsk } from '@utils/lsk';
import Box from '@toolbox/box';
import BoxContent from '@toolbox/box/content';
import LiskAmount from '@shared/liskAmount';
import DiscreetMode from '@shared/discreetMode';
import Converter from '@shared/converter';
import ActionBar from './actionBar';
import styles from './balanceInfo.css';

// eslint-disable-next-line complexity
const BalanceInfo = ({
  t, account, activeToken,
}) => {
  const {
    address,
    balance = 0,
  } = account ?? {};

  return (
    <Box className={`${styles.wrapper}`}>
      <BoxContent className={styles.content}>
        <h2 className={styles.title}>{t('Balance')}</h2>
        <div className={styles.valuesRow}>
          <DiscreetMode shouldEvaluateForOtherAccounts>
            <div className={`${styles.cryptoValue} balance-value`}>
              <LiskAmount val={balance} token={activeToken} />
              <Converter
                className={styles.fiatValue}
                value={fromRawLsk(balance)}
                error=""
              />
            </div>
          </DiscreetMode>
        </div>
        <ActionBar
          address={address}
          activeToken={activeToken}
        />
      </BoxContent>
    </Box>
  );
};

export default withTranslation()(BalanceInfo);
