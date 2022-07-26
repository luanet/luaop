import React from 'react';
import grid from 'flexboxgrid/dist/flexboxgrid.css';
import MultiStepProgressBar from '@shared/multiStepProgressBar';
import MultiStep from '@shared/registerMultiStep';
import BackupPassphrase from './backupPassphrase';
import ConfirmPassphrase from './confirmPassphrase';
import AccountCreated from './accountCreated';
import styles from './register.css';

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      account: {},
    };

    this.setEmail = this.setEmail.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.setConfirmPassword = this.setConfirmPassword.bind(this);
  }

  setEmail(e) {
    const { account } = this.state;
    this.setState({
      account: {
        ...account,
        email: e.target.value,
      },
    });
  }

  setPassword(value) {
    const { account } = this.state;
    this.setState({
      account: {
        ...account,
        password: value,
      },
    });
  }

  setConfirmPassword(value) {
    const { account } = this.state;
    this.setState({
      account: {
        ...account,
        confirmPassword: value,
      },
    });
  }

  render() {
    const { account } = this.state;
    return (
      <>
        <div className={`${grid.row} ${styles.register}`}>
          <MultiStep
            navStyles={{ multiStepWrapper: styles.wrapper }}
            progressBar={MultiStepProgressBar}
          >
            <BackupPassphrase
              setEmail={this.setEmail}
              setPassword={this.setPassword}
              setConfirmPassword={this.setConfirmPassword}
            />
            <ConfirmPassphrase
              account={account}
            />
            <AccountCreated
              account={account}
            />
          </MultiStep>
        </div>
      </>
    );
  }
}

export default Register;
