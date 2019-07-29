import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection, Input, Button } from './common';

class PurchaseView extends Component {

  pressedSave() {
    console.log('pressed save!');
  }

  reportProduct() {
    console.log('pressed report product!');
    Actions.report();
  }

  render() {
    const { name, barcode } = this.props;

    return (
      <View>
        <Card>
          <CardSection style={{padding: 15}}>
            <Text style={{fontWeight: '600' }}>name:</Text>
            <Text>{name}</Text>
          </CardSection>
          
          <CardSection style={{padding: 15}}>
            <Text style={{fontWeight: '600' }}>barcode:</Text>
            <Text>{barcode}</Text>
          </CardSection>

          <CardSection style={{ padding: 15, marginBottom: 10 }}>
            <Text style={{ width: '50%' }}>
              Wrong or inappropriate product? Report it to fix it:
            </Text>
            <Button style={{ width: '50%', height: 40, margin: 'auto' }}
              onPress={this.reportProduct.bind(this)}
            >
              Report product
            </Button>
          </CardSection>
        </Card>

        <Card>
          <CardSection>
            <Input 
              label="expires at:"
            />
          </CardSection>
          <CardSection style={{ padding: 15 }}>
            <Text>Add another purchase by scanning the barcode again, if expiration date is different.</Text>
          </CardSection>
          <CardSection>
            <Input 
              label="Notify before:"
            />
          </CardSection>
          <CardSection>
            <Input 
              label="Amount:"
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

export default PurchaseView;