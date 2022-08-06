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
export default () => http({
  baseUrl: networks.node.serviceUrl,
  path: '/api/v0/stats/bw',
  method: 'POST',
});
