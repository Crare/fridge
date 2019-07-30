import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import { CardSection } from './common';
 
class FridgeListItem extends Component {

  calculateExpirationDays(expirationdate) {
    const a = moment(new Date());
    const b = moment(new Date(expirationdate));
    const days = b.diff(a, 'days');
    const dayText = Math.abs(days) == 1 ? 'day' : 'days';
    if (days >= 1) {
      return `expires in ${days} ${dayText}`;
    } else if (days < 0) {
      return `expired ${-days} ${dayText} ago`;
    }
    return `expires today`;
  }

  onRowPress() {
    console.log(this.props.purchase);
    // Actions.employeeEdit({ purchase: this.props.purchase });
  }

  render() {
    const { name, expirationdate, amount } = this.props.purchase;
    const { containerStyle, titleStyle, expirationStyle, piecesStyle } = styles;

    return (
      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
        <View style={containerStyle}>
          <CardSection style={{ flexDirection: 'row' }}>
            <Text style={expirationStyle}>
              {this.calculateExpirationDays(expirationdate)}
            </Text>
            <Text style={titleStyle}>
              {name}
            </Text>
            <Text style={piecesStyle}>
              {amount} pcs
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