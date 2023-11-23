import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { requestCurrenciesAPI, requestInfoAPI } from '../redux/actions';
import Select from './Select';
import './walletForm.css';

const clearState = {
  value: '',
  currency: 'USD',
  description: '',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

const payments = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class WalletForm extends Component {
  state = { ...clearState };

  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(requestCurrenciesAPI());
  }

  handleInputOnChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  onClick = () => {
    const { dispatch, expenses } = this.props;
    const newExpense = { id: expenses.length, ...this.state };
    dispatch(requestInfoAPI(newExpense));
    this.setState({ ...clearState });
  };

  render() {
    const { value, currency, description, method, tag } = this.state;
    const { currencies } = this.props;
    return (
      <form className="wallet-form">
        <section className="input-section">
          <input
            className="value-input"
            type="number"
            data-testid="value-input"
            placeholder="Valor da Despesa:"
            name="value"
            value={ value }
            onChange={ this.handleInputOnChange }
          />
          <input
            className="description-input"
            type="text"
            data-testid="description-input"
            placeholder="Descrição:"
            name="description"
            value={ description }
            onChange={ this.handleInputOnChange }
          />
        </section>
        <section className="select-section">
          <Select
            name="currency"
            dataTestid="currency-input"
            value={ currency }
            options={ currencies }
            onChange={ this.handleInputOnChange }
          />
          <Select
            name="method"
            dataTestid="method-input"
            value={ method }
            options={ payments }
            onChange={ this.handleInputOnChange }
          />
          <Select
            name="tag"
            dataTestid="tag-input"
            value={ tag }
            options={ tags }
            onChange={ this.handleInputOnChange }
          />
        </section>
        <button
          type="button"
          id="add-button"
          onClick={ this.onClick }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
