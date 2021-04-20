import { combineReducers } from 'redux';
import settings from './settings';

const createRootReducer = () =>
  combineReducers({
    settings,
  });

export default createRootReducer;
