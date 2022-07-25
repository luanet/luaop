import { networks } from '@constants';
import http from '../http';

const httpPaths = {
  signup: '/auth/signup',
  login: '/auth/login',
  token: '/auth/token',
  node: '/node',
};

/**
 * Signup an account
 *
 * @param {Object} data
 * @param {Object} data.network The network config from the Redux store
 * @param {String?} data.baseUrl Custom API URL
 * @param {Object} data.params
 * @param {String?} data.params.name Valid delegate name
 * @param {String?} data.params.email Valid email
 * @param {String?} data.params.password Valid password
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
 * Login
 *
 * @param {Object} data
 * @param {Object} data.network The network config from the Redux store
 * @param {String?} data.baseUrl Custom API URL
 * @param {Object} data.params
 * @param {String?} data.params.id Valid login id
 * @param {String?} data.params.password Valid password
 *
 * @returns {Promise}
 */
// eslint-disable-next-line complexity, max-statements
export const login = async ({
  params,
}) => {
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

/**
 * Get access token
 *
 * @param {Object} data
 * @param {Object} data.network The network config from the Redux store
 * @param {String?} data.baseUrl Custom API URL
 * @param {Object} data.params
 * @param {String?} data.params.id Valid login id
 * @param {String?} data.params.refresh_token Valid refresh token
 *
 * @returns {Promise}
 */
// eslint-disable-next-line complexity, max-statements
export const token = async ({
  params,
}) => {
  const response = await http({
    baseUrl: networks.api.serviceUrl,
    path: httpPaths.token,
    params,
    method: 'POST',
  });

  if (response.access_token) {
    return response;
  }

  throw Error('Generate access token failed!');
};

/**
 * Get node stats
 *
 * @param {Object} data
 * @param {Object} data.nodeId Identity of this node
 *
 * @returns {Promise}
 */
// eslint-disable-next-line complexity, max-statements
export const stats = (params) => http({
  baseUrl: networks.api.serviceUrl,
  path: `${httpPaths.node}/${params.nodeId}/stats`,
  method: 'GET',
  accessToken: params.accessToken,
});
