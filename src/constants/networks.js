export const networkKeys = {
  mainNet: 'mainnet',
  testNet: 'testnet',
  customNode: 'customNode',
  api: 'api',
  node: 'node',
};

// eslint-disable-next-line no-unused-vars
export const initialSupply = 10000000000000000;

const networks = {
  [networkKeys.mainNet]: {
    label: 'Mainnet',
    serviceUrl: 'https://service.lisk.com',
  },
  [networkKeys.testNet]: {
    label: 'Testnet',
    serviceUrl: 'https://testnet-service.lisk.com',
  },
  [networkKeys.customNode]: {
    label: 'Custom Service Node',

    // a default value, to keep the object signature consistent
    serviceUrl: 'http://localhost:9901',
  },
  [networkKeys.api]: {
    label: 'Luanet API',
    serviceUrl: 'http://127.0.0.1:9090',
  },
  [networkKeys.node]: {
    label: 'IPFS Node API',
    serviceUrl: 'http://127.0.0.1:5001',
  },
};

export default networks;
