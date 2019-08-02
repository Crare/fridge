import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Card, CardSection, Spinner, Input, Button, TextLink, ToggleButton } from './common';
import { Actions } from 'react-native-router-flux';
import { fetchProduct, reportUpdate, sendReport } from '../actions';

class ReportView extends Component {

  state = { canSave: false };

  componentDidMount() {
    if (this.props.productId) {
      this.props.fetchProduct(this.props.productId);
    }
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
        <CardSection style={{padding: 15 }}>
          <Text style={productLabelStyle}>Name: </Text>
          <Text style={productTextStyle}>{name}</Text>
        </CardSection>
        
        <CardSection style={{padding: 15 }}>
          <Text style={productLabelStyle}>Barcode: </Text>
          <Text style={productTextStyle}>{barcode}</Text>
        </CardSection>
      </Card>
    );
  }

  pressedSend() {
    const { name, barcode } = this.props.report;
    const { product } = this.props;

    this.props.sendReport({ 
      name,
      barcode,
      originalName: product.name,
      originalBarcode: product.barcode,
      productId: product.id
    })
  }

  renderButtons() {
    if (this.props.loading) {
      return (
        <Card>
          <CardSection>
            <Spinner size="large" />
          </CardSection>
        </Card>
      );
    }

    return (
      <Card>
        <CardSection>
          <Button style={{ width: '50%'}} onPress={() => Actions.pop()}>Cancel</Button>
          <Button style={{ width: '50%'}}
            disabled={!this.state.canSave} 
            onPress={this.pressedSend.bind(this)}>
              Send
          </Button>
        </CardSection>
      </Card>
    );
  }
  
  renderRulesAgreement() {
    return (
      <Card>
        <CardSection style={{ padding: 15 }}>
          <View style={{ width: '50%', flexDirection: 'row', flexWrap: 'wrap' }}>
            <Text>I have read the </Text>
            <TextLink onPress={() => Actions.rules()}>rules and guidelines </TextLink>
            <Text>and I am adding a real appropriate product.</Text>
          </View>

          <ToggleButton
            style={{ width: '50%', height: 40, margin: 'auto', alignSelf: 'flex-end' }} 
            onPress={() => this.setState({canSave: !this.state.canSave})} 
            toggled={this.state.canSave}>
              Yes, I understand
          </ToggleButton>
        </CardSection>
      </Card>
    );
  }

  render() {
    const { name, barcode } = this.props.report;

    return (
      <View style={{ flex: 1 }}>
      
        {this.renderProduct()}

        <Card>
          <CardSection>
            <Text>Please provide correct information about the product:</Text>
          </CardSection>

          <CardSection>
            <Input
              label="name"
              placeholder="Coca-Cola light 0.5l"
              onChangeText={value => this.props.reportUpdate({ prop: 'name', value })}
              value={name}
            ></Input>
          </CardSection>

          <CardSection>
            <Input
              label="barcode"
              placeholder="01234567890"
              onChangeText={value => this.props.reportUpdate({ prop: 'barcode', value })}
              value={barcode}
            ></Input>
          </CardSection>
        </Card>

        {this.renderRulesAgreement()}

        {this.renderButtons()}

      </View>
    );
  }
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
  const { productReducer, reportReducer } = state;
  
  return {
    product: productReducer.product,
    productError: productReducer.error,
    productLoading: productReducer.loading,

    report: reportReducer.report,
    reportError: reportReducer.error,
    reportLoading: reportReducer.loading
  };
};

export default connect(mapStateToProps, { 
  fetchProduct, reportUpdate, sendReport
}) (ReportView);