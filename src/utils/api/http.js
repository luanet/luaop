/**
 * Makes HTTP api call
 *
 * @param {string} baseUrl - optional service base url
 * @param {string} path - api endpoint
 * @param {string} method - HTTP method
 * @param {string} params - HTTP call parameters
 * @param {Object} network - redux network status
 * @param {string} network.serviceUrl - service base url
 * @returns {Promise} - if success it returns data,
 * if fails on server it throws an error,
 *
 */

const http = ({
  baseUrl, path, params, method = 'GET', network, accessToken, ...restOptions
  // eslint-disable-next-line consistent-return
}) => {
  try {
    const url = new URL(`${baseUrl}${path}`);
    if (method === 'GET') url.search = new URLSearchParams(params).toString();

    const headers = accessToken ? {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    } : {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    return fetch(url.toString(), {
      method,
      headers,
      body: method === 'POST' || method === 'PUT' ? JSON.stringify(params) : undefined,
      ...restOptions,
    })
      .then(async (response) => {
        if (!response.ok) {
          const { message } = await response.json();
          const error = Error(response.statusText);
          error.code = response.status;
          error.message = message;
          throw error;
        }
        return response.json();
      });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    // return Promise.reject(Error(e));
  }
};

export default http;
