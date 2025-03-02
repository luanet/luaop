import React from 'react';
import { Link } from 'react-router-dom';

import { routes } from '@constants';
import Tooltip from '@toolbox/tooltip/tooltip';
import DialogLink from '@toolbox/dialog/link';
import Icon from '@toolbox/icon';
import styles from './topBar.css';

const SignedInTip = ({ t }) => <p>{t('Voting queue')}</p>;

const SignedOutTip = ({ t }) => (
  <div className={styles.signedOutTip}>
    <b>{t('Please sign in')}</b>
    <p>{t('In order to use this feature you need to sign in to your Lisk account.')}</p>
    <Link to={routes.login.path}>
      {t('Sign in')}
    </Link>
  </div>
);

const NodeSettingToggle = ({
  t, noOfVotes, isUserLogout, disabled,
}) => (
  <Tooltip
    className={styles.tooltipWrapper}
    size="maxContent"
    position={isUserLogout ? 'bottom right' : 'bottom'}
    indent={isUserLogout}
    content={(
      <DialogLink
        component={isUserLogout ? '' : 'setupNode'}
        className={`${styles.toggle} voting-queue-toggle ${disabled && `${styles.disabled} disabled`}`}
      >
        <Icon name="votingQueueInactive" />
        {noOfVotes !== 0
          && <span className={styles.votingQueueVoteCount}>{noOfVotes}</span>}
      </DialogLink>
    )}
  >
    { isUserLogout ? <SignedOutTip t={t} /> : <SignedInTip t={t} /> }
  </Tooltip>
);

export default NodeSettingToggle;
