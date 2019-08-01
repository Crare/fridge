import firebase from 'firebase';
import {
  PURCHASES_FETCH_SUCCESS,
  PURCHASES_FETCHING,
  PURCHASES_FETCH_NO_RESULTS
} from './types';

Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

export const fetchPurchases = () => {
  const { currentUser } = firebase.auth();
  
  return (dispatch) => {
    dispatch({type: PURCHASES_FETCHING });

    firebase.firestore().collection('purchases').where('userId', '==', currentUser.uid)
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
          dispatch({ type: PURCHASES_FETCH_SUCCESS, payload: { purchases } });
        }
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  };
};