// istanbul ignore file
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { secondPassphraseStored } from 'src/modules/common/store/actions';
import TransactionSummary from '../components/TransactionSummary/TransactionSummary';

const mapStateToProps = (state) => ({
  token: state.token.active,
  transactions: state.transactions,
  wallet: {
    ...state.wallet.info[state.token.active],
    passphrase: state.passphrase,
    hwInfo: state.hwInfo,
  },
});

const mapDispatchToProps = {
  secondPassphraseStored,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation(),
)(TransactionSummary);
