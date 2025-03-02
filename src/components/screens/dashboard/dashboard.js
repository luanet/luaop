// istanbul ignore file
import React from 'react';

import WalletDetails from '@shared/walletDetails';
import Onboarding from '@toolbox/onboarding/onboarding';
import InfoBanner from '@toolbox/infoBanner/infoBanner';
import Statistic from './statistic';
import NodeBandwidthChart from '../status/nodeBandwidthChart';
import styles from './dashboard.css';

const getOnboardingSlides = (t) => [
  {
    title: t('Ready to go!'),
    content: t(
      'The ultimate gateway to the ecosystem. Lisk’s new design lets you easily manage your LSK (and much, much more).',
    ),
    illustration: 'hubReadyToGo',
  },
  {
    title: t('Stay Informed'),
    content: t(
      'Keep up-to-date with announcements from the Lisk Foundation. Check what network delegates have been up to with dedicated profile pages.',
    ),
    illustration: 'builtAroundCommunity',
  },
  {
    title: t('Effortlessly send and receive tokens'),
    content: t(
      'Personalize each transaction with a custom message.',
    ),
    illustration: 'sendLSKTokens',
  },
  {
    title: t('Get Involved'),
    content: t(
      'Community is key. Vote for delegates, or register as one yourself. Feel like a feature is missing? Request it directly from the Lisk.',
    ),
    illustration: 'timeToContribute',
  },
];

const Dashboard = ({ account, t }) => {
  const OnboardingBannerName = 'dashboardOnboarding';

  return (
    <>
      <div className={`${styles.wrapper} dashboard-container`}>
        <Onboarding
          slides={getOnboardingSlides(t)}
          actionButtonLabel={t('Got it, thanks!')}
          name={OnboardingBannerName}
        />
        <InfoBanner
          name="btcRemoval"
          infoMessage={t('Please note: BTC support has been removed as of Lisk v2.2.0')}
          infoDescription={t('If you are affected by this change, please click the link below to learn how to access your BTC using an alternative application.')}
          infoLabel="Update"
          infoLink="https://lisk.com/blog/development/lisk-desktop-220-release"
          show={localStorage.getItem(OnboardingBannerName)}
        />
        <div className={`${styles.main}`}>
          <div className={`${styles.community} community-feed`}>
            <Statistic accessToken={account.access_token} />
            <NodeBandwidthChart />
          </div>
          <div className={styles.subContainer}>
            <WalletDetails className={styles.marginFix} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
