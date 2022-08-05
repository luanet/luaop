/* eslint-disable max-statements */
import React from 'react';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import grid from 'flexboxgrid/dist/flexboxgrid.css';
import { withRouter } from 'react-router';
import BalanceInfo from './balanceInfo';
import styles from './overview.css';

const Overview = ({
  t,
  discreetMode,
  account,
  activeToken,
}) => {
  const {
    address,
  } = account?.address ?? {};

  return (
    <section className={`${grid.row} ${styles.wrapper}`}>
      <div
        className={`${grid['col-xs-6']} ${grid['col-md-3']} ${grid['col-lg-3']}`}
      >
        <BalanceInfo
          t={t}
          isDiscreetMode={discreetMode}
          account={account}
          address={address}
          activeToken={activeToken}
        />
      </div>
    </section>
  );
};

export default compose(
  withRouter,
  withTranslation(),
)(Overview);
