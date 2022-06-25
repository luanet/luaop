import React, { useState } from 'react';

import Box from '@toolbox/box';
import BoxContent from '@toolbox/box/content';
import BoxFooter from '@toolbox/box/footer';
import { PrimaryButton } from '@toolbox/buttons';
import { Input } from '@toolbox/inputs';
import ProgressBar from '../progressBar';
import styles from './styles.css';

// eslint-disable-next-line max-statements
const Editor = ({
  t, nextStep, prevState = {},
}) => {
  const [address, setAddress] = useState('');
  const setPolygonAddress = (e) => {
    setAddress(e.target.value);
  };

  const goToNextStep = () => {
    nextStep({ address });
  };

  return (
    <section className={styles.wrapper}>
      <Box className={styles.box}>
        <header className={styles.header}>
          <h1>{t('Setting Up Node')}</h1>
        </header>
        <BoxContent className={styles.contentContainer}>
          <ProgressBar current={1} />
          <div className={`${styles.membersControls} multisignature-members-controls`}>
            <span>{t('Polygon Address')}</span>
          </div>
          <div className={styles.contentScrollable}>
            <Input
              name="username"
              autoComplete="off"
              onChange={setPolygonAddress}
              value={prevState.address}
            />
            <br />
          </div>
          <br />
        </BoxContent>
        <BoxFooter>
          <br />
          <PrimaryButton
            className="confirm-button"
            size="l"
            disabled={(address.length !== 42 || address.indexOf('0x') !== 0)}
            onClick={goToNextStep}
          >
            {t('Next')}
          </PrimaryButton>
        </BoxFooter>
      </Box>
    </section>
  );
};

export default Editor;
