import React from 'react';
import PassphraseInput from '../passphraseInput';

class AuthInputs extends React.Component {
  componentDidMount() {
    if (this.props.account.secondSignature) {
      this.props.onChange('secondPassphrase', '');
    }
  }

  onChange(name, value, error) {
    this.props.onChange(name, value, error);
  }

  render() {
    return <span>
      {(!this.props.account.passphrase ?
        <PassphraseInput label='Passphrase'
          className='passphrase'
          error={this.props.passphrase.error}
          value={this.props.passphrase.value}
          onChange={this.onChange.bind(this, 'passphrase')} /> :
        null)}
      {(this.props.account.secondSignature ?
        <PassphraseInput label='Second Passphrase'
          className='second-passphrase'
          error={this.props.secondPassphrase.error}
          value={this.props.secondPassphrase.value}
          onChange={this.onChange.bind(this, 'secondPassphrase')} /> :
        null)}
    </span>;
  }
}

export default AuthInputs;

