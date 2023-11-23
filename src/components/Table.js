import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeUserExpense } from '../redux/actions';
import './table.css';

class Table extends Component {
  removeItem = (id) => {
    const { expenses, dispatch } = this.props;
    const remove = expenses.filter((item) => item.id !== id);
    // enviando as despesas sem a que foi clicada
    dispatch(removeUserExpense(remove));
  };

  render() {
    const { expenses } = this.props;
    return (
      <main className="expenses-container">
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((item) => (
              <tr key={ item.id }>
                <td className="description">{item.description}</td>
                <td>{item.tag}</td>
                <td className="method">{item.method}</td>
                <td>{Number(item.value).toFixed(2)}</td>
                <td>{item.exchangeRates[item.currency].name}</td>
                <td>
                  {Number(item.exchangeRates[item.currency].ask).toFixed(2)}
                </td>
                <td>
                  {Number(item.value * item.exchangeRates[item.currency].ask).toFixed(2)}
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.removeItem(item.id) }
                  >
                    Excluir
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default connect(mapStateToProps)(Table);
