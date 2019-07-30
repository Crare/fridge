import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  PURCHASES_FETCH_SUCCESS,
  PURCHASES_FETCHING
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
    
    firebase.database().ref(`/users/${currentUser.uid}/purchases`)
      .on('value', snapshot => { // is called whenever value is changed
        console.log('fetchPurchases, snapshot.val(): ', snapshot.val());
        dispatch({ type: PURCHASES_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};