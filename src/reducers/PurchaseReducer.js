import {
  PURCHASE_UPDATE
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
      return { ...state, purchase: {...state.purchase, [action.payload.prop]: action.payload.value }};
    default:
      return state;
  }
};