import { toast } from 'react-toastify';
import {
  networks, actionTypes, networkKeys,
  MODULE_ASSETS_NAME_ID_MAP, tokenMap,
  timeOutId, timeOutWarningId,
} from '@constants';
import { fromRawLsk, delay } from '@utils/lsk';
import { getActiveTokenAccount } from '@utils/account';
import {
  settingsUpdated, networkSelected, networkStatusUpdated, accountDataUpdated,
  emptyTransactionsData, transactionsRetrieved,
} from '@actions';
import analytics from '@utils/analytics';
import { getTransactions } from '@api/transaction';
import i18n from '../../i18n';

const filterIncomingTransactions = (transactions, account) =>
  transactions.filter(transaction => (
    transaction
    && transaction.moduleAssetId === MODULE_ASSETS_NAME_ID_MAP.transfer
    && transaction.asset.recipient?.address === account.summary?.address
  ));

const showNotificationsForIncomingTransactions = (transactions, account, token) => {
  filterIncomingTransactions(transactions, account).forEach((transaction) => {
    const amount = fromRawLsk(transaction.asset.amount);
    if (amount > 0) {
      const message = transaction.asset.data
        ? i18n.t('with message {{message}}', { message: transaction.asset.data })
        : '';
      // eslint-disable-next-line no-new
      new Notification(i18n.t('{{amount}} {{token}} Received', { amount, token }), {
        body: i18n.t('Your account just received {{amount}} {{token}} {{message}}', { amount, token, message }),
      });
    }
  });
};

// eslint-disable-next-line max-statements
const checkTransactionsAndUpdateAccount = async (store, action) => {
  const state = store.getState();
  const { transactions, settings: { token }, network } = state;
  const account = getActiveTokenAccount(store.getState());
  const { numberOfTransactions, id } = action.data.block;

  if (numberOfTransactions) {
    await delay();
    const { data: txs } = await getTransactions({
      network,
      params: { blockId: id },
    }, token.active);
    const blockContainsRelevantTransaction = txs.filter((transaction) => {
      if (!transaction) return false;
      return (
        account.summary?.address && (account.summary?.address === transaction.sender.address
        || account.summary?.address === transaction.asset?.recipient?.address)
      );
    }).length > 0;
    showNotificationsForIncomingTransactions(txs, account, token.active);
    const recentBtcTransaction = token.active === tokenMap.BTC.key
      && transactions.confirmed.filter(t => t.confirmations === 1).length > 0;

    if (blockContainsRelevantTransaction || recentBtcTransaction) {
      store.dispatch(accountDataUpdated());
      store.dispatch(transactionsRetrieved({
        address: account.summary?.address,
        filters: transactions.filters,
      }));
    }
  }
};

const readStoredNetwork = ({ dispatch, getState }) => {
  const {
    statistics, statisticsRequest, statisticsFollowingDay, network,
  } = getState().settings;

  const config = network?.name && network.address
    ? network
    : {
      name: networkKeys.mainNet,
      address: networks.mainnet.serviceUrl,
    };
  dispatch(networkSelected(config));
  dispatch(networkStatusUpdated({ online: true }));

  if (!statistics) {
    analytics.checkIfAnalyticsShouldBeDisplayed({
      statisticsRequest, statisticsFollowingDay, statistics,
    });
  }
};

// eslint-disable-next-line complexity
const accountMiddleware = store => next => async (action) => {
  next(action);
  switch (action.type) {
    case actionTypes.settingsRetrieved:
      readStoredNetwork(store);
      break;
    case actionTypes.newBlockCreated:
      await checkTransactionsAndUpdateAccount(store, action);
      break;
    case actionTypes.accountUpdated:
    case actionTypes.accountLoggedIn: {
      toast.dismiss(timeOutId);
      toast.dismiss(timeOutWarningId);
      break;
    }
    case actionTypes.accountLoggedOut:
      /* Reset active token setting so in case BTC is selected,
      the Lisk monitoring features are available and Lisk is selected on the next login */
      store.dispatch(settingsUpdated({ token: { active: tokenMap.LSK.key } }));
      store.dispatch(emptyTransactionsData());
      break;
    case actionTypes.settingsUpdated:
      if (action.data.token && store.getState().account.info) {
        store.dispatch(accountDataUpdated('enabled'));
      }
      break;
    default: break;
  }
};

export default accountMiddleware;
