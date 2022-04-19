import React from 'react';
import { mount } from 'enzyme';
import { truncateAddress } from '@wallet/utilities/account';
import wallets from '@tests/constants/wallets';
import AccountMigration from './index';

describe('AccountMigration component', () => {
  const props = {
    wallet: wallets.empty_wallet,
    showBalance: true,
  };

  it('should render properly', () => {
    const wrapper = mount(<AccountMigration {...props} />);
    const html = wrapper.html();
    expect(html).toContain(wallets.empty_wallet.legacy.address);
    expect(html).toContain(truncateAddress(wallets.empty_wallet.summary.address, 'medium'));
    expect(html).toContain('98,970,000 LSK');
  });

  it('should not render balance', () => {
    const wrapper = mount(<AccountMigration {...props} showBalance={false} />);
    const html = wrapper.html();
    expect(html).toContain(wallets.empty_wallet.legacy.address, 'medium');
    expect(html).toContain(truncateAddress(wallets.empty_wallet.summary.address, 'medium'));
  });
});
