import { networks } from '@constants';
import http from '../http';

/**
 * Get node stats
 *
 * @param {Object} data
 * @param {Object} data.nodeId Identity of this node
 *
 * @returns {Promise}
 */
// eslint-disable-next-line complexity, max-statements
export const getClaimData = ({ accessToken, address }) => http({
  baseUrl: networks.api.serviceUrl,
  path: `/payout/${address}/claim`,
  method: 'POST',
  accessToken,
});

/**
 * Get node stats
 *
 * @param {Object} data
 * @param {Object} data.nodeId Identity of this node
 *
 * @returns {Promise}
 */
// eslint-disable-next-line complexity, max-statements
export const submitClaimTx = ({ accessToken, tx }) => http({
  baseUrl: networks.api.serviceUrl,
  path: `/payout/${tx}/claim-hash`,
  method: 'PUT',
  accessToken,
});
