/* eslint-disable import/prefer-default-export */
import { actionTypes } from '@constants';

/**
 * Returns required action object to update offline/online status of network
 * @param {Object} data - active network data
 * @returns {Object} the action object
 */
export const networkStatusUpdated = data => ({
  data,
  type: actionTypes.networkStatusUpdated,
});
