/* istanbul ignore file */
// This is covered by e2e tests
import React, { useEffect, useState } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { hot } from 'react-hot-loader/root';
import './variables.css';
import OfflineWrapper from '@shared/offlineWrapper';
import CustomRoute from '@shared/customRoute';
import NotFound from '@shared/notFound';
import { routes } from '@constants';
import NavigationBars from '@shared/navigationBars';
import FlashMessageHolder from '@toolbox/flashMessage/holder';
import { Web3ReactProvider } from '@web3-react/core';
import DialogHolder from '@toolbox/dialog/holder';
import { ethers } from 'ethers';
import {
  settingsRetrieved,
  getAccountInfos,
  watchListRetrieved,
} from '@actions';
import routesMap from '../routesMap';
import ThemeContext from '../contexts/theme';
import styles from './app.css';
import useIpc from '../hooks/useIpc';

// eslint-disable-next-line max-statements
const App = ({ history }) => {
  const getLibrary = (provider) => {
    const library = new ethers.providers.Web3Provider(provider);
    library.pollingInterval = 8000; // frequency provider is polling
    return library;
  };

  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const theme = useSelector(state => (state.settings.darkMode ? 'dark' : 'light'));

  useIpc(history);

  useEffect(() => {
    setLoaded(true);
    dispatch(getAccountInfos());
    dispatch(settingsRetrieved());
    dispatch(watchListRetrieved());
  }, []);

  const routesList = Object.keys(routes);
  const routeObj = Object.values(routes).find(r => r.path === history.location.pathname) || {};

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ThemeContext.Provider value={theme}>
        <OfflineWrapper>
          <DialogHolder history={history} />
          <ToastContainer
            position="bottom-right"
            hideProgressBar
            draggable
            newestOnTop
            closeButton={false}
            className={styles.toastContainer}
            toastClassName={styles.toastBody}
            bodyClassName={styles.toastText}
          />
          <NavigationBars
            isSignInFlow={routeObj.isSigninFlow}
            location={history.location}
            history={history}
          />
          <main className={`${styles.bodyWrapper} ${loaded ? styles.loaded : ''}`}>
            <section className="scrollContainer">
              <FlashMessageHolder />
              <div className={`${styles.mainContent} ${styles.mainBox}`}>
                <Switch>
                  {
                    routesList.map(route => (
                      <CustomRoute
                        key={routes[route].path}
                        route={routes[route]}
                        path={routes[route].path}
                        exact={routes[route].exact}
                        isPrivate={routes[route].isPrivate}
                        forbiddenTokens={routes[route].forbiddenTokens}
                        component={routesMap[route]}
                        history={history}
                      />
                    ))
                  }
                  <Route path="*" component={NotFound} />
                </Switch>
              </div>
            </section>
          </main>
        </OfflineWrapper>
      </ThemeContext.Provider>
    </Web3ReactProvider>
  );
};

export default withRouter(App);
export const DevApp = hot(withRouter(App));
