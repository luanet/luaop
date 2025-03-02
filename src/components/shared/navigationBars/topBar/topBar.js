import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '@constants';
import { isEmpty } from '@utils/helpers';
import Icon from '@toolbox/icon';
import DialogLink from '@toolbox/dialog/link';
import { PrimaryButton } from '@toolbox/buttons';
import styles from './topBar.css';
import Network from './networkName';
import NavigationButtons from './navigationButtons';
import Search from './search';
import Toggle from './toggle';
import NodeSettingToggle from './nodeSettingToggle';
import SignOut from './signOut';

const TopBar = ({
  t,
  account,
  history,
  network,
  token,
  location,
}) => {
  const isUserLogout = isEmpty(account) || account.afterLogout;
  const disabled = location.pathname === routes.reclaim.path;

  return (
    <div className={`${styles.wrapper} top-bar`}>
      <div className={styles.group}>
        <Icon
          name="liskLogo"
          className={`${styles.logo} topbar-logo`}
        />
        <NavigationButtons
          history={history}
          account={account}
        />
        <Toggle
          setting="sideBarExpanded"
          icons={['toggleSidebarActive', 'toggleSidebar']}
          tips={[t('Collapse sidebar'), t('Expand sidebar')]}
        />
        <NodeSettingToggle
          t={t}
          noOfVotes={0}
          isUserLogout={isUserLogout}
          content={(
            <DialogLink
              component="bookmarks"
              className={`${styles.toggle} bookmark-list-toggle ${disabled && `${styles.disabled} disabled`}`}
            >
              <Icon name="bookmark" className={styles.bookmarksIcon} />
            </DialogLink>
          )}
        />
        <Search t={t} history={history} disabled={disabled} />
      </div>
      <div className={styles.group}>
        <Toggle
          setting="darkMode"
          icons={['lightMode', 'darkMode']}
          tips={[t('Disable dark mode'), t('Enable dark mode')]}
        />
        {
          !isUserLogout ? (
            <Toggle
              setting="discreetMode"
              icons={['discreetModeActive', 'discreetMode']}
              tips={[t('Disable discreet mode'), t('Enable discreet mode')]}
            />
          ) : null
        }
        <Network
          token={token.active}
          network={network}
          t={t}
        />
        {
          isUserLogout && history.location.pathname !== routes.login.path ? (
            <Link to={routes.login.path} className={styles.signIn}>
              <PrimaryButton size="s">Sign in</PrimaryButton>
            </Link>
          ) : null
        }
        {!isUserLogout && <SignOut t={t} history={history} />}
      </div>
    </div>
  );
};

export default TopBar;
