// Testes somente da página de Login
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWith';
import App from '../../App';

describe('Testando os inputs e botão da página de Login', () => {
  it('Testa se existem os inputs de email e senha e o botão na tela de Login', () => {
    renderWithRouterAndRedux(<App />);
    const email = screen.getByTestId('email-input');
    expect(email).toBeInTheDocument();
    const password = screen.getByTestId('password-input');
    expect(password).toBeInTheDocument();
  });
  test('Teste se é renderizado um botão com o texto Entrar', () => {
    renderWithRouterAndRedux(<App />);
    const buttonLogin = screen.getByRole('button', { name: /entrar/i });
    expect(buttonLogin).toBeInTheDocument();
  });
  it('Testando se ao clicar no botão de Login, é direcionado para a carteira', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const email = screen.getByTestId('email-input');
    const senha = screen.getByTestId('password-input');

    // atribuindo valor aos inputs do login
    userEvent.type(email, 'gabriel@outlook.com');
    userEvent.type(senha, 'xxxxxx');

    const button = screen.getByRole('button');
    userEvent.click(button);
    expect(history.location.pathname).toBe('/carteira');
    const selectCurrency = screen.getByTestId('currency-input');
    expect(selectCurrency).toBeInTheDocument();
  });
});
