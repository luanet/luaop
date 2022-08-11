// istanbul ignore file
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

import { getActiveTokenAccount } from '@utils/account';
import Dashboard from './dashboard';

const mapStateToProps = state => ({
  account: getActiveTokenAccount(state),
  loading: state.loading.length > 0,
  settings: state.settings,
});

export default connect(mapStateToProps)(withTranslation()(Dashboard));
