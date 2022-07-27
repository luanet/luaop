// istanbul ignore file
import { withTranslation } from 'react-i18next';
import withData from '@utils/withData';
import { confirmOtp } from '@api/account/luanet';
import AccountCreated from './accountCreated';

export default withData({
  accountInfo: {
    apiUtil: (network, { otp }) => confirmOtp({ otp }),
    getApiParams: (state, props) => ({
      otp: props.account.otp
    }),
    defaultData: {},
    autoload: true,
    transformResponse: response => response.data,
  },
})(withTranslation()(AccountCreated));
