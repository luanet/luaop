import { withTranslation } from 'react-i18next';
import React from 'react';
import grid from 'flexboxgrid/dist/flexboxgrid.css';
import { PrimaryButton } from '@toolbox/buttons';
import PassphraseInput from '@toolbox/passphraseInput';
import { Input } from '@toolbox/inputs';
import registerStyles from './register.css';

const BackupPassphrase = ({
  t, setEmail, setPassword, setConfirmPassword, nextStep,
}) => (
  <>
    <div className={`${registerStyles.titleHolder}`}>
      <h1>
        {t('Register your account')}
      </h1>
      <p>{t('Keep it safe as it is the only way to access your nodes.')}</p>
    </div>
    <div className={`${grid['col-sm-10']} ${registerStyles.passphraseBackupContainer} ${registerStyles.inputFields}`}>
      <fieldset>
        <label>{t('Email')}</label>
        <Input
          name="email"
          autoComplete="off"
          onChange={setEmail}
        />
      </fieldset>
      <fieldset>
        <label>{t('Password')}</label>
        <PassphraseInput
          name="password"
          inputsLength={1}
          maxInputsLength={24}
          onFill={setPassword}
        />
      </fieldset>
      <fieldset>
        <label>{t('Confirm Password')}</label>
        <PassphraseInput
          name="confirm-password"
          inputsLength={1}
          maxInputsLength={24}
          onFill={setConfirmPassword}
        />
      </fieldset>
    </div>

    <div className={`${registerStyles.buttonsHolder} ${grid.row}`}>
      <span className={`${registerStyles.button}`}>
        <PrimaryButton
          className={`${registerStyles.continueBtn} yes-its-safe-button`}
          onClick={() => nextStep()}
        >
          {t('Confirm')}
        </PrimaryButton>
      </span>
    </div>
  </>
);

export default withTranslation()(BackupPassphrase);
