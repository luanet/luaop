import { networks } from '@constants';
import http from '../http';

const httpPaths = {
  signup: '/auth/signup',
  otp: '/auth/otp',
  resendOtp: '/auth/otp/resend',
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
export const signup = async (params) => {
  const response = await http({
    baseUrl: networks.api.serviceUrl,
    path: httpPaths.signup,
    params,
    method: 'POST',
  });

  return response;
};

/**
 * Confirm Otp
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
export const confirmOtp = async (params) => {
  const response = await http({
    baseUrl: networks.api.serviceUrl,
    path: httpPaths.otp,
    params,
    method: 'POST',
  });

  return response;
};

/**
 * Reset Otp
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
export const resendOtp = async (params) => {
  const response = await http({
    baseUrl: networks.api.serviceUrl,
    path: httpPaths.resendOtp,
    params,
    method: 'POST',
  });

  return response;
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

  return response;
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

  return response;
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
