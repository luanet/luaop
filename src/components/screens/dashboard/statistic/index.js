// istanbul ignore file
import { withTranslation } from 'react-i18next';
import withData from '@utils/withData';
import { stats } from '@api/account/luanet';
import Statistic from './statistic';

export default withData({
  chartData: {
    apiUtil: (network, { accessToken, nodeId }) => stats({ accessToken, nodeId }),
    getApiParams: (state) => ({
      accessToken: state.account.access_token,
      nodeId: '12D3KooWAQhqoQEZNzZsy1DDNLs2ihymB27UPhVE4B6yFb8BSTSf',
    }),
    defaultData: [],
    autoload: true,
    transformResponse: response => response,
  },
})(withTranslation()(Statistic));
