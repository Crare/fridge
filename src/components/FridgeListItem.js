import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import { CardSection } from './common';
import { stringToDate } from '../util';

class FridgeListItem extends Component {

  calculateExpirationDays(expirationDate, bestBeforeDate) {
    let b;
    let descriptionText = '', descriptionText2 = '';
    if (expirationDate != null) {
      b = moment(stringToDate(expirationDate));
      descriptionText = 'expires';
      descriptionText2 = 'expired';
    } else {
      b = moment(stringToDate(bestBeforeDate));
      descriptionText = 'bestbefore';
      descriptionText2 = 'bestbefore';
    }
    const a = moment(new Date());
    const days = b.diff(a, 'days');
    const dayText = Math.abs(days) == 1 ? 'day' : 'days';


    if (days >= 0) {
      return `${descriptionText} in ${days} ${dayText}`;
    } else if (days < 0) {
      return `${descriptionText2} ${-days} ${dayText} ago`;
    }
    return `${descriptionText} today`;
  }

  onRowPress() {
    Actions.purchase({ selected_purchase: this.props.purchase });
  }

  render() {
    const { name, expirationDate, bestBeforeDate, amount } = this.props.purchase;
    const { containerStyle, titleStyle, expirationStyle, piecesStyle } = styles;

    return (
      <TouchableWithoutFeedback onPress={ () => this.onRowPress()}>
        <View style={containerStyle}>
          <CardSection style={{ flexDirection: 'row' }}>
            <Text style={expirationStyle}>
              {this.calculateExpirationDays(expirationDate, bestBeforeDate)}
            </Text>
            <Text style={titleStyle}>
              {name}
            </Text>
            <Text style={piecesStyle}>
              {amount}
            </Text>
          </CardSection>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
 
const styles = {
  containerStyle: {
    position: 'relative',
    paddingBottom: 10
  },
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15,
    paddingBottom: 15,
    paddingTop: 15,
    flex: 2
  },
  expirationStyle: {
    fontSize: 14,
    position: 'absolute',
    bottom: 5,
    right: 5
  },
  piecesStyle: {
    fontSize: 14,
    position: 'absolute',
    top: 5,
    right: 5
  }
}
 
export default FridgeListItem;