import * as firebase from 'firebase';
import 'firebase/firestore';
import { Actions } from 'react-native-router-flux';
import {
  PRODUCT_SAVING,
  PRODUCT_SAVE_SUCCESS,
  PRODUCT_FETCHING,
  PRODUCT_FETCH_SUCCESS,
  PRODUCT_UPDATE,
  PRODUCT_SEARCHING,
  PRODUCT_SEARCH_NO_RESULTS,
  PRODUCT_SEARCH_GOT_RESULT
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

    firebase.firestore().collection('products').add({ name, barcode }).then((docRef) => {
      dispatch({ type: PRODUCT_SAVE_SUCCESS });
      Actions.purchase({ productId: docRef.id });
    }).catch((error) => {
      console.error("Error adding document: ", error);
    });
  };
}

export const fetchProduct = (productId) => {
  return (dispatch) => {
    dispatch({ type: PRODUCT_FETCHING });

    firebase.firestore().collection("products").doc(productId)
    .onSnapshot(function(doc) {
      let product = doc.data();
      product.id = doc.id;
      dispatch({ type: PRODUCT_FETCH_SUCCESS, payload: product });
    });
  };
}

export const searchProductByBarcode = (barcode) => {

  return (dispatch) => {
    dispatch({ type: PRODUCT_SEARCHING });

    firebase.firestore().collection('products').where('barcode', '==', barcode)
      .get()
      .then(function(querySnapshot) {
        if (querySnapshot.empty) {
          dispatch({ type: PRODUCT_SEARCH_NO_RESULTS, payload: barcode });
          Actions.newProduct();
        } else {
          let product = querySnapshot.docs[0].data();
          product.id = querySnapshot.docs[0].id;
          dispatch({ type: PRODUCT_SEARCH_GOT_RESULT, payload: product });
          Actions.purchase({ productId: product.id });
        }
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

  };
}