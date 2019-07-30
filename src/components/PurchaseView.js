import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Picker } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection, Input, Button, Spinner, CustomDatePicker } from './common';
import { fetchProduct, purchaseUpdate, savePurchase } from '../actions';

class PurchaseView extends Component {

  componentDidMount() {
    if (this.props.product_key) {
      this.props.fetchProduct(this.props.product_key);
    }
  }

  pressedSave() {
    const {product, purchase, product_key } = this.props;
    
    this.props.savePurchase({ 
      name: product.name,
      barcode: product.barcode,
      expirationdate: purchase.expirationdate,
      remindBeforeDate: purchase.remindBeforeDate,
      amount: purchase.amount,
      product_key
    });
  }

  reportProduct() {
    console.log('pressed report product!');
    Actions.report();
  }

  spinner() {
    return (
      <Card>
        <CardSection>
          <Spinner />
        </CardSection>
      </Card>
    ); 
  }

  errorCard(text) {
    return (
      <Card>
        <CardSection>
          <Text>{text}</Text>
        </CardSection>
      </Card>
    );
  }

  renderProduct() {
    if (this.props.productLoading) {
      return this.spinner();
    } else if (this.props.productError) {
      return this.errorCard(this.props.productError);
    }
    const { name, barcode } = this.props.product;
    const { productLabelStyle, productTextStyle } = styles;

    return (
      <Card>
        <CardSection style={{padding: 15}}>
          <Text style={productLabelStyle}>Name: </Text>
          <Text style={productTextStyle}>{name}</Text>
        </CardSection>
        
        <CardSection style={{padding: 15}}>
          <Text style={productLabelStyle}>Barcode: </Text>
          <Text style={productTextStyle}>{barcode}</Text>
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

  renderSaveButton() {
    const { purchase } = this.props;
    let disabled = false;

    if (purchase.expirationdate 
      && purchase.remindBeforeDate 
      && purchase.amount) {
      disabled = true;
    }

    return (
      <Button
        style={{ width: '50%'}}
        disabled={disabled}
        onPress={this.pressedSave.bind(this)}>
          Save
      </Button>
    );
  }
  renderButtons() {
    if (this.props.purchaseLoading) {
      return this.spinner();
    } else if (this.props.purchaseError) {
      return this.errorCard(this.props.purchaseError);
    }
    
    return (
      <Card>
        <CardSection>
          <Button style={{ width: '50%'}} onPress={() => Actions.pop()}>Cancel</Button>
          <Button style={{ width: '50%'}}
            onPress={this.pressedSave.bind(this)}>
              Save
          </Button>
          {this.renderSaveButton()}
        </CardSection>
      </Card>
    );
  }

  render() {

    const { expirationdate, remindBeforeDate, amount } = this.props.purchase;

    return (
      <View>

        {this.renderProduct()}

        <Card>

          <CardSection>
            <CustomDatePicker
            label="Expiration date:" 
            date={expirationdate}
            minDate={new Date()}
            dateChanged={value => this.props.purchaseUpdate({ prop: 'expirationdate', value })}
            />
          </CardSection>
          
          <CardSection style={{ padding: 15 }}>
            <Text>Add another purchase by scanning the barcode again, if expiration date is different.</Text>
          </CardSection>

          <CardSection style={{ flexDirection: 'column' }}>
            <Text style={{ flex: 1 }}>Remind me about expiration:</Text>
            <Picker style={{ flex: 1 }}
              selectedValue={remindBeforeDate}
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

        {this.renderButtons()}
        
      </View>
    );
  };
}

const styles = {
  productLabelStyle: {
    flex: 1,
    fontWeight: '600',
    fontSize: 18
  },
  productTextStyle: {
    flex: 2,
    fontSize: 18
  }
}


const mapStateToProps = (state) => {
  const { productReducer, purchaseReducer } = state;
  
  return {
    product: productReducer.product,
    productError: productReducer.error,
    productLoading: productReducer.loading,

    purchase: purchaseReducer.purchase,
    purchaseError: purchaseReducer.error,
    purchaseLoading: purchaseReducer.loading,
  };
};


export default connect(mapStateToProps, { fetchProduct, purchaseUpdate, savePurchase }) (PurchaseView);