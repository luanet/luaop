import React from 'react';
import grid from 'flexboxgrid/dist/flexboxgrid.css';
import MultiStepProgressBar from '@shared/multiStepProgressBar';
import MultiStep from '@shared/registerMultiStep';
import BackupPassphrase from './backupPassphrase';
import CreateAccount from './createAccount';
import ConfirmOtp from './confirmOtp';
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
    this.setOtp = this.setOtp.bind(this);
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

  setOtp(value) {
    const { account } = this.state;
    this.setState({
      account: {
        ...account,
        otp: parseInt(Object.values(value).join(''), 10),
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
            <CreateAccount
              account={account}
              setOtp={this.setOtp}
            />
            <ConfirmOtp
              account={account}
            />
          </MultiStep>
        </div>
      </>
    );
  }
}

export default Register;
