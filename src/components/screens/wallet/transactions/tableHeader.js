import grid from 'flexboxgrid/dist/flexboxgrid.css';
import styles from './transactions.css';

export default (t, changeSort) => ([
  {
    title: t('Node'),
    classList: `${grid['col-xs-4']} ${styles.transactionTitle}`,
  },
  {
    title: t('Date'),
    classList: grid['col-xs-3'],
    sort: {
      fn: changeSort,
      key: 'timestamp',
    },
  },
  {
    title: t('Type'),
    classList: grid['col-xs-3'],
  },
  {
    title: t('Amount'),
    classList: grid['col-xs-2'],
  },
]);
