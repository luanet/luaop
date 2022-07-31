import thunk from 'redux-thunk';
import spy from 'redux-monitor-spy';

import account from './account';
import loading from './loadingBar';
import hwManager from './hwManager';
import block from './block';
import settings from './settings';
import network from './network';
import watchList from './watchList';

export default [
  spy,
  account,
  hwManager,
  loading,
  network,
  settings,
  block,
  watchList,
  thunk,
];
