/* istanbul ignore file */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { compose } from 'redux';

import { withRouter } from 'react-router';
import { transactionsRetrieved } from '@actions';
import {
  selectAccount,
  selectActiveToken,
  selectSettings,
  selectTransactions,
} from '@store/selectors';
import TabsContainer from '@toolbox/tabsContainer/tabsContainer';
import Transactions from './transactions';

const Wallet = ({ t }) => {
  const activeToken = useSelector(selectActiveToken);
  const dispatch = useDispatch();
  const account = useSelector(selectAccount);
  const { discreetMode } = useSelector(selectSettings);
  const { confirmed, pending } = useSelector(selectTransactions);
  const address = account.info.address;

  useEffect(() => {
    dispatch(transactionsRetrieved({ address }));
  }, [confirmed.length]);

  return (
    <section>
      <TabsContainer name="main-tabs">
        <Transactions
          pending={pending || []}
          confirmedLength={confirmed.length}
          activeToken={activeToken}
          discreetMode={discreetMode}
          name={t('Payout')}
          id="Transactions"
          address={address}
        />
      </TabsContainer>
    </section>
  );
};

export default compose(withRouter, withTranslation())(Wallet);
