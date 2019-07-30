import {
  PURCHASES_FETCH_SUCCESS,
  PURCHASES_FETCHING
} from '../actions/types';

const INITIAL_STATE = {
  purchases: null,
  loading: false,
  error: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PURCHASES_FETCH_SUCCESS:
      return action.payload;
    case PURCHASES_FETCHING:
        return { ...state, loading: true };
    default:
      return state;
  }
};