/* istanbul ignore file */
import { connect } from 'react-redux';
import { setDefaults, withTranslation } from 'react-i18next';
import { getActiveTokenAccount } from '@utils/account';
import { login, settingsUpdated, accountsUpdated } from '@actions';
import Login from './login';

setDefaults({
  wait: true,
  withRef: false,
  bindI18n: 'languageChanged loaded',
  bindStore: 'added removed',
  nsMode: 'default',
  withTranslationFuncName: 't',
});

const mapStateToProps = state => ({
  account: getActiveTokenAccount(state),
  network: state.network,
  settings: state.settings,
});

const mapDispatchToProps = {
  login,
  settingsUpdated,
  accountsUpdated,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(Login));
