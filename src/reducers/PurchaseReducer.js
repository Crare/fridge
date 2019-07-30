import {
  PURCHASE_UPDATE,
  PURCHASE_SAVE_SUCCESS,
  PURCHASE_FETCHING,
  PURCHASE_FETCH_SUCCESS,
  RESET
} from '../actions/types';

const INITIAL_STATE = {
  loading: false,
  error: '',
  purchase: {
    expirationdate: null,
    remindBeforeDate: null,
    amount: null
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PURCHASE_UPDATE:
      // action.payload === { prop: 'name', value: 'jane' } 
      return { ...state, purchase: { ...state.purchase, [action.payload.prop]: action.payload.value }};
    case PURCHASE_SAVE_SUCCESS:
      return INITIAL_STATE;
    case PURCHASE_FETCHING:
      return { ...state, loading: true };
    case PURCHASE_FETCH_SUCCESS:
      return { ...state, loading: false, purchase: action.payload };
    case RESET:
      return INITIAL_STATE;
    default:
      return state;
  }
};