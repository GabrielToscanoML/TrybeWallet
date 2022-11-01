import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { userEmail } = this.props;
    return (
      <div>
        <p data-testid="email-field">
          Email:
          {' '}
          { userEmail }
        </p>
        <p data-testid="total-field">
          Despesa Total: R$
          {' '}
          0,00
          {/* aqui vai ser alterado */}
        </p>
        <p data-testid="header-currency-field">
          BRL
          {/* aqui vai ser alterado */}
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
});

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
