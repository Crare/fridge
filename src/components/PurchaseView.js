import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Picker } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection, Input, Button, Spinner, CustomDatePicker } from './common';
import { fetchProduct, purchaseUpdate } from '../actions';

class PurchaseView extends Component {

  componentDidMount() {
    if (this.props.product_key) {
      console.log('product_key:', this.props.product_key);
      this.props.fetchProduct(this.props.product_key);
    }
  }

  pressedSave() {
    console.log('pressed save!');
  }

  reportProduct() {
    console.log('pressed report product!');
    Actions.report();
  }

  renderProduct() {
    if (this.props.loading || !this.props.product) {
      return (
        <Card>
          <CardSection>
            <Spinner />
          </CardSection>
        </Card>
      );
    }

    const { product } = this.props;

    return (
      <Card>
        <CardSection style={{padding: 15}}>
          <Text style={{fontWeight: '600' }}>name:</Text>
          <Text>{product.name}</Text>
        </CardSection>
        
        <CardSection style={{padding: 15}}>
          <Text style={{fontWeight: '600' }}>barcode:</Text>
          <Text>{product.barcode}</Text>
        </CardSection>

        <CardSection style={{ padding: 15, marginBottom: 10 }}>
          <Text style={{ width: '50%' }}>
            Wrong or inappropriate product? Report it to fix it:
          </Text>
          <Button style={{ width: '50%', height: 40, margin: 'auto' }}
            onPress={this.reportProduct.bind(this)}>
            Report product
          </Button>
        </CardSection>
      </Card>
    );
  }

  render() {

    const { expirationdate, remindBeforeDate, amount } = this.props;

    return (
      <View>

        {this.renderProduct()}

        <Card>

          <CardSection>
            <CustomDatePicker
            label="Expiration date:" 
            date={expirationdate}
            dateChanged={value => this.props.purchaseUpdate({ prop: 'expirationdate', value })}
            />
          </CardSection>
          
          <CardSection style={{ padding: 15 }}>
            <Text>Add another purchase by scanning the barcode again, if expiration date is different.</Text>
          </CardSection>

          <CardSection style={{ flexDirection: 'column' }}>
            <Text style={{ flex: 1 }}>Remind me about expiration:</Text>
            <Picker style={{ flex: 1 }}
              selectedValue={this.props.shift}
              onValueChange={value => this.props.purchaseUpdate({ prop: 'remindBeforeDate', value })}
            >
              <Picker.Item label="On expiration day" value="0" />
              <Picker.Item label="1 day before" value="1" />
              <Picker.Item label="2 days before" value="2" />
              <Picker.Item label="3 days before" value="3" />
              <Picker.Item label="4 days before" value="4" />
              <Picker.Item label="5 days before" value="5" />
              <Picker.Item label="6 days before" value="6" />
              <Picker.Item label="1 week before" value="7" />
              <Picker.Item label="2 weeks before" value="14" />
              <Picker.Item label="3 weeks before" value="21" />
              <Picker.Item label="4 weeks before" value="28" />
            </Picker>
          </CardSection>

          <CardSection>
            <Input label="Amount:" 
              placeholder="1 piece, 2 pieces, etc..."
              onValueChange={value => this.props.purchaseUpdate({ prop: 'amount', value })}
              value={amount}
            />
          </CardSection>

        </Card>

        <Card>
          <CardSection>
            <Button style={{ width: '50%'}} onPress={() => Actions.pop()}>Cancel</Button>
            <Button style={{ width: '50%'}}
              onPress={this.pressedSave.bind(this)}>
                Save
            </Button>
          </CardSection>
        </Card>
      </View>
    );
  };
}


const mapStateToProps = (state) => {
  console.log('mapStateToProps state:', state);
  console.log('mapStateToProps props:', this.props);
  const { expirationdate, remindBeforeDate, product, error, loading } = state.product;

  return { expirationdate, remindBeforeDate, product, error, loading };
};


export default connect(mapStateToProps, { fetchProduct, purchaseUpdate }) (PurchaseView);