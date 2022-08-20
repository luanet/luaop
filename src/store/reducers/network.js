import { actionTypes } from '@constants';

const initialState = {
  status: 0,
};

/**
 * The reducer for maintaining connected networks
 *
 * @param {Array} state - the current state object
 * @param {Object} action - The action containing type and data
 *
 * @returns {Object} - Next state object
 */
const network = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.networkStatusUpdated:
      return {
        ...state,
        status: action.data,
      };
    default:
      return state;
  }
};

export default network;
