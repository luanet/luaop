import { WalletLinkConnector } from '@web3-react/walletlink-connector';

const walletlink = new WalletLinkConnector({
  url: 'https://polygon-rpc.com',
  appName: 'Luanet',
});

export default walletlink;
