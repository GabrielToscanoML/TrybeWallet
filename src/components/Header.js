import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './header.css';
import logo from '../assets/logo_Trybe_Wallet.svg';

class Header extends Component {
  render() {
    const { userEmail, expenses } = this.props;
    const convertCurrency = expenses.map((item) => +item.value
    * +item.exchangeRates[item.currency].ask);
    const result = convertCurrency.reduce((prev, curr) => prev + curr, 0);
    return (
      <header className="main-header">
        <img src={ logo } alt="logoTrybe" />
        <div className="right-side">
          <p data-testid="email-field">
            Email:
            {' '}
            { userEmail }
          </p>
          <div className="despesa">
            <p data-testid="total-field">
              { result ? result.toFixed(2) : '0.00' }
            </p>
            <p
              data-testid="header-currency-field"
              className="cambio"
            >
              BRL
            </p>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default connect(mapStateToProps)(Header);
