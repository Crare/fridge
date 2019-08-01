import {
  PURCHASES_FETCH_SUCCESS,
  PURCHASES_FETCHING,
  PURCHASES_FETCH_NO_RESULTS
} from '../actions/types';

const INITIAL_STATE = {
  purchases: [],
  loading: false,
  error: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PURCHASES_FETCH_SUCCESS:
      return action.payload;

    case PURCHASES_FETCH_NO_RESULTS:
      return INITIAL_STATE;

    case PURCHASES_FETCHING:
      return { ...state, loading: true };
      
    default:
      return state;
  }
};