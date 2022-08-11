import thunk from 'redux-thunk';
import spy from 'redux-monitor-spy';

import account from './account';
import loading from './loadingBar';
import settings from './settings';
import watchList from './watchList';

export default [
  spy,
  account,
  loading,
  settings,
  watchList,
  thunk,
];
