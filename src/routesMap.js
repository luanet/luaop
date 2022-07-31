import Dashboard from '@screens/dashboard';
import DelegatesPerformanceModal from '@screens/wallet/delegatePerformanceModal';
import Login from '@screens/login';
import Register from '@screens/register';
import Settings from '@screens/settings';
import TermsOfUse from '@screens/termsOfUse';
import Wallet from '@screens/wallet';
import Explorer from '@screens/wallet/explorer';
import SearchBar from '@shared/searchBar';
import SetupNode from '@screens/setupNode';
import MonitorNetwork from '@screens/monitor/network';

export default {
  wallet: Wallet,
  addAccount: Login,
  account: Explorer,
  register: Register,
  login: Login,
  termsOfUse: TermsOfUse,
  delegatePerformance: DelegatesPerformanceModal,
  dashboard: Dashboard,
  settings: Settings,
  search: SearchBar,
  setupNode: SetupNode,
  network: MonitorNetwork,
};
