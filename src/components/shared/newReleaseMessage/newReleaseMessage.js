import React from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { useTheme } from '@utils/theme';
import FlashMessage from '@toolbox/flashMessage/flashMessage';
import { PrimaryButton, SecondaryButton } from '@toolbox/buttons';
import Icon from '@toolbox/icon';
import styles from './newReleaseMessage.css';

const NewReleaseMessage = ({
  t,
  version,
  releaseSummary,
  updateNow,
  readMore,
  ...props
}) => {
  const theme = useTheme();

  return (
    <FlashMessage shouldShow hasCloseAction={false} {...props}>
      <FlashMessage.Content>
        <div className={styles.container}>
          <Icon name="warningFolder" />
          {t('Luanet {{version}}', { version })}
          {t(' is out. ')}
          {releaseSummary}
          <div className={styles.btnContainer}>
            <SecondaryButton
              className={`${styles.button} read-more ${theme === 'dark' ? theme : ''}`}
              size="s"
              onClick={readMore}
            >
              {t('Read more')}
            </SecondaryButton>
            <PrimaryButton
              className={`${styles.button} update-now ${styles.primary} ${theme}`}
              size="s"
              onClick={updateNow}
            >
              {t('Update now')}
            </PrimaryButton>
          </div>
        </div>
      </FlashMessage.Content>
    </FlashMessage>
  );
};

NewReleaseMessage.propTypes = {
  version: PropTypes.string.isRequired,
  releaseSummary: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]).isRequired,
  updateNow: PropTypes.func.isRequired,
  readMore: PropTypes.func.isRequired,
};

export default withTranslation()(NewReleaseMessage);
