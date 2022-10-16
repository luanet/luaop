import React from 'react';
import styles from './network.css';

const Network = ({ network, t }) => {
  const statusColor = network.status === 2 ? styles.online : styles.offline;

  return (
    <section className={styles.wrapper}>
      <span className={`${styles.status} ${statusColor}`} />
      <div className={styles.message}>
        <span>{network.status === 2 ? t('Connected') : t('Disconnected')}</span>
      </div>
    </section>
  );
};

export default Network;
