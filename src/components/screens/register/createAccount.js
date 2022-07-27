// istanbul ignore file
import { withTranslation } from 'react-i18next';
import withData from '@utils/withData';
import { signup } from '@api/account/luanet';
import ConfirmPassphrase from './confirmPassphrase';

export default withData({
  otp: {
    apiUtil: (network, { email, password }) => signup({ email, password }),
    getApiParams: (state, props) => ({
      email: props.account.email,
      password: props.account.password,
    }),
    defaultData: -1,
    autoload: true,
    transformResponse: response => response.data,
  },
})(withTranslation()(ConfirmPassphrase));
