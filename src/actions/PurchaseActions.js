import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  PURCHASE_UPDATE,
  PURCHASE_SAVING,
  PURCHASE_SAVE_SUCCESS
} from './types';

export const purchaseUpdate = ({ prop, value }) => {
  return {
    type: PURCHASE_UPDATE,
    payload: { prop, value }
  };
};

export const savePurchase = ({
  name,
  barcode,
  expirationdate,
  remindBeforeDate,
  amount,
  product_key
}) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    dispatch({ type: PURCHASE_SAVING });

    firebase.database().ref(`/users/${currentUser.uid}/purchases/`)
      .push()
      .set({
        name,
        barcode,
        expirationdate,
        remindBeforeDate,
        amount,
        product_key
      }).then(()=> {
        dispatch({ type: PURCHASE_SAVE_SUCCESS });
      });
  };
}