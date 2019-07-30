import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  PRODUCT_NAME_CHANGED,
  PRODUCT_BARCODE_CHANGED,
  PRODUCT_SAVING,
  PRODUCT_SAVE_SUCCESS,
  PRODUCT_FETCHING,
  PRODUCT_FETCH_SUCCESS
} from './types';

export const nameChanged = (text) => {
  return {
    type: PRODUCT_NAME_CHANGED,
    payload: text
  }
}

export const barcodeChanged = (text) => {
  return {
    type: PRODUCT_BARCODE_CHANGED,
    payload: text
  }
}

export const saveNewProduct = ({ name, barcode }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    dispatch({ type: PRODUCT_SAVING });

    let productObject = firebase.database().ref(`/products`).push();

    productObject.set({ name, barcode, user_uid: currentUser.uid })
      .then(() => {

        dispatch({ type: PRODUCT_SAVE_SUCCESS });
        Actions.purchase({ product_key: productObject.getKey() });

      });
  };
}

export const fetchProduct = (product_key) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    dispatch({ type: PRODUCT_FETCHING });

    firebase.database().ref(`/products/${product_key}`)
      .on('value', snapshot => { // is called whenever value is changed
        console.log(snapshot.val());
        dispatch({ type: PRODUCT_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
}
