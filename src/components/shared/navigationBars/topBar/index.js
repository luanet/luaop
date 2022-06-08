// istanbul ignore file
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { withTranslation } from 'react-i18next';
import { accountLoggedOut, timerReset } from '@actions';
import TopBar from './topBar';

const mapStateToProps = state => ({
  account: state.account,
  network: state.network,
  token: state.settings.token,
  settings: state.settings,
});

const mapDispatchToProps = {
  logOut: accountLoggedOut,
  resetTimer: () => timerReset(),
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(
    withTranslation()(TopBar),
  ),
);
