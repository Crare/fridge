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

export const savePurchase = ({ product, purchase }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    dispatch({ type: PURCHASE_SAVING });

    if (purchase.uid) {
      // existing purchase
      var updates = {};
      updates[`/users/${currentUser.uid}/purchases/${purchase.uid}/expirationDate`] = purchase.expirationDate;
      updates[`/users/${currentUser.uid}/purchases/${purchase.uid}/expirationDateInMs`] = createDate(purchase.expirationDate).getTime();
      updates[`/users/${currentUser.uid}/purchases/${purchase.uid}/remindBeforeDate`] = purchase.remindBeforeDate;
      updates[`/users/${currentUser.uid}/purchases/${purchase.uid}/amount`] = purchase.amount;
      
      firebase.database().ref().update(updates).then(() => {
        dispatch({ type: PURCHASE_SAVE_SUCCESS });
        Actions.main({ type: 'reset' });
      });
    } else {
      // new purchase
      let purchase_ = {
        name: product.name,
        barcode: product.barcode,
        expirationDate: purchase.expirationDate,
        expirationDateInMs: createDate(purchase.expirationDate).getTime(),
        remindBeforeDate: purchase.remindBeforeDate,
        amount: purchase.amount,
        product_key: product.uid
      };

      firebase.database().ref(`/users/${currentUser.uid}/purchases/`)
        .push()
        .set(purchase_).then(()=> {
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
        let purchase = snapshot.val();
        purchase.uid = purchase_uid;
        dispatch({ type: PURCHASE_FETCH_SUCCESS, payload:  purchase });
      });
  };
}

/**
 * dateString in format 'dd.MM.YYYY'
 */
const createDate = (dateString) => {
  if (!dateString || dateString.constructor.name === 'Date') {
    return dateString;
  }

  const day = dateString.substring(0,2);
  const month = dateString.substring(3,5);
  const year = dateString.substring(6,10);
  
  return new Date(`${year}-${month}-${day}`);
}