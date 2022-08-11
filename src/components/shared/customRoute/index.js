/* eslint-disable complexity */
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import Piwik from '@utils/piwik';
import { routes } from '@constants';
import ErrorBoundary from '../errorBoundary';
import offlineStyle from '../offlineWrapper/offlineWrapper.css';

// eslint-disable-next-line max-statements
const CustomRoute = ({
  path,
  exact,
  isPrivate,
  forbiddenTokens,
  component,
  t,
  history,
}) => {
  const settings = useSelector(state => state.settings);
  const isAuthenticated = useSelector(state =>
    (state.account.access_token));
  const { search = '' } = history.location;

  Piwik.tracking(history, settings);

  if (forbiddenTokens.indexOf(settings.token.active) !== -1) {
    return <Redirect to={`${routes.dashboard.path}`} />;
  }

  if (isPrivate && !isAuthenticated) {
    return (
      <Redirect
        to={`${routes.login.path}?referrer=${path.replace(/\/(send|vote)/, '')}&${search.replace(/^\?/, '')}`}
      />
    );
  }

  return (
    <main className={`${isPrivate ? offlineStyle.disableWhenOffline : ''} offlineWrapper`}>
      <ErrorBoundary errorMessage={t('An error occurred while rendering this page')}>
        <Route
          path={path}
          exact={exact}
          key={path}
          component={component}
        />
      </ErrorBoundary>
    </main>
  );
};

CustomRoute.defaultProps = {
  t: str => str,
  pathSuffix: '',
  pathPrefix: '',
};

export default CustomRoute;
