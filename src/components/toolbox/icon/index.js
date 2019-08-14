import React from 'react';
import PropTypes from 'prop-types';

import academy from '../../../assets/images/help/academy.svg';
import alertIcon from '../../../assets/images/icons-v2/icon-alert.svg';
import arrowLeftActive from '../../../assets/images/icons-v2/arrow-left-active.svg';
import arrowLeftInactive from '../../../assets/images/icons-v2/arrow-left-inactive.svg';
import arrowRightActive from '../../../assets/images/icons-v2/arrow-right-active.svg';
import arrowRightInactive from '../../../assets/images/icons-v2/arrow-right-inactive.svg';
import balance from '../../../assets/images/icons-v2/balance.svg';
import bookmarksIconEmptyState from '../../../assets/images/icons-v2/bookmarks-empty-state.svg';
import btcIcon from '../../../assets/images/icons-v2/icon-btc.svg';
import checkboxFilled from '../../../assets/images/icons-v2/checkmark-filled.svg';
import checkmark from '../../../assets/images/icons-v2/checkmark.svg';
import copy from '../../../assets/images/icons-v2/copy.svg';
import dashboardIcon from '../../../assets/images/icons-v2/dashboard.svg';
import dashboardIconActive from '../../../assets/images/icons-v2/dashboard-active.svg';
import delegatesIcon from '../../../assets/images/icons-v2/delegates.svg';
import delegatesIconActive from '../../../assets/images/icons-v2/delegates-active.svg';
import feedback from '../../../assets/images/icons-v2/feedback.svg';
import feedbackActive from '../../../assets/images/icons-v2/feedback-active.svg';
import fileOutline from '../../../assets/images/icons-v2/icon-file-outline.svg';
import help from '../../../assets/images/icons-v2/help.svg';
import helpActive from '../../../assets/images/icons-v2/help-active.svg';
import helpCenter from '../../../assets/images/help/help-center.svg';
import helpCenterArrow from '../../../assets/images/help/arrow.svg';
import hidePassphraseIcon from '../../../assets/images/icons-v2/icon-hide-passphrase.svg';
import iconEdit from '../../../assets/images/icons-v2/icon-edit.svg';
import iconEmptyRecentTransactions from '../../../assets/images/icons-v2/empty-recent-transactions.svg';
import iconFilter from '../../../assets/images/icons-v2/icon-filter.svg';
import iconLedgerNanoDevice from '../../../assets/images/icons-v2/icon-ledger-device.svg';
import iconLoader from '../../../assets/images/icons-v2/icon-loader.svg';
import iconTrezorModelTDevice from '../../../assets/images/icons-v2/icon-trezor-device.svg';
import iconWarning from '../../../assets/images/icons-v2/icon-warning.svg';
import incoming from '../../../assets/images/icons-v2/incoming.svg';
import liskChat from '../../../assets/images/help/lisk-chat.svg';
import liskLogo from '../../../assets/images/lisk-logo-v2.svg';
import liskLogoWhite from '../../../assets/images/lisk-logo-white-v2.svg';
import logout from '../../../assets/images/icons-v2/logout.svg';
import logoutActive from '../../../assets/images/icons-v2/logout-active.svg';
import lskIcon from '../../../assets/images/icons-v2/icon-lsk.svg';
import newsFeedAvatar from '../../../assets/images/icons-v2/news-feed-avatar.svg';
import noTweetsIcon from '../../../assets/images/icons-v2/no-tweets.svg';
import okIcon from '../../../assets/images/icons-v2/icon-checkmark.svg';
import outgoing from '../../../assets/images/icons-v2/outgoing.svg';
import searchIconActive from '../../../assets/images/icons-v2/search-active.svg';
import searchIconInactive from '../../../assets/images/icons-v2/search.svg';
import searchInput from '../../../assets/images/icons-v2/search-input.svg';
import settings from '../../../assets/images/icons-v2/settings.svg';
import settingsActive from '../../../assets/images/icons-v2/settings-active.svg';
import showPassphraseIcon from '../../../assets/images/icons-v2/icon-show-passphrase.svg';
import signin from '../../../assets/images/icons-v2/signin.svg';
import signinActive from '../../../assets/images/icons-v2/signin-active.svg';
import transactionError from '../../../assets/images/icons-v2/transaction-error.svg';
import transactionSuccess from '../../../assets/images/icons-v2/transaction-success.svg';
import tx2ndPassphrase from '../../../assets/images/icons-v2/tx-2nd-passphrase.svg';
import txDefault from '../../../assets/images/icons-v2/tx-default.svg';
import txDelegate from '../../../assets/images/icons-v2/tx-delegate.svg';
import txVote from '../../../assets/images/icons-v2/tx-vote.svg';
import user from '../../../assets/images/icons-v2/user.svg';
import userActive from '../../../assets/images/icons-v2/user-active.svg';
import walletIcon from '../../../assets/images/icons-v2/wallet.svg';
import walletIconActive from '../../../assets/images/icons-v2/wallet-active.svg';
import warningIcon from '../../../assets/images/icons-v2/warning-icon.svg';

export const icons = {
  academy,
  alertIcon,
  arrowLeftActive,
  arrowLeftInactive,
  arrowRightActive,
  arrowRightInactive,
  balance,
  bookmarksIconEmptyState,
  btcIcon,
  checkboxFilled,
  checkmark,
  copy,
  dashboardIcon,
  dashboardIconActive,
  delegatesIcon,
  delegatesIconActive,
  feedback,
  feedbackActive,
  fileOutline,
  help,
  helpActive,
  helpCenter,
  helpCenterArrow,
  hidePassphraseIcon,
  iconEdit,
  iconEmptyRecentTransactions,
  iconFilter,
  iconLedgerNanoDevice,
  iconLoader,
  iconTrezorModelTDevice,
  iconWarning,
  incoming,
  liskChat,
  liskLogo,
  liskLogoWhite,
  logout,
  logoutActive,
  lskIcon,
  newsFeedAvatar,
  noTweetsIcon,
  okIcon,
  outgoing,
  searchIconActive,
  searchIconInactive,
  searchInput,
  settings,
  settingsActive,
  showPassphraseIcon,
  signin,
  signinActive,
  transactionError,
  transactionSuccess,
  tx2ndPassphrase,
  txDefault,
  txDelegate,
  txVote,
  user,
  userActive,
  walletIcon,
  walletIconActive,
  warningIcon,
};


const Icon = ({ name, ...props }) => (
  <img src={icons[name]} {...props} />
);

Icon.propTypes = {
  name: PropTypes.oneOf(Object.keys(icons)).isRequired,
};

export default Icon;
