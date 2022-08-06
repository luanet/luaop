import React, { useEffect } from 'react';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import withFilters from '@utils/withFilters';
import withData from '@utils/withData';
import { normalizeTransactionParams } from '@utils/transaction';
import getPayout from '@api/payout/luanet';
import Box from '@toolbox/box';
import BoxContent from '@toolbox/box/content';
import Table from '@toolbox/table';
import FilterBar from '@shared/filterBar';
import { DEFAULT_LIMIT } from '@constants';
import styles from './transactions.css';
import header from './tableHeader';
import TransactionRow from './transactionRow';

const Transactions = ({
  transactions,
  activeToken,
  filters,
  changeSort,
  sort,
  clearFilter,
  clearAllFilters,
  t,
  address,
}) => {
  useEffect(() => {
    // This will automatically load the new data too.
    clearAllFilters();
  }, [activeToken]);

  /* istanbul ignore next */
  const handleLoadMore = () => {
    transactions.loadData({
      offset: transactions.data.meta.limit + transactions.data.meta.offset,
      sort,
      ...filters,
    });
  };

  const canLoadMore = transactions.data.meta
    ? transactions.data.meta.total > transactions.data.meta.limit + transactions.data.meta.offset
    : false;

  const formatters = {
    dateFrom: value => `${t('From')}: ${value}`,
    dateTo: value => `${t('To')}: ${value}`,
    amountFrom: value => `> ${value} ${activeToken}`,
    amountTo: value => `< ${value} ${activeToken}`,
  };

  return (
    <Box main isLoading={transactions.isLoading} className={`${styles.wrapper} transactions-box`}>
      <FilterBar {...{
        clearFilter, clearAllFilters, filters, formatters, t,
      }}
      />
      <BoxContent className={`${styles.content} transaction-results`}>
        <Table
          data={transactions.data.items}
          isLoading={transactions.isLoading}
          row={TransactionRow}
          loadData={handleLoadMore}
          additionalRowProps={{
            t,
            activeToken,
            host: address,
          }}
          header={header(t, changeSort)}
          currentSort={sort}
          canLoadMore={canLoadMore}
          error={transactions.error.code !== 404 ? transactions.error : undefined}
          emptyState={{ message: t('This account does not have any transactions.') }}
        />
      </BoxContent>
    </Box>
  );
};

const defaultFilters = {
  dateFrom: '',
  dateTo: '',
  amountFrom: '',
  amountTo: '',
};
const defaultSort = 'timestamp:desc';

export default compose(
  withData({
    transactions: {
      apiUtil: (network, { accessToken, ...params }) =>
        getPayout({ accessToken, params: normalizeTransactionParams(params) }),
      getApiParams: (state, { sort }) => ({
        accessToken: state.account.access_token,
        sort,
        limit: DEFAULT_LIMIT,
      }),
      defaultData: { items: [], meta: {} },
      autoload: true,
      transformResponse: (response, oldData, urlSearchParams) => (
        urlSearchParams.offset
          ? { items: [...oldData.data.items, ...response.data.items], meta: response.meta }
          : response
      ),
    },
  }),
  withFilters('transactions', defaultFilters, defaultSort),
  withTranslation(),
)(Transactions);
