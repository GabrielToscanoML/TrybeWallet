import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import userEmail from '../redux/actions';
import './login.css';

import logo from '../assets/logo_Trybe_Wallet.svg';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  handleInputOnChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
    this.validationLogin();
  };

  validationLogin = () => {
    const { email, password } = this.state;
    const min = 6;
    const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    let result;
    if (email.match(mailformat)) {
      result = true;
    } else {
      result = false;
    }
    return !(result && password.length >= min);
  };

  onClickButton = () => {
    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(userEmail(email));
    history.push('/carteira');
  };

  render() {
    const { email, password } = this.state;
    return (
      <main className="main-content">
        <section className="teste">
          <div className="login-container">
            <img
              src={ logo }
              alt="logoTrybe"
              width="80%"
            />
            <form className="form-container">
              <input
                className="email-login"
                type="email"
                data-testid="email-input"
                placeholder="Digite seu Email"
                name="email"
                value={ email }
                onChange={ this.handleInputOnChange }
              />
              <input
                className="senha-login"
                type="password"
                data-testid="password-input"
                placeholder="Digite sua senha"
                name="password"
                value={ password }
                onChange={ this.handleInputOnChange }
              />
              {this.validationLogin() && password.length > 0
                ? <small>Email ou senha inválidos!</small>
                : null}
              <button
                name="button-login"
                type="button"
                disabled={ this.validationLogin() }
                onClick={ this.onClickButton }
              >
                Entrar
              </button>
            </form>
          </div>
        </section>
      </main>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
