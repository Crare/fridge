import {
  PRODUCT_UPDATE,
  PRODUCT_SAVING,
  PRODUCT_SAVE_SUCCESS,
  PRODUCT_FETCHING,
  PRODUCT_FETCH_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  loading: false,
  error: '',
  product: {
    name: '',
    barcode: ''
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE:
      // action.payload === { prop: 'name', value: 'jane' } 
      return { ...state, product: {...state.product, [action.payload.prop]: action.payload.value }};
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