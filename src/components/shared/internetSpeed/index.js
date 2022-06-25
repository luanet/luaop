import React from 'react';
import { withTranslation } from 'react-i18next';
import { truncateAddress } from '@utils/account';
import styles from './internetPort.css';

const Speed = ({ speed }) => (
  <div className={`${styles.memberInfo} member-info`}>
    <span>{speed.type === 'Ingress' ? 'Download: ' : 'Upload: '}</span>
    <div className={styles.memberDetails}>
      {speed.speed && (
        <p className={styles.memberTitle}>
          {truncateAddress(speed.speed)}
        </p>
      )}
    </div>
  </div>
);

const Speeds = ({ speeds = [], t }) => {
  const sliceIndex = Math.round(speeds.length / 2);
  const leftColumn = speeds.slice(0, sliceIndex);
  const rightColumn = speeds.slice(sliceIndex, speeds.length);
  return (
    <div className={styles.membersContainer}>
      <div>
        {leftColumn.map((speed, i) =>
          <Speed speed={speed} i={i} key={`registerMultiSignature-members-list-${i}`} t={t} />)}
      </div>
      <div>
        {rightColumn.map((speed, i) =>
          <Speed speed={speed} i={i + sliceIndex} key={`registerMultiSignature-members-list-${i + sliceIndex}`} t={t} />)}
      </div>
    </div>
  );
};

const InternetSpeed = ({
  t, speeds,
}) => (
  <>
    <Speeds speeds={speeds} t={t} />
    <div className={styles.infoContainer} />
  </>
);

export default withTranslation()(InternetSpeed);
