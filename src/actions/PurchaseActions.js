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
import { dateToString, stringToDate } from '../util';

export const purchaseUpdate = ({ prop, value }) => {
  if (prop === 'expirationDate' && value !== null && value.constructor.name !== 'String') {
    value = dateToString(value);
  } else if (prop === 'bestBeforeDate' && value !== null && value.constructor.name !== 'String') {
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
      updatableValues.remindBeforeDate = purchase.remindBeforeDate;
      if (purchase.expirationDate != null) {
        updatableValues.expirationDate = dateToString(purchase.expirationDate);
        updatableValues.expirationDateInMs = stringToDate(purchase.expirationDate).getTime();
        updatableValues.bestBeforeDate = null;
      } else if (purchase.bestBeforeDate != null) {
        updatableValues.bestBeforeDate = dateToString(purchase.bestBeforeDate);
        updatableValues.expirationDateInMs = stringToDate(purchase.bestBeforeDate).getTime();
        updatableValues.expirationDate = null;
      }

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
        remindBeforeDate: purchase.remindBeforeDate,
        amount: purchase.amount,
        productId: product.id,
        userId: currentUser.uid
      };
      if (purchase.expirationDate != null) {
        new_purchase.expirationDate = dateToString(purchase.expirationDate);
        new_purchase.expirationDateInMs = stringToDate(purchase.expirationDate).getTime();
        new_purchase.bestBeforeDate = null;
      } else if (purchase.bestBeforeDate != null) {
        new_purchase.bestBeforeDate = dateToString(purchase.bestBeforeDate);
        new_purchase.expirationDateInMs = stringToDate(purchase.bestBeforeDate).getTime();
        new_purchase.expirationDate = null;
      }

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
    .onSnapshot((snapshot) => {
      if (snapshot.exists) {
        let purchase = snapshot.data();
        purchase.id = snapshot.id;
        dispatch({ type: PURCHASE_FETCH_SUCCESS, payload: purchase });
      }
    }, (err) =>{
      console.error("Error fetching document: ", err);
    });
  };
}

export const deletePurchase = (purchaseId) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    dispatch({ type: PURCHASE_DELETING });

    firebase.firestore().collection("purchases").doc(purchaseId).delete().then(() => {
      dispatch({ type: PURCHASE_DELETE_SUCCESS });
      Actions.main({ type: 'reset' });
    }).catch(function(error) {
      console.error("Error removing document: ", error);
      // TODO: handle delete error
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
