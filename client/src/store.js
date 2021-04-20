import { applyMiddleware, createStore } from 'redux';
import createRootReducer from './reducers';
import thunk from 'redux-thunk';

const store = createStore(createRootReducer(), applyMiddleware(thunk));

export default store;
