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
export default ({ accessToken, params }) => http({
  baseUrl: networks.api.serviceUrl,
  path: '/payout',
  method: 'GET',
  accessToken: accessToken,
  params,
});
