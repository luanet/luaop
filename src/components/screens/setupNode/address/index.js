import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getActiveTokenAccount } from '@utils/account';
import FormComp from './form';

const Form = (props) => {
  const { t } = useTranslation();
  const account = useSelector(getActiveTokenAccount);
  return <FormComp t={t} account={account} {...props} />;
};

export default Form;
