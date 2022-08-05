import React from 'react';
import grid from 'flexboxgrid/dist/flexboxgrid.css';
import { DateTimeFromTimestamp } from '@toolbox/timestamp';
import NodeAddress from '@shared/nodeAddress';
import PayoutAmount from '@shared/payoutAmount';
import DialogLink from '@toolbox/dialog/link';

const TransactionRow = ({
  data, activeToken, t, host, className,
}) => (
  <DialogLink
    className={`${grid.row} ${className} transactions-row`}
    component=""
    data={''}
  >
    <span className={grid['col-xs-4']}>
      <NodeAddress
        address={data.node_id}
        t={t}
      />
    </span>
    <span className={grid['col-xs-3']}>
      <DateTimeFromTimestamp time={data.date} token={activeToken} />
    </span>
    <span className={grid['col-xs-3']}>
      {data.type.charAt(0).toUpperCase() + data.type.slice(1)}
    </span>
    <span className={grid['col-xs-2']}>
      <PayoutAmount
        host={host}
        token={activeToken}
        amount={data.amount}
      />
    </span>
  </DialogLink>
);

export default TransactionRow;
