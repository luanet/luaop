import React from 'react';
import Waypoint from 'react-waypoint';
import tableStyle from 'react-toolbox/lib/table/theme.css';
import buttonStyle from 'react-toolbox/lib/button/theme.css';
import offlineStyle from '../offlineWrapper/offlineWrapper.css';
import CopyToClipboard from '../copyToClipboard';
import RelativeLink from '../relativeLink';
import TransactionRow from './transactionRow';
import TransactionsHeader from './transactionsHeader';
import LiskAmount from '../liskAmount';
import styles from './transactions.css';

class Transactions extends React.Component {
  constructor() {
    super();
    this.canLoadMore = true;
  }

  loadMore() {
    if (this.canLoadMore) {
      this.canLoadMore = false;
      this.props.transactionsRequested({
        activePeer: this.props.activePeer,
        address: this.props.address,
        limit: 20,
        offset: this.props.transactions.length,
      });
    }
  }

  componentDidUpdate() {
    const { count, transactions } = this.props;
    this.canLoadMore = count === null || count > transactions.length;
  }

  render() {
    return (
      <div>
        <div className={`transactions box ${styles.transactions} `}>
          <header>
            <h2 className={styles.title}>{this.props.t('Transactions')}</h2>
            <div className={styles.account}>
              <h2>
                <span>
                  <LiskAmount val={this.props.balance} />&nbsp;
                </span>
                <small className={styles.balanceUnit}>LSK</small>
              </h2>
              <CopyToClipboard value={this.props.address}
                className={`${styles.subTitle} ${styles.address}`} />
            </div>
          </header>

          <ul className={styles.list}>
            <li className={`${styles.item} ${styles.active}`}>All</li>
            <li className={styles.item}>Incoming</li>
            <li className={styles.item}>Outgoing</li>
            <li className={styles.item}>Other</li>
          </ul>

          {this.props.transactions.length > 0 ?
            <div className={`${styles.results} transaction-results`}>
              <TransactionsHeader tableStyle={tableStyle}></TransactionsHeader>
              {this.props.transactions.map(transaction => (
                <TransactionRow address={this.props.address}
                  key={transaction.id}
                  t={this.props.t}
                  value={transaction} />
              ))}
              <Waypoint bottomOffset='-80%'
                key={this.props.transactions.length}
                onEnter={this.loadMore.bind(this)}></Waypoint>
            </div> :
            <p className={`${styles.empty} hasPaddingRow empty-message`}>
              {this.props.t('There are no transactions, yet.')} &nbsp;
              <RelativeLink className={`${styles.button} ${buttonStyle.button} ${buttonStyle.primary} ${buttonStyle.raised} receive-lsk-button ${offlineStyle.disableWhenOffline}`}
                to='receive'>{this.props.t('Receive LSK')}</RelativeLink>
            </p>
          }
        </div>
      </div>
    );
  }
}

export default Transactions;
