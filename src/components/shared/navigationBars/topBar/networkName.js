import React from 'react';

import Tooltip from '@toolbox/tooltip/tooltip';
import styles from './network.css';

const Network = ({ network, t }) => {
  const statusColor = network.status === 2 ? styles.online : styles.offline;

  return (
    <section className={styles.wrapper}>
      <span className={`${styles.status} ${statusColor}`} />
      <div className={styles.message}>
        <span>{network.status === 2 ? t('Connected to:') : t('Disconnected:')}</span>
        <Tooltip
          className={styles.tooltipWrapper}
          size="maxContent"
          position="bottom left"
          content={(
            <span className="network-name">{t('Mainnet').toLowerCase()}</span>
          )}
        >
          <p className="network-address">-</p>
        </Tooltip>
      </div>
    </section>
  );
};

export default Network;
