import React from 'react';
import { withTranslation } from 'react-i18next';
import grid from 'flexboxgrid/dist/flexboxgrid.css';
import PassphraseRenderer from '@shared/passphraseRenderer';
import registerStyles from './register.css';
import styles from './confirmPassphrase.css';

const ConfirmPassphrase = ({
  t, account, setOtp, prevStep, nextStep,
}) => (
  <>
    <div className={`${registerStyles.titleHolder} ${grid['col-xs-10']}`}>
      <h1>
        {t('Confirm your OTP')}
      </h1>
      <p className={styles.text}>{t('We have sent an OTP to your email.')}</p>
    </div>

    <div className={`${grid['col-sm-10']} ${styles.passphraseContainer}`}>
      <PassphraseRenderer
        showInfo
        passphrase="1 2 3 4 5 6"
        nextStep={nextStep}
        prevStep={prevStep}
        account={account}
        setOtp={setOtp}
        isConfirmation
      />
    </div>
  </>
);

export default withTranslation()(ConfirmPassphrase);
