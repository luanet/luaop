import React from 'react';
import { withTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import grid from 'flexboxgrid/dist/flexboxgrid.css';
import { routes } from '@constants';
import { PrimaryButton, TertiaryButton } from '@toolbox/buttons';
import Illustration from '../../toolbox/illustration';

import registerStyles from './register.css';
import styles from './accountCreated.css';

class AccountCreated extends React.Component {
  render() {
    const { t, accountInfo, prevStep } = this.props;
    if (accountInfo.error !== '') {
      return (
        <>
          <div className={`${registerStyles.titleHolder} ${grid['col-xs-10']}`}>
            <h1>
              {t('Confirm OTP Failed')}
            </h1>
            <p className={styles.warning}>{t(accountInfo.error.message)}</p>
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
        <div className={`${registerStyles.titleHolder}`}>
          <h1>
            {t('Perfect! You\'re all set')}
          </h1>
          <p className={styles.text}>{t('You can now start sending and receiving LSK tokens')}</p>
        </div>
        <Illustration className={styles.illustration} name="registrationSuccess" />
        <div className={`${registerStyles.buttonsHolder} ${grid.row}`}>
          <Link
            className={`${registerStyles.button} login-button`}
            to={routes.login.path}
          >
            <PrimaryButton className={registerStyles.continueBtn}>
              {t('Continue to sign in')}
            </PrimaryButton>
          </Link>
        </div>
      </>
    );
  }
}

export default withTranslation()(AccountCreated);
