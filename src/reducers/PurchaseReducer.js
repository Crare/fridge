import {
  PURCHASE_UPDATE,
  PURCHASE_SAVE_SUCCESS,
  PURCHASE_FETCHING,
  PURCHASE_FETCH_SUCCESS,
  RESET,
  PURCHASE_DELETING,
  PURCHASE_DELETE_SUCCESS,
  PRODUCT_SAVE_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  loading: false,
  error: '',
  purchase: {
    expirationDate: new Date(),
    remindBeforeDate: 1,
    amount: null
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PURCHASE_UPDATE:
      // action.payload === { prop: 'name', value: 'jane' } 
      return { ...state, purchase: { ...state.purchase, [action.payload.prop]: action.payload.value }};
    case PURCHASE_FETCHING:
    case PURCHASE_DELETING:
      return { ...state, loading: true };
    case PURCHASE_FETCH_SUCCESS:
      return { ...state, loading: false, purchase: action.payload };
    case PURCHASE_DELETE_SUCCESS:
    case PURCHASE_SAVE_SUCCESS:
    case RESET:
      return INITIAL_STATE;
    default:
      return state;
  }
};