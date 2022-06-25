import React from 'react';
import InternetSpeed from '@shared/internetSpeed';
import Box from '@toolbox/box';
import BoxContent from '@toolbox/box/content';
import BoxFooter from '@toolbox/box/footer';
import { PrimaryButton, SecondaryButton } from '@toolbox/buttons';
import ProgressBar from '../progressBar';
import styles from './styles.css';

const Summary = ({
  t,
  address,
  prevStep,
  nextStep,
}) => {
  // eslint-disable-next-line max-statements
  const onConfirm = () => {
    nextStep({ address });
  };

  const goBack = () => {
    prevStep({});
  };

  return (
    <section className={styles.wrapper}>
      <Box className={styles.container}>
        <div className={styles.header}>
          <h1>{t('Setting Up Node')}</h1>
        </div>
        <BoxContent className={styles.content}>
          <ProgressBar current={2} />
          <InternetSpeed
            t={t}
            speeds={[{
              speed: '50 Mbps',
              type: 'Ingress',
            }, {
              speed: '70 Mbps',
              type: 'Egress',
            }]}
          />
        </BoxContent>
        <BoxFooter className={styles.footer} direction="horizontal">
          <SecondaryButton className="go-back" onClick={goBack}>{t('Edit')}</SecondaryButton>
          <PrimaryButton className="confirm" size="l" onClick={onConfirm}>
            {t('Finish')}
          </PrimaryButton>
        </BoxFooter>
      </Box>
    </section>
  );
};

export default Summary;
