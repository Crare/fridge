import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import FridgeReducer from './FridgeReducer';
import PurchaseReducer from './PurchaseReducer';
import ProductReducer from './ProductReducer';
import ReportReducer from './ReportReducer';

export default combineReducers({
  authReducer: AuthReducer,
  fridgeReducer: FridgeReducer,
  purchaseReducer: PurchaseReducer,
  productReducer: ProductReducer,
  reportReducer: ReportReducer
});