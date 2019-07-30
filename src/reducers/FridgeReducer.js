import {
  PURCHASES_FETCH_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  purchases: null,
  loading: false,
  error: '',
  product: null,
  expirationdate: null,
  remindBeforeDate: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PURCHASES_FETCH_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};