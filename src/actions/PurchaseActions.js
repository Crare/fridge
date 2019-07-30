import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  PURCHASE_UPDATE,
  PURCHASE_SAVING,
  PURCHASE_SAVE_SUCCESS,
  PURCHASE_FETCHING,
  PURCHASE_FETCH_SUCCESS
} from './types';

export const purchaseUpdate = ({ prop, value }) => {
  return {
    type: PURCHASE_UPDATE,
    payload: { prop, value }
  };
};

export const savePurchase = ({ product, purchase, product_key }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    dispatch({ type: PURCHASE_SAVING });

    if(purchase.uid) {
      // existing purchase
      console.log(product, purchase, product_key);

      // Write the new post's data simultaneously in the posts list and the user's post list.
      var updates = {};
      updates[`/users/${currentUser.uid}/purchases/${purchase.uid}/`] = {
        expirationdate: purchase.expirationdate,
        remindBeforeDate: purchase.remindBeforeDate,
        amount: purchase.amount
      };
      console.log('updates: ', updates);
      firebase.database().ref().update(updates).then(() => {
        dispatch({ type: PURCHASE_SAVE_SUCCESS });
        Actions.main({ type: 'reset' });
      });
    } else {
      // new purchase
      firebase.database().ref(`/users/${currentUser.uid}/purchases/`)
        .push()
        .set({
          name: product.name,
          barcode: product.barcode,
          expirationdate: purchase.expirationdate,
          remindBeforeDate: purchase.remindBeforeDate,
          amount: purchase.amount,
          product_key
        }).then(()=> {
          dispatch({ type: PURCHASE_SAVE_SUCCESS });
          Actions.main({ type: 'reset' });
        });
    }
  };
}

export const fetchPurchase = (purchase_uid) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    dispatch({ type: PURCHASE_FETCHING });
    firebase.database().ref(`/users/${currentUser.uid}/purchases/${purchase_uid}`)
      .on('value', snapshot => { // is called whenever value is changed
        dispatch({ type: PURCHASE_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
}