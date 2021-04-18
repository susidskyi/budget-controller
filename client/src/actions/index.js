import axios from 'axios';

export const getIncomes = (start_date, end_date) => (dispatch) => {
  const URL = `${process.env.REACT_APP_API_URL}/api/incomes/`;

  const params = {
    start_date,
    end_date,
  };

  axios.get(URL, { params }).then((response) => {
    return dispatch({
      type: 'GET_INCOMES',
      payload: response.data,
    });
  });
};

export const getExpenses = (start_date, end_date) => (dispatch) => {
  const URL = `${process.env.REACT_APP_API_URL}/api/expenses/`;

  const params = {
    start_date,
    end_date,
  };

  axios.get(URL, { params }).then((response) => {
    return dispatch({
      type: 'GET_EXPENSES',
      payload: response.data,
    });
  });
};
