import { actionTypes } from '@constants';
import { setInStorage } from '@utils/localJSONStorage';

const settings = store => next => (action) => {
  next(action);
  switch (action.type) {
    case actionTypes.settingsUpdated:
      setInStorage('settings', store.getState().settings);
      break;
    default:
      break;
  }
};

export default settings;
