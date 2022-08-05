import React from 'react';

import { truncateAddress } from '@utils/account';
import styles from './nodeAddress.css';

const Address = ({
  address, className,
}) => {
  const addressTrunk = address && truncateAddress(address);
  return (
    <>
      <span className={`${className} showOnLargeViewPort`}>
        {address}
      </span>
      <span className={`${className} hideOnLargeViewPort`}>
        {addressTrunk}
      </span>
    </>
  );
};

const NodeAddress = ({
  address,
}) => (
  <div className={`${styles.wrapper} transaction-address`}>
    <Address address={address} />
  </div>
);

export default NodeAddress;
