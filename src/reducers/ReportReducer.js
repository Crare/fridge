import {
  REPORT_UPDATE,
  REPORT_SAVING,
  REPORT_SAVE_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  loading: false,
  error: '',
  report: {
    name: '',
    barcode: ''
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REPORT_UPDATE:
      // action.payload === { prop: 'name', value: 'jane' } 
      return { ...state, report: { ...state.report, [action.payload.prop]: action.payload.value }};
    case REPORT_SAVING:
      return { ...state, loading: true };
    case REPORT_SAVE_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
};