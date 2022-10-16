import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import i18next from 'i18next';
import Box from '@toolbox/box';
import BoxHeader from '@toolbox/box/header';
import BoxContent from '@toolbox/box/content';
import BoxRow from '@toolbox/box/row';
import Icon from '@toolbox/icon';
import { PrimaryButton } from '@toolbox/buttons';
import Converter from '@shared/converter';
import { fromRawLsk } from '@utils/lsk';
import { selectActiveToken } from '@store/selectors';
import { useWeb3React } from '@web3-react/core';
import walletlink from './connectors';
import LiskAmount from '../liskAmount';
import DiscreetMode from '../discreetMode';
import styles from './walletDetails.css';

const WalletDetails = ({
  t, accountInfo, className,
}) => {
  const {
    library,
    activate,
    account,
    active,
  } = useWeb3React();
  const token = selectActiveToken();
  // TODO: Disconnect account
  const claim = async () => {
    if (!library) return;
    const tx = {
      to: '0x9b86168926bf73D69514955B9d09c083Bc39FE6d',
      from: account,
      value: '0x38D7EA4C68000',
    };

    try {
      const hash = await library.provider.request({
        method: 'eth_sendTransaction',
        params: [tx],
      });

      const msg = i18next.t(`Claim success, transaction hash: ${hash}`);
      toast.info(msg);
    } catch (error) {
      const msg = i18next.t(`Unable to send transaction: ${error.message}`);
      toast.error(msg);
    }
  };

  const setProvider = (type) => {
    window.localStorage.setItem('provider', type);
  };

  useEffect(() => {
    const provider = window.localStorage.getItem('provider');
    if (provider === 'coinbaseWallet') {
      activate(walletlink);
    }
  }, []);

  if (active) {
    setProvider('coinbaseWallet');
  }

  return (
    <Box className={`${styles.box} ${className}`}>
      <BoxHeader>
        <h1>{t('Wallet details')}</h1>
      </BoxHeader>
      <BoxContent className={`${styles.container} coin-container`}>
        <BoxRow
          key={`${accountInfo.address}-${token}`}
          className={`${styles.row} coin-row`}
        >
          <Link
            to="#"
            onClick={(e) => {
              if (e.target.localName === 'div') {
                window.open(`https://polygonscan.com/address/${account}`, '_blank', 'rel=noopener noreferrer');
              }

              e.preventDefault();
            }}
            className={styles.link}
          >
            <Icon name="walletIconActive" />
            <div className={styles.details}>
              <span>
                {t('Balance', { token })}
              </span>
              <div className={styles.valuesRow}>
                <DiscreetMode>
                  <div className={`${styles.cryptoValue} balance-value`}>
                    <div><LiskAmount val={accountInfo.balance} token={token} /></div>
                    <div>
                      <Converter
                        className={styles.fiatValue}
                        value={fromRawLsk(accountInfo.balance)}
                        error=""
                      />
                    </div>
                    <div className={`${styles.balanceClaim} balance-claim`}>
                      {!active ? (
                        <PrimaryButton
                          className={`${styles.sendButton} open-send-dialog`}
                          size="m"
                          onClick={() => {
                            activate(walletlink);
                          }}
                        >
                          Connect Wallet
                        </PrimaryButton>
                      ) : (
                        <div>
                          <PrimaryButton
                            className={`${styles.sendButton} open-send-dialog`}
                            size="m"
                            onClick={claim}
                          >
                            Claim
                          </PrimaryButton>
                        </div>
                      )}
                    </div>
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
