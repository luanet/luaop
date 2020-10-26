import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import LiskAmount from '../../../shared/liskAmount';
import routes from '../../../../constants/routes';
import { tokenMap } from '../../../../constants/tokens';

import { Context } from '../transactionDetails';
import styles from './styles.css';

const TransactionVotes = ({ t }) => {
  const { transaction, delegates } = useContext(Context);

  const accountPath = routes.account.path;
  const { votes } = transaction.asset;

  useEffect(() => {
    if (transaction.asset) {
      const addressList = votes.map(item => item.delegateAddress);
      delegates.loadData({ addressList });
    }
  }, []);

  return (
    <div className={`${styles.value} ${styles.votes}`}>
      <div className={styles.detailsWrapper}>
        <span className={styles.label}>
          {`${t('Votes')} (${votes.length})`}
        </span>
        <div className={`${styles.votesContainer} ${styles.added} tx-added-votes`}>
          {votes.map(vote => (
            <Link
              key={vote.delegateAddress}
              to={`${accountPath}?address=${vote.delegateAddress}`}
              className={`${styles.voteTag} voter-address`}
            >
              <span className={styles.username}>
                {delegates[vote.delegateAddress]
                  ? delegates[vote.delegateAddress].username
                  : vote.delegateAddress
                }
              </span>
              <span className={styles.voteAmount}>
                <LiskAmount val={vote.amount} token={tokenMap.LSK.key} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionVotes;
