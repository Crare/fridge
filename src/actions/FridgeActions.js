// import firebase from 'firebase';
// import { Actions } from 'react-native-router-flux';
import {
  PURCHASES_FETCH_SUCCESS
} from './types';

Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

export const fetchPurchases = () => {
  // const { currentUser } = firebase.auth();
  
  return (dispatch) => {

    const purchases = [
      {name: 'milk', uid: '011', barcode: '0011', expirationDate: new Date().addDays(-5), pieces: 1},
      {name: 'pork', uid: '021', barcode: '0021', expirationDate: new Date().addDays(0.5), pieces: 2},
      {name: 'milk', uid: '111', barcode: '0111', expirationDate: new Date().addDays(1), pieces: 3},
      {name: 'eggs', uid: '222', barcode: '0222', expirationDate: new Date().addDays(2), pieces: 2},
      {name: 'ham', uid: '232', barcode: '0232', expirationDate: new Date().addDays(3), pieces: 1},
      {name: 'yoghurt', uid: '333', barcode: '0333', expirationDate: new Date().addDays(5), pieces: 1}
    ];

    dispatch({ type: PURCHASES_FETCH_SUCCESS, payload: purchases });

    // firebase.database().ref(`/users/${currentUser.uid}/purchases`)
    //   .on('value', snapshot => { // is called whenever value is changed
    //     dispatch({ type: PURCHASES_FETCH_SUCCESS, payload: snapshot.val() });
    //   });
  };
};
