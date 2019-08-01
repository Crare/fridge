import firebase from 'firebase';
import {
  REPORT_UPDATE,
  REPORT_SAVING,
  REPORT_SAVE_SUCCESS
} from './types';
import { Actions } from 'react-native-router-flux';

export const reportUpdate = ({ prop, value }) => {
  return {
    type: REPORT_UPDATE,
    payload: { prop, value }
  };
};

export const sendReport = ({name, barcode, originalName, originalBarcode, productId }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    dispatch({ type: REPORT_SAVING });

    // TODO: send report
    let reportObject = firebase.database().ref(`/reports`).push();

    reportObject.set({ 
      name, 
      barcode, 
      originalName,
      originalBarcode,
      productId,
      userId: currentUser.uid,
      sendDate: new Date()
    }).then(() => {
      dispatch({ type: REPORT_SAVE_SUCCESS });
      Actions.main({ type: 'reset' });
    });
  };
};