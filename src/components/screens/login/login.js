/* eslint-disable max-lines */
import React, { useEffect, useState } from 'react';
import i18next from 'i18next';
import grid from 'flexboxgrid/dist/flexboxgrid.css';
import { Link } from 'react-router-dom';
import { routes } from '@constants';
import { parseSearchParams, stringifySearchParams } from '@utils/searchParams';
import { getNetworksList } from '@utils/getNetwork';
import Piwik from '@utils/piwik';
import { PrimaryButton } from '@toolbox/buttons';
import PassphraseInput from '@toolbox/passphraseInput';
import { Input } from '@toolbox/inputs';
import styles from './login.css';

const RegisterTitle = ({ t }) => (
  <div className={`${styles.titleHolder} ${grid['col-xs-10']}`}>
    <h1>
      {t('Sign in')}
    </h1>
    <p>
      {t('Don’t have an account yet? ')}
      <Link className={styles.link} to={routes.register.path}>
        {t('Create it now')}
      </Link>
    </p>
  </div>
);

/**
 * Get referer address  and redirect to, after signing in
 * @param {object} history - The history object from react-router
 */
const redirectToReferrer = (history) => {
  const { referrer, ...restParams } = parseSearchParams(history.location.search);
  const route = referrer ? `${referrer}${stringifySearchParams(restParams)}` : routes.dashboard.path;

  history.replace(route);
};

const Login = ({
  t, settings, network, history, account, login,
}) => {
  const [username, setUser] = useState('');
  const [passphrase, setPass] = useState('');
  const setPassphrase = (value) => {
    setPass(value);
  };

  const setUsername = (e) => {
    setUser(e.target.value);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    Piwik.trackingEvent('Login', 'button', 'Login submission');
    login({ id: username, password: passphrase });
  };

  const handleKeyPress = (e) => {
    if (e.charCode === 13) {
      onFormSubmit(e);
    }
  };

  useEffect(() => {
    // istanbul ignore else
    if (!settings.areTermsOfUseAccepted && network.networks?.LSK) {
      history.push(routes.termsOfUse.path);
    }

    i18next.on('languageChanged', getNetworksList);
  }, []);

  useEffect(() => {
    if (account?.access_token) {
      redirectToReferrer(history);
    }
  }, [account?.access_token]);

  return (
    <>
      <div className={`${styles.login} ${grid.row}`}>
        <div
          className={`${styles.wrapper} ${grid['col-xs-12']} ${grid['col-md-10']} ${grid['col-lg-8']}`}
        >
          <RegisterTitle t={t} />
          <form onSubmit={onFormSubmit}>
            <div className={styles.inputFields}>
              <fieldset>
                <label>{t('Username')}</label>
                <Input
                  name="username"
                  autoComplete="off"
                  onChange={setUsername}
                />
              </fieldset>
              <fieldset>
                <label>{t('Password')}</label>
                <PassphraseInput
                  name="password"
                  inputsLength={1}
                  maxInputsLength={24}
                  onFill={setPassphrase}
                  keyPress={handleKeyPress}
                />
              </fieldset>
            </div>
            <div className={`${styles.buttonsHolder}`}>
              <PrimaryButton
                className={`${styles.button} login-button`}
                type="submit"
                disabled={!passphrase.length}
              >
                {t('Sign in')}
              </PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
