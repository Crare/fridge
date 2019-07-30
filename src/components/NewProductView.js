import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Card, CardSection, Input, Button, ToggleButton, TextLink, Spinner } from './common';
import { Actions } from 'react-native-router-flux';
import { saveNewProduct, productUpdate, reset } from '../actions';

class NewProductView extends Component {

  state = { canSave: false };

  pressedLink() {
    Actions.rules();
  }

  pressedSave() {
    if (!this.state.canSave) {
      return;
    }
    const { name, barcode } = this.props.product;

    this.props.saveNewProduct({ name, barcode });
  }

  showRulesAndGuidelines() {
    Actions.rules();
  }

  renderError() {
    if (this.props.error) {
      return (
        <Card>
          <CardSection>
            <Text style={styles.errorTextStyle} >
              {this.props.error}
            </Text>
          </CardSection>
        </Card>
      );
    }
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
          <Button style={{ width: '50%'}} onPress={() => this.cancel()}>Cancel</Button>
          <Button style={{ width: '50%'}}
            disabled={!this.state.canSave} 
            onPress={this.pressedSave.bind(this)}>
              Save
          </Button>
        </CardSection>
      </Card>
    );
  }

  cancel() {
    this.props.reset();
    Actions.main({ type: 'reset'});
  }

  render() {
    const { name, barcode } = this.props.product;

    return (
      <View>

        <Card>
          <CardSection>
            <Input
              label="name"
              placeholder="Coca-Cola light 0.5l"
              onChangeText={value => this.props.productUpdate({ prop: 'name', value })}
              value={name}
            ></Input>
          </CardSection>

          <CardSection>
            <Input
              label="barcode"
              placeholder="01234567890"
              onChangeText={value => this.props.productUpdate({ prop: 'barcode', value })}
              value={barcode}
            ></Input>
          </CardSection>
        </Card>
        
        <Card>
          <CardSection style={{ padding: 15 }}>
            <View style={{ width: '50%', flexDirection: 'row', flexWrap: 'wrap' }}>
             <Text>I have read the </Text>
             <TextLink onPress={this.showRulesAndGuidelines.bind(this)}>rules and guidelines </TextLink>
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

        {this.renderButtons()}

        {this.renderError()}

      </View>
    );
  }

}

const styles = {
  errorTextBackground: {
    backgroundColor: 'white',
    paddingTop: 15,
    paddingBottom: 15
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
}

const mapStateToProps = ({ productReducer }) => {
  const { product, error, loading } = productReducer;

  return { product, error, loading };
};

export default connect(mapStateToProps, {
  saveNewProduct, productUpdate, reset
}) (NewProductView);
