// istanbul ignore file
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { getActiveTokenAccount } from '../../../../utils/account';

import Summary from './summary';

const mapStateToProps = state => ({
  account: getActiveTokenAccount(state),
});

export default compose(
  connect(mapStateToProps),
  withTranslation(),
)(Summary);
