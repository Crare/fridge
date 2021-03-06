import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  LOGOUT_USER,
  NO_USER_LOGGED_IN,
  CHECKING_USER_LOGIN
} from '../actions/types';

export const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  error: '',
  loading: false
};  

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_USER_SUCCESS:
      return { ...state, user: action.payload, error: '', loading: false };
    case LOGIN_USER_FAIL:
      return { ...state, error: 'Authentication Failed.', loading: false };
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case LOGOUT_USER:
      return INITIAL_STATE;
    case NO_USER_LOGGED_IN:
      return { ...state, loading: false };
    case CHECKING_USER_LOGIN:
      return { ...state, loading: true };
    default:
      return state;
  }
}