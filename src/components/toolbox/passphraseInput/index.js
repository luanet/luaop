import React from 'react';
import { withTranslation } from 'react-i18next';
import { keyCodes } from '@constants';
import Icon from '../icon';
import Input from '../inputs/input';
import Feedback from '../feedback/feedback';
import styles from './passphraseInput.css';

class passphraseInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showPassphrase: false,
      partialPassphraseError: [],
      values: [],
      focus: 0,
      validationError: '',
      passphraseIsInvalid: false,
      inputsLength: props.inputsLength,
    };

    this.handleToggleShowPassphrase = this.handleToggleShowPassphrase.bind(this);
    this.setFocusedField = this.setFocusedField.bind(this);
    this.removeFocusedField = this.removeFocusedField.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.keyAction = this.keyAction.bind(this);
    this.handlePaste = this.handlePaste.bind(this);
  }

  keyAction(event) {
    let { focus } = this.state;
    const { inputsLength } = this.state;
    const index = parseInt(event.target.dataset.index, 10);

    if ((event.which === keyCodes.delete && !this.state.values[focus])
      || event.which === keyCodes.arrowLeft) {
      focus = index - 1 < 0 ? index : index - 1;
      event.preventDefault();
    }
    this.setState({ focus, inputsLength });
  }

  handlePaste({ clipboardData, target }) {
    let { values, inputsLength } = this.state;
    const index = parseInt(target.dataset.index, 10);
    const pastedValue = clipboardData.getData('Text').trim().replace(/\W+/g, ' ').split(/\s/);
    if (pastedValue.length <= 1) {
      values[index] = '';
    } else {
      const insertedValue = [
        ...Array(index),
        ...pastedValue,
      ];
      inputsLength = insertedValue.length > inputsLength
        ? this.props.maxInputsLength : inputsLength;
      values = insertedValue
        .map((value, key) => value || values[key])
        .splice(0, inputsLength);
    }

    this.validatePassphrase({ values, inputsLength });
  }

  handleValueChange({ target }) {
    const { values } = this.state;
    const index = parseInt(target.dataset.index, 10);
    const insertedValue = target.value.trim().replace(/\W+/g, ' ');
    if (insertedValue.split(/\s/).length > 1) return;

    values[index] = insertedValue;
    this.validatePassphrase({ values, focus: index });
  }

  validatePassphrase({ values, inputsLength = this.state.inputsLength, focus = 0 }) {
    let errorState = { validationError: '', partialPassphraseError: [], passphraseIsInvalid: false };

    const passphrase = values.join(' ').trim();
    if (!passphrase.length) {
      errorState = {
        ...errorState,
        passphraseIsInvalid: true,
        validationError: this.props.t('Required'),
      };
    }

    if (passphrase.length < 6) {
      errorState = {
        ...errorState,
        passphraseIsInvalid: true,
        validationError: this.props.t('Password must be at least 6 characters'),
      };
    }

    this.setState({
      values,
      inputsLength,
      focus,
      ...errorState,
    });

    this.props.onFill(passphrase, errorState.validationError);
  }

  removeFocusedField() {
    this.setState({ focus: null });
  }

  setFocusedField({ target }) {
    const focus = parseInt(target.dataset.index, 10);
    const value = target.value;
    target.value = '';
    target.value = value;
    this.setState({ focus });
  }

  handleToggleShowPassphrase() {
    this.setState(({ showPassphrase }) => ({ showPassphrase: !showPassphrase }));
  }

  render() {
    const { t, keyPress } = this.props;
    const {
      focus,
      inputsLength,
      partialPassphraseError,
      passphraseIsInvalid,
      showPassphrase,
      validationError,
      values,
    } = this.state;
    const iconName = showPassphrase ? 'showPassphraseIcon' : 'hidePassphraseIcon';
    const isFeedbackOnError = validationError;

    return (
      <>
        <div className={styles.wrapper}>
          <label className={`${styles.showPassphrase}`} onClick={this.handleToggleShowPassphrase}>
            <Icon name={iconName} />
            <span className={`${styles.label}`}>{showPassphrase ? t('Hide') : t('Show')}</span>
          </label>

          <div className={[
            styles.inputs,
            partialPassphraseError.length ? styles.boxOnError : '',
            'passphrase',
          ].join(' ')}
          >
            {
              [...Array(inputsLength)].map((x, i) => (
                <span key={i} className={styles.inputContainer} autoComplete="off">
                  <Input
                    setRef={ref => ref !== null && this.state.focus === i && ref.focus()}
                    // placeholder="_________"
                    className={[
                      partialPassphraseError[i] || passphraseIsInvalid ? 'error' : '',
                      focus === i ? 'selected' : '',
                    ].join(' ')}
                    value={values[i] || ''}
                    type={this.state.showPassphrase ? 'text' : 'password'}
                    autoComplete="off"
                    onBlur={this.removeFocusedField}
                    onFocus={this.setFocusedField}
                    onPaste={this.handlePaste}
                    onChange={this.handleValueChange}
                    onKeyDown={this.keyAction}
                    onKeyPress={keyPress}
                    data-index={i}
                    name={this.props.name}
                  />
                </span>
              ))
            }
          </div>

          <div className={styles.footerContent}>
            <Feedback
              className={styles.errorMessage}
              status={isFeedbackOnError ? 'error' : 'ok'}
              message={validationError}
            />
          </div>
        </div>
      </>
    );
  }
}

export default withTranslation()(passphraseInput);
