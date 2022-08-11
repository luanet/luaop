/* istanbul ignore file */
import React from 'react';
import { useSelector } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { compose } from 'redux';

import { withRouter } from 'react-router';
import {
  selectAccount,
  selectActiveToken,
  selectSettings,
} from '@store/selectors';
import TabsContainer from '@toolbox/tabsContainer/tabsContainer';
import Transactions from './transactions';

const Wallet = ({ t }) => {
  const activeToken = useSelector(selectActiveToken);
  const account = useSelector(selectAccount);
  const { discreetMode } = useSelector(selectSettings);
  const address = account.info.address;

  return (
    <section>
      <TabsContainer name="main-tabs">
        <Transactions
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
