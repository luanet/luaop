import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { settingsUpdated } from '@actions';
import { tokenMap, routes } from '@constants';
import Box from '@toolbox/box';
import BoxHeader from '@toolbox/box/header';
import BoxContent from '@toolbox/box/content';
import BoxRow from '@toolbox/box/row';
import Icon from '@toolbox/icon';
import { PrimaryButton } from '@toolbox/buttons';
import Converter from '@shared/converter';
import { fromRawLsk } from '@utils/lsk';
import { selectActiveToken } from '@store/selectors';
import LiskAmount from '../liskAmount';
import DiscreetMode from '../discreetMode';
import styles from './walletDetails.css';

const WalletDetails = ({
  t, account, className,
}) => {
  const dispatch = useDispatch();
  const token = selectActiveToken();
  const info = account.info;

  return (
    <Box className={`${styles.box} ${className}`}>
      <BoxHeader>
        <h1>{t('Wallet details')}</h1>
      </BoxHeader>
      <BoxContent className={`${styles.container} coin-container`}>
        <BoxRow
          key={`${info.address}-${token}`}
          className={`${styles.row} coin-row`}
        >
          <Link
            to={routes.wallet.path}
            onClick={() =>
              dispatch(settingsUpdated({ token: { active: token } }))}
            className={styles.link}
          >
            <Icon name={token === tokenMap.BTC.key ? 'btcIcon' : 'lskIcon'} />
            <div className={styles.details}>
              <span>
                {t('{{token}} balance', { token })}
              </span>
              <div className={styles.valuesRow}>
                <DiscreetMode>
                  <div className={`${styles.cryptoValue} balance-value`}>
                    <div><LiskAmount val={info.balance} token={token} /></div>
                    <div>
                      <Converter
                        className={styles.fiatValue}
                        value={fromRawLsk(info.balance)}
                        error=""
                      />
                    </div>
                  </div>
                  <div className={`${styles.balanceClaim} balance-claim`}>
                    <PrimaryButton
                      className={`${styles.sendButton} open-send-dialog`}
                      size="m"
                      disabled
                    >
                      Claim
                    </PrimaryButton>
                  </div>
                </DiscreetMode>
              </div>
            </div>
          </Link>
        </BoxRow>
      </BoxContent>
    </Box>
  );
};

export default WalletDetails;
