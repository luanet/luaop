import { toast } from 'react-toastify';
import {
  actionTypes, tokenMap,
  timeOutId, timeOutWarningId,
} from '@constants';
import {
  settingsUpdated, accountTokenUpdated, accountLoggedOut,
} from '@actions';
import {
  token as getToken,
} from '@api/account/luanet';
import { setInStorage, getFromStorage } from '@utils/localJSONStorage';

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
      if (action.data.expire_time <= Math.floor((new Date()).getTime() / 1000)) {
        store.dispatch(accountLoggedOut());
      }

      if (action.data.expire_time <= Math.floor((new Date()).getTime() / 1000) + 30) {
        const params = { id: action.data.info.id, refresh_token: action.data.refresh_token };
        const token = await getToken({ params });
        getFromStorage('accounts', {}, (data) => {
          data.access_token = token.access_token;
          data.expire_time = token.expire_time;
          setInStorage('accounts', data);
        });

        store.dispatch(accountTokenUpdated(token));
      }
      break;
    default: break;
  }
};

export default accountMiddleware;
