/* eslint-disable max-lines */
import { toast } from 'react-toastify';
import { actionTypes } from '@constants';
import { login as loginAccount } from '@api/account/luanet';
import { getConnectionErrorMessage } from '@utils/getNetwork';
import { getFromStorage } from '@utils/localJSONStorage';

/**
 * An action to dispatch accountsRetrieved
 *
 */
export const getAccountInfos = () => (dispatch) => {
  getFromStorage('accounts', {}, (data) => {
    dispatch({
      type: actionTypes.accountsRetrieved,
      data: {
        ...data,
      },
    });
  });
};

/**
 * Trigger this action to log out of the account
 * while already logged in
 *
 * @returns {Object} - Action object
 */
export const accountTokenUpdated = data => ({
  type: actionTypes.accountTokenUpdated,
  data,
});

/**
 * Trigger this action to log out of the account
 * while already logged in
 *
 * @returns {Object} - Action object
 */
export const accountLoggedOut = () => ({
  type: actionTypes.accountLoggedOut,
});

/**
 * Fires an action to reset the account automatic sign out timer
 * @param {Date} date - Current date
 */
export const timerReset = () => ({
  type: actionTypes.timerReset,
  data: new Date(),
});

export const accountLoading = () => ({
  type: actionTypes.accountLoading,
});

/**
 * This action is used on login to fetch account info for all enabled token
 *
 * @param {Object} data - for hardware wallets it contains publicKey and hwInfo,
 *    otherwise contains passphrase
 * @param {String} data.passphrase - BIP39 passphrase of the account
 * @param {String} data.publicKey - Lisk publicKey used for hardware wallet login
 * @param {Object} data.hwInfo - info about hardware wallet we're trying to login to
 */
export const login = (params) =>
  async (dispatch) => {
    dispatch(accountLoading());
    try {
      const account = await loginAccount({ params });
      dispatch({
        type: actionTypes.accountLoggedIn,
        data: {
          access_token: account.access_token,
          refresh_token: account.refresh_token,
          info: account.user,
          date: new Date(),
          expire_time: account.expire_time,
        },
      });
    } catch (error) {
      toast.error(getConnectionErrorMessage(error));
      dispatch(accountLoggedOut());
    }
  };
