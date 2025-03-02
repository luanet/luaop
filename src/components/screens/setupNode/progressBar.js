import React from 'react';
import { useTranslation } from 'react-i18next';
import SteppedProgressBar from '../../toolbox/steppedProgressBar/steppedProgressBar';
import styles from './styles.css';

const ProgressBar = ({ current }) => {
  const { t } = useTranslation();
  return (
    <SteppedProgressBar
      className={styles.progressBarContainer}
      total={3}
      current={current}
      labels={[t('Configure Wallet Address'), t('Open Ports'), t('Speed Test')]}
    />
  );
};

export default ProgressBar;
