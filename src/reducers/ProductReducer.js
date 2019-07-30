import {
  PRODUCT_NAME_CHANGED,
  PRODUCT_BARCODE_CHANGED,
  PRODUCT_SAVING,
  PRODUCT_SAVE_SUCCESS,
  PRODUCT_FETCHING,
  PRODUCT_FETCH_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  barcode: '',
  loading: false,
  error: '',
  product: null,
  expirationdate: null,
  remindBeforeDate: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PRODUCT_NAME_CHANGED:
      return { ...state, name: action.payload };
    case PRODUCT_BARCODE_CHANGED:
      return { ...state, barcode: action.payload };
    case PRODUCT_SAVING:
      return { ...state, loading: true };
    case PRODUCT_SAVE_SUCCESS:
      return INITIAL_STATE;
    case PRODUCT_FETCHING:
      return { ...state, loading: true };
    case PRODUCT_FETCH_SUCCESS:
      return { ...state, loading: false, product: action.payload };
    default:
      return state;
  }
};