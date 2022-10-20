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
import { selectActiveToken } from '@store/selectors';
import { useWeb3React } from '@web3-react/core';
import { getClaimData, submitClaimTx } from '@api/payout/claim';
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
  const claim = async () => {
    if (!library) return;
    const data = await getClaimData({ accessToken: accountInfo.access_token, address: account });
    const tx = {
      to: '0x70bd651f368e1b2dd75f959eefc2e574Af434Ed6', // testnet
      from: account,
      value: '0x0',
      data: data.input,
    };

    try {
      const hash = await library.provider.request({
        method: 'eth_sendTransaction',
        params: [tx],
      });

      await submitClaimTx({ accessToken: accountInfo.access_token, tx: hash });
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
          key={`${accountInfo.info.address}-${token}`}
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
              <span className={styles.valuesRow}>
                <DiscreetMode>
                  <div className={`${styles.cryptoValue}`}>
                    <div>{t('Balance', { token })}</div>
                    <div className={`${styles.wrapper}`}>{t('Unclaimed Balance', { token })}</div>
                  </div>
                </DiscreetMode>
              </span>
              <div className={styles.valuesRow}>
                <DiscreetMode>
                  <div className={`${styles.cryptoValue} balance-value`}>
                    <div><LiskAmount val={accountInfo.info.balance} token={token} /></div>
                    <div className={`${styles.wrapper} ${styles.fiatValue}`}>
                      <span className={`${styles.price} converted-price`}>
                        {(accountInfo.info.lock_balance + accountInfo.info.balance) / 1e6}
                        {' LUA'}
                      </span>
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
