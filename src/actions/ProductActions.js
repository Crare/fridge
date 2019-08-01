import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  PRODUCT_SAVING,
  PRODUCT_SAVE_SUCCESS,
  PRODUCT_FETCHING,
  PRODUCT_FETCH_SUCCESS,
  PRODUCT_UPDATE
} from './types';

export const productUpdate = ({ prop, value }) => {
  return {
    type: PRODUCT_UPDATE,
    payload: { prop, value }
  };
};

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
        let product = snapshot.val();
        product.uid = product_key;
        dispatch({ type: PRODUCT_FETCH_SUCCESS, payload: product });
      });
  };
}
