import { networks } from '@constants';
import http from '../http';

const httpPaths = {
  signup: '/auth/signup',
  login: '/auth/login',
  token: '/auth/token',
  node: '/node',
};

/**
 * Retrieves details of an account with given params
 *
 * @param {Object} data
 * @param {Object} data.network The network config from the Redux store
 * @param {String?} data.baseUrl Custom API URL
 * @param {Object} data.params
 * @param {String?} data.params.username Valid delegate username
 * @param {String?} data.params.address Valid Lisk Address
 * @param {String?} data.params.passphrase Valid Mnemonic passphrase
 * @param {String?} data.params.publicKey Valid Lisk PublicKey
 *
 * @returns {Promise}
 */
// eslint-disable-next-line complexity, max-statements
export const signup = async ({
  params,
}) => {
  const response = await http({
    baseUrl: networks.api.serviceUrl,
    path: httpPaths.signup,
    params,
    method: 'POST',
  });

  if (response.data[0]) {
    return response.data[0];
  }

  throw Error('Create new account failed!');
};

/**
 * Retrieves details of an account with given params
 *
 * @param {Object} data
 * @param {Object} data.network The network config from the Redux store
 * @param {String?} data.baseUrl Custom API URL
 * @param {Object} data.params
 * @param {String?} data.params.username Valid delegate username
 * @param {String?} data.params.address Valid Lisk Address
 * @param {String?} data.params.passphrase Valid Mnemonic passphrase
 * @param {String?} data.params.publicKey Valid Lisk PublicKey
 *
 * @returns {Promise}
 */
// eslint-disable-next-line complexity, max-statements
export const login = async ({
  params,
}) => {
  // eslint-disable-next-line no-console
  console.log({
    baseUrl: networks.api.serviceUrl,
    path: httpPaths.login,
    params,
    method: 'POST',
  });

  const response = await http({
    baseUrl: networks.api.serviceUrl,
    path: httpPaths.login,
    params,
    method: 'POST',
  });

  if (response.access_token) {
    return response;
  }

  throw Error('Login failed!');
};
