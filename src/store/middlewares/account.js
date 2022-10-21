import { toast } from 'react-toastify';
import {
  actionTypes, tokenMap,
  timeOutId, timeOutWarningId,
} from '@constants';
import {
  settingsUpdated, accountTokenUpdated,
} from '@actions';

import { setInStorage } from '@utils/localJSONStorage';

// eslint-disable-next-line complexity
const accountMiddleware = store => next => async (action) => {
  next(action);
  switch (action.type) {
    case actionTypes.accountUpdated:
    case actionTypes.accountLoggedIn: {
      toast.dismiss(timeOutId);
      toast.dismiss(timeOutWarningId);

      setInStorage('accounts', action.data);
      break;
    }
    case actionTypes.accountLoggedOut:
      /* Reset active token setting so in case BTC is selected,
      the Lisk monitoring features are available and Lisk is selected on the next login */
      store.dispatch(settingsUpdated({ token: { active: tokenMap.LSK.key } }));
      setInStorage('accounts', {});
      break;
    case actionTypes.accountsRetrieved:
      setInStorage('accounts', action.data);
      store.dispatch(accountTokenUpdated(action.data));
      break;
    default: break;
  }
};

export default accountMiddleware;
