/* istanbul ignore file */
import React from 'react';
import { withRouter } from 'react-router-dom';

import MultiStep from '@shared/multiStep';
import { removeSearchParamsFromUrl } from '@utils/searchParams';
import Dialog from '@toolbox/dialog/dialog';

import Address from './address';
import Port from './port';
import SpeedTest from './speedtest';
import styles from './styles.css';

const MultiSignature = ({ history }) => {
  const closeModal = () => {
    removeSearchParamsFromUrl(history, ['modal'], true);
  };

  return (
    <Dialog>
      <MultiStep
        key="multisignature"
        finalCallback={closeModal}
        className={styles.modal}
      >
        <Address />
        <Port />
        <SpeedTest />
      </MultiStep>
    </Dialog>

  );
};

export default withRouter(MultiSignature);
