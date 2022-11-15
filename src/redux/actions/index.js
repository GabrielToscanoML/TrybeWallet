// Coloque aqui suas actions
const userEmail = (email) => ({
  type: 'USER_EMAIL',
  payload: email,
});

export default userEmail;

const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
function requestCurrencies(currencies) {
  return {
    type: REQUEST_CURRENCIES,
    currencies,
  };
}

export function requestCurrenciesAPI() {
  return async (dispatch) => {
    const request = await fetch('https://economia.awesomeapi.com.br/json/all');
    const response = await request.json();
    const filterCurrencies = Object.keys(response).filter((item) => item !== 'USDT');
    dispatch(requestCurrencies(filterCurrencies));
  };
}

const USER_EXPENSE = 'USER_EXPENSE';
function requestInfo(expense) {
  return {
    type: USER_EXPENSE,
    expense,
  };
}

export function requestInfoAPI(value) {
  return async (dispatch) => {
    const request = await fetch('https://economia.awesomeapi.com.br/json/all');
    const response = await request.json();
    const userExpense = { ...value, exchangeRates: response };
    dispatch(requestInfo(userExpense));
  };
}

export const removeUserExpense = (payload) => ({
  type: 'REMOVE_USER_EXPENSE',
  payload,
});
