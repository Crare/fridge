import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, CardSection, Button } from './common';
import { Actions } from 'react-native-router-flux';


class RulesView extends Component {

  copyToDevice() {
    // TODO: copyToDevice
    console.log('pressed copy to device!');
  }

  render() {
    const { textContainerStyle, titleStyle, textStyle } = styles;

    return (
      <View>
        <Card>
          <CardSection style={textContainerStyle}>
            <Text style={titleStyle}>
              Rules
            </Text>
            <Text style={textStyle}>
              lorem ipsum dolor anti sant...
            </Text>
          </CardSection>
        </Card>

        <Card>
          <CardSection style={textContainerStyle}>
            <Text style={titleStyle}>
              Guidelines
            </Text>
            <Text style={textStyle}>
              lorem ipsum dolor anti sant...
            </Text>
          </CardSection>
        </Card>


        <Card>
          <CardSection>
            <Button onPress={() => Actions.pop()}>Back</Button>
            <Button onPress={this.copyToDevice.bind(this)}>Copy to device</Button>
          </CardSection>
        </Card>
      </View>
    );
  }
}

const styles = {
  titleStyle: {
    // flex: 1,
    fontSize: 22,
    fontWeight: '600',
    paddingBottom: 15
  },
  textStyle: {
    // flex: 1,
    fontSize: 16,
  },
  textContainerStyle: {
    flexDirection: 'column',
    padding: 15
  }
}

export default RulesView;