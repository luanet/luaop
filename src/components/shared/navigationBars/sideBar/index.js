import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { routes, modals, account } from '@constants';
import Piwik from '@utils/piwik';
import { accountLoggedOut } from '@actions';
import Icon from '@toolbox/icon';
import DialogLink from '@toolbox/dialog/link';
import styles from './sideBar.css';
import AutoSignOut from './autoSignOut';
import WarningAutoSignOut from './autoSignOut/warning';
import menuLinks from './menuLinks';

const Inner = ({
  data, pathname, sideBarExpanded,
}) => {
  let status = '';
  if (pathname && pathname === data.path) {
    status = 'Active';
  }
  return (
    <span className={styles.holder}>
      <span className={styles.iconWrapper}>
        <Icon name={`${data.icon}${status}`} className={styles.icon} />
      </span>
      {sideBarExpanded && <span className={styles.label}>{data.label}</span>}
    </span>
  );
};

const MenuLink = ({
  data, isUserLogout, pathname, sideBarExpanded,
}) => {
  if (data.modal) {
    const className = `${styles.item} ${(isUserLogout && modals[data.id].isPrivate) || pathname === routes.reclaim.path ? `${styles.disabled} disabled` : ''}`;
    return (
      <DialogLink component={data.id} className={`${styles.toggle} ${data.id}-toggle ${className}`}>
        <Inner data={data} modal={data.id} sideBarExpanded={sideBarExpanded} />
      </DialogLink>
    );
  }

  const className = `${styles.item} ${(isUserLogout && routes[data.id].isPrivate) || pathname === routes.reclaim.path ? `${styles.disabled} disabled` : ''}`;
  return (
    <NavLink
      to={data.path}
      className={className}
      id={data.id}
      activeClassName={styles.selected}
      exact={routes[data.id].exact}
    >
      <Inner data={data} pathname={pathname} sideBarExpanded={sideBarExpanded} />
    </NavLink>
  );
};

const getWarningTime = (expireTime) => {
  if (!expireTime) {
    return null;
  }

  const diff = account.lockDuration - account.warnLockDuration;
  const expireTimeInMilliseconds = new Date(expireTime).getTime();

  return new Date(expireTimeInMilliseconds - diff);
};

const AutoSignOutWrapper = () => {
  const dispatch = useDispatch();
  const expireTime = useSelector(state => state.account.expireTime);
  const warningTime = getWarningTime(expireTime);
  const autoSignOut = useSelector(state => state.settings.autoLog);
  const renderAutoSignOut = autoSignOut && expireTime;

  if (!renderAutoSignOut) {
    return null;
  }

  return (
    <>
      <AutoSignOut
        expireTime={expireTime}
        onCountdownComplete={() => dispatch(accountLoggedOut())}
      />
      <WarningAutoSignOut warningTime={warningTime} />
    </>
  );
};

const SingOut = ({ t, history }) => {
  const dispatch = useDispatch();

  const signOut = () => {
    Piwik.trackingEvent('Header', 'button', 'Open logout dialog');
    dispatch(accountLoggedOut());
    history.replace(`${routes.login.path}`);
  };

  return (
    <div className={styles.item}>
      <span className={`${styles.holder} logoutBtn`} onClick={signOut}>
        <span className={styles.iconWrapper}>
          <Icon name="signOut" className={styles.icon} />
        </span>
        <span className={styles.label}>{t('Sign out')}</span>
      </span>
    </div>
  );
};

const SideBar = ({
  t, location, history,
}) => {
  const items = menuLinks(t);
  const token = useSelector(state => state.settings.token.active);
  const isLoggedOut = useSelector(state => !state.account.info || !state.account.info[token]);
  const sideBarExpanded = useSelector(state => state.settings.sideBarExpanded);

  return (
    <nav className={`${styles.wrapper} ${sideBarExpanded ? 'expanded' : ''}`}>
      <div className={`${styles.container} menu-items`}>
        {
          items.map((group, i) => (
            <div
              className={styles.menuGroup}
              key={`group-${i}`}
            >
              {
                group.filter(({ id }) => (
                  (routes[id] && !routes[id].forbiddenTokens.includes(token))
                  || (modals[id] && !modals[id].forbiddenTokens.includes(token))
                )).map(item => (
                  <MenuLink
                    key={item.id}
                    isUserLogout={isLoggedOut}
                    pathname={location.pathname}
                    data={item}
                    sideBarExpanded={sideBarExpanded}
                  />
                ))
              }
              {
                (i === items.length - 1 && !isLoggedOut)
                  ? (
                    <SingOut t={t} history={history} />
                  )
                  : null
              }

            </div>
          ))
        }
      </div>
      <AutoSignOutWrapper />
    </nav>
  );
};

export default withTranslation()(SideBar);
