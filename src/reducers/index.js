import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import PurchaseReducer from './PurchaseReducer';

export default combineReducers({
  auth: AuthReducer,
  purchases: PurchaseReducer
});