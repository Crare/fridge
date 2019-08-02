import firebase from 'firebase';
import {
  REPORT_UPDATE,
  REPORT_SAVING,
  REPORT_SAVE_SUCCESS
} from './types';
import { Actions } from 'react-native-router-flux';
import { dateToString } from '../util';

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

    firebase.firestore().collection('reports').add({ 
      name, 
      barcode, 
      originalName,
      originalBarcode,
      productId,
      userId: currentUser.uid,
      sendDate: dateToString(new Date())
    }).then((docRef) => {
      dispatch({ type: REPORT_SAVE_SUCCESS });
      Actions.main({ type: 'reset' });
    }).catch((error) => {
      console.error("Error adding document: ", error);
    });
  };
};
