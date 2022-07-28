import React from 'react';
import { withTranslation } from 'react-i18next';
import grid from 'flexboxgrid/dist/flexboxgrid.css';
import PassphraseRenderer from '@shared/passphraseRenderer';
import { TertiaryButton } from '@toolbox/buttons';
import registerStyles from './register.css';
import styles from './confirmPassphrase.css';

class ConfirmPassphrase extends React.Component {
  render() {
    const {
      t, account, otp, setOtp, prevStep, nextStep,
    } = this.props;

    if (otp.error !== '') {
      return (
        <>
          <div className={`${registerStyles.titleHolder} ${grid['col-xs-10']}`}>
            <h1>
              {t('Create Account Failed')}
            </h1>
            <p className={styles.warning}>{t(otp.error.message)}</p>
          </div>

          <div className={`${grid['col-sm-10']} ${styles.passphraseContainer}`}>
            <TertiaryButton
              className={styles.editBtn}
              onClick={prevStep}
            >
              {t('Go back')}
            </TertiaryButton>

          </div>
        </>
      );
    }

    return (
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
  }
}

export default withTranslation()(ConfirmPassphrase);
