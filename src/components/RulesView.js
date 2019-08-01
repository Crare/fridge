import React, { Component } from 'react';
import { View, Text, Clipboard } from 'react-native';
import { Card, CardSection, Button } from './common';
import { Actions } from 'react-native-router-flux';


class RulesView extends Component {

  state = { 
    rulesText: "lorem ipsum dolor anti sant...",
    guidelinesText: "lorem ipsum dolor anti sant...",
  };

  copyToClipboard() {
    const { rulesText, guidelinesText } = this.state;
    const rulesAndGuidelines = `Rules\r\n${rulesText}\r\n\r\nGuidelines\r\n${guidelinesText}`
    Clipboard.setString(rulesAndGuidelines);
  }

  render() {
    const { rulesText, guidelinesText } = this.state;
    const { textContainerStyle, titleStyle, textStyle } = styles;

    return (
      <View>
        <Card>
          <CardSection style={textContainerStyle}>
            <Text style={titleStyle}>
              Rules
            </Text>
            <Text style={textStyle}>
              {rulesText}
            </Text>
          </CardSection>
        </Card>

        <Card>
          <CardSection style={textContainerStyle}>
            <Text style={titleStyle}>
              Guidelines
            </Text>
            <Text style={textStyle}>
              {guidelinesText}
            </Text>
          </CardSection>
        </Card>


        <Card>
          <CardSection>
            <Button onPress={() => Actions.pop()}>Back</Button>
            <Button onPress={this.copyToClipboard.bind(this)}>Copy to clipboard</Button>
          </CardSection>
        </Card>
      </View>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 22,
    fontWeight: '600',
    paddingBottom: 15
  },
  textStyle: {
    fontSize: 16,
  },
  textContainerStyle: {
    flexDirection: 'column',
    padding: 15
  }
}

export default RulesView;