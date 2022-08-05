import PropTypes from 'prop-types';
import React from 'react';
import LiskAmount from '../liskAmount';
import DiscreetMode from '../discreetMode';
import styles from './payoutAmount.css';

const PayoutAmount = ({
  token, showRounded = true, showInt, amount,
}) => (
  <div className={`${styles.wrapper} transaction-amount`}>
    <DiscreetMode shouldEvaluateForOtherAccounts>
      <span className={styles.unlock}>
        <LiskAmount
          val={amount}
          showRounded={showRounded}
          showInt={showInt}
          token={token}
        />
      </span>
    </DiscreetMode>
  </div>
);

PayoutAmount.propTypes = {
  token: PropTypes.string.isRequired,
  amount: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  showInt: PropTypes.bool,
  showRounded: PropTypes.bool,
};

export default PayoutAmount;
