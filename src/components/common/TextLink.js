import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const TextLink = ({ onPress, children }) => {
  const { textContainer, textLinkStyle } = styles;
  
  return (
    <TouchableOpacity style={textContainer} onPress={onPress}>
      <Text style={textLinkStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
} 

const styles = {
  textContainer: {
    // flex: 1,
    // alignSelf: 'auto',
    // flex: 1,
    // flexBasis: 'auto',
    // alignSelf: 'stretch'
  },
  textLinkStyle: {
    color: 'blue'
  }
}

export { TextLink };