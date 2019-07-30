import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import FridgeReducer from './FridgeReducer';
import PurchaseReducer from './PurchaseReducer';
import ProductReducer from './ProductReducer';

export default combineReducers({
  auth: AuthReducer,
  fridge: FridgeReducer,
  purchase: PurchaseReducer,
  product: ProductReducer
});