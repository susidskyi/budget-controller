const initialSettings = {
  incomes: [],
  expenses: [],
};

const settings = (state = initialSettings, action) => {
  switch (action.type) {
    case 'GET_INCOMES': {
      return {
        ...state,
        incomes: action.payload,
      };
    }
    case 'GET_EXPENSES': {
      return {
        ...state,
        expenses: action.payload,
      };
    }
    default:
      return state;
  }
};

export default settings;
