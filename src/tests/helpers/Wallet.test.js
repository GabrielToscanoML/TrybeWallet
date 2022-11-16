// Testes somente da página da Carteira
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWith';
import Wallet from '../../pages/Wallet';
import WalletForm from '../../components/WalletForm';

describe('Testando os inputs da página Wallet', () => {
  it('Testa se existem os inputs do formulário da carteira', () => {
    renderWithRouterAndRedux(<Wallet />);
    const despesa = screen.getByTestId('value-input');
    expect(despesa).toBeInTheDocument();

    const descricao = screen.getByTestId('description-input');
    expect(descricao).toBeInTheDocument();

    const moeda = screen.getByTestId('currency-input');
    expect(moeda).toBeInTheDocument();

    const metodo = screen.getByTestId('method-input');
    expect(metodo).toBeInTheDocument();

    const tag = screen.getByTestId('tag-input');
    expect(tag).toBeInTheDocument();
  });
});

describe('Testando o componente WalletForm', () => {
  it('testeee', () => {
    renderWithRouterAndRedux(<WalletForm />);
    const buttonAdd = screen.getByRole('button', { name: /adicionar despesa/i });
    expect(buttonAdd).toBeInTheDocument();
    const testeValor = screen.getByTestId('value-input');
    userEvent.type(testeValor, '10');
    const testeDescricao = screen.getByTestId('description-input');
    userEvent.type(testeDescricao, 'teste');
    userEvent.click(buttonAdd);
  });
});
