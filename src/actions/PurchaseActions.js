import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  PURCHASE_UPDATE,
  PURCHASE_SAVING,
  PURCHASE_SAVE_SUCCESS,
  PURCHASE_FETCHING,
  PURCHASE_FETCH_SUCCESS,
  PURCHASE_DELETING,
  PURCHASE_DELETE_SUCCESS,
  PURCHASES_FETCHING,
  PURCHASES_FETCH_NO_RESULTS,
  PURCHASES_FETCH_SUCCESS,
  RESET
} from './types';

export const purchaseUpdate = ({ prop, value }) => {
  if (prop === 'expirationDate' && value.constructor.name !== 'String') {
    value = dateToString(value);
  }

  return {
    type: PURCHASE_UPDATE,
    payload: { prop, value }
  };
};

export const savePurchase = ({ product, purchase }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    dispatch({ type: PURCHASE_SAVING });

    if (purchase.id) {
      // existing purchase
      let updatableValues = {};
      updatableValues.amount = purchase.amount;
      updatableValues.expirationDate = dateToString(purchase.expirationDate);
      updatableValues.expirationDateInMs = stringToDate(purchase.expirationDate).getTime();
      updatableValues.remindBeforeDate = purchase.remindBeforeDate;

      let collection = firebase.firestore().collection('purchases').doc(purchase.id);

      firebase.firestore().batch().update(collection, updatableValues).commit()
      .then(() => {
        dispatch({ type: PURCHASE_SAVE_SUCCESS });
        Actions.main({ type: 'reset' });
      });

    } else {
      // new purchase
      let new_purchase = {
        name: product.name,
        barcode: product.barcode,
        expirationDate: dateToString(purchase.expirationDate),
        expirationDateInMs: stringToDate(purchase.expirationDate).getTime(),
        remindBeforeDate: purchase.remindBeforeDate,
        amount: purchase.amount,
        productId: product.id,
        userId: currentUser.uid
      };

      firebase.firestore().collection('purchases').add(new_purchase).then((docRef) => {
        dispatch({ type: PURCHASE_SAVE_SUCCESS });
        Actions.main({ type: 'reset' });
      }).catch((error) => {
        console.error("Error adding document: ", error);
        // TODO: handle error
        // dispatch({ type: PURCHASE_SAVE_ERROR });
      });
    }
  };
}

export const fetchPurchase = (purchaseId) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    dispatch({ type: PURCHASE_FETCHING });

    firebase.firestore().collection("purchases").doc(purchaseId)
    .onSnapshot(function(doc) {
      if (doc.exists) {
        let purchase = doc.data();
        purchase.id = doc.id;
        dispatch({ type: PURCHASE_FETCH_SUCCESS, payload: purchase });
      }
    });
  };
}

export const deletePurchase = (purchaseId) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    dispatch({ type: PURCHASE_DELETING });

    let purchaseRef = firebase.firestore().collection('purchases').doc(purchaseId);
    firebase.firestore().batch().delete(purchaseRef).commit()
    .then(() => {
      dispatch({ type: PURCHASE_DELETE_SUCCESS });
      dispatch({ type: RESET });
      Actions.main({ type: 'reset' });
    });

  }
}

export const fetchPurchases = () => {
  const { currentUser } = firebase.auth();
  
  return (dispatch) => {
    dispatch({type: PURCHASES_FETCHING });

    firebase.firestore().collection('purchases')
      .where('userId', '==', currentUser.uid)
      // .orderBy("expirationDateInMs")
      .get()
      .then(function(querySnapshot) {
        if(querySnapshot.empty) {
          console.log('empty result');
          dispatch({ type: PURCHASES_FETCH_NO_RESULTS });
        } else {
          let purchases = [];
          querySnapshot.forEach(function(doc) {
            let purchase = doc.data();
            purchase.id = doc.id;
            purchases.push(purchase);
          });
          purchases.sort((a, b) => (a.expirationDateInMs > b.expirationDateInMs) ? 1 : -1); // order by expirationDateInMs
          dispatch({ type: PURCHASES_FETCH_SUCCESS, payload: { purchases } });
        }
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  };
};

/**
 * converts dateString to Javascript Date object.
 * @var dateString a string in format 'dd.MM.YYYY'
 * @returns Date object
 */
const stringToDate = (dateString) => {
  if (!dateString || dateString.constructor.name === 'Date') {
    return dateString;
  }

  const day = dateString.substring(0,2);
  const month = dateString.substring(3,5);
  const year = dateString.substring(6,10);
  
  return new Date(`${year}-${month}-${day}`);
}

/**
 * date converted to string in format 'dd.MM.YYYY'
 * @var date a Javascript Date object.
 * @returns a date string in format 'dd.MM.YYYY'
 */
const dateToString = (date) => {
  if (!date ||date.constructor.name === 'String') {
    return date;
  }

  const day = date.getDate() < 10 ? ('0'+date.getDate()) : date.getDate();
  const month = (date.getMonth()+1) < 10 ? ('0'+(date.getMonth()+1)) : (date.getMonth()+1);
  const year = date.getFullYear();
  
  return `${day}.${month}.${year}`;
}