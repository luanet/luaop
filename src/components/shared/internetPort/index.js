import React from 'react';
import { withTranslation } from 'react-i18next';
import { truncateAddress } from '@utils/account';
import Icon from '@toolbox/icon';
import styles from './internetPort.css';

const Port = ({ port, i }) => (
  <div className={`${styles.memberInfo} member-info`}>
    <p className={styles.memberInfoIndex}>{`${i + 1}.`}</p>
    <div className={styles.memberDetails}>
      {port.address && (
        <p className={styles.memberTitle}>
          {truncateAddress(port.address)}
          <span><Icon name={port.opened ? 'approved' : 'lockedBalance'} /></span>
        </p>
      )}
    </div>
  </div>
);

const Ports = ({ ports = [], t }) => {
  const sliceIndex = Math.round(ports.length / 2);
  const leftColumn = ports.slice(0, sliceIndex);
  const rightColumn = ports.slice(sliceIndex, ports.length);
  return (
    <div className={styles.membersContainer}>
      <p>{t('Lua need these ports opened to the internet.')}</p>
      <div>
        {leftColumn.map((port, i) =>
          <Port port={port} i={i} key={`registerMultiSignature-members-list-${i}`} t={t} />)}
      </div>
      <div>
        {rightColumn.map((port, i) =>
          <Port port={port} i={i + sliceIndex} key={`registerMultiSignature-members-list-${i + sliceIndex}`} t={t} />)}
      </div>
    </div>
  );
};

const InternetPort = ({
  t, ports,
}) => (
  <>
    <Ports ports={ports} t={t} />
    <div className={styles.infoContainer} />
  </>
);

export default withTranslation()(InternetPort);
