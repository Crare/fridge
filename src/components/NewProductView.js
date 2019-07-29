import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, CardSection, Input, Button, ToggleButton, TextLink } from './common';
import { Actions } from 'react-native-router-flux';

class NewProductView extends Component {

  state = { canSave: false }; 

  pressedLink() {
    console.log('pressed link!');
    Actions.rules();
  }

  pressedSave() {
    if (!this.state.canSave) {
      return console.log('pressed disabled save!');
    }
    console.log('pressed save!');
    Actions.purchase();
  }

  showRulesAndGuideLines() {
    console.log('pressed rules and guidelines!');
    Actions.rules();
  }

  render() {
    
    return (
      <View>
        <Card>

          <CardSection>
            <Input
              label="name"
              placeholder="Coca-Cola light 0.5l"
            ></Input>
          </CardSection>

          <CardSection>
            <Input
              label="barcode"
              placeholder="01234567890"
            ></Input>
          </CardSection>
        </Card>
        
        <Card>
          <CardSection style={{ padding: 15 }}>
            <View style={{ width: '50%', flexDirection: 'row', flexWrap: 'wrap' }}>
             <Text>I have read the </Text>
             <TextLink onPress={this.showRulesAndGuideLines.bind(this)}>rules and guidelines </TextLink>
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

        <Card>
          <CardSection>
            <Button style={{ width: '50%'}} onPress={() => Actions.pop()}>Cancel</Button>
            <Button style={{ width: '50%'}}
              disabled={!this.state.canSave} 
              onPress={this.pressedSave.bind(this)}>
                Save
            </Button>
          </CardSection>

        </Card>
      </View>
    );
  }

}

export default NewProductView;
