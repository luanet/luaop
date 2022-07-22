import { routes } from '@constants';

const menuLinks = t => ([
  [
    {
      icon: 'dashboardIcon',
      id: 'dashboard',
      label: t('Dashboard'),
      path: routes.dashboard.path,
    },
    {
      icon: 'walletIcon',
      id: 'wallet',
      label: t('Wallet'),
      path: routes.wallet.path,
    },
    {
      icon: 'networkMonitor',
      id: 'network',
      label: t('Network'),
      path: routes.network.path,
    },
  ],
  [
    {
      icon: 'settings',
      id: 'settings',
      label: t('Settings'),
      modal: 'settings',
    },
  ],
]);

export default menuLinks;
