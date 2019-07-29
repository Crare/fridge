import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children, style, disabled = false }) => {
  const { buttonStyle, textStyle, disabledButtonStyle, disabledTextStyle} = styles;

  if (disabled) {
    return (
      <TouchableOpacity
      onPress={onPress} 
      style={[buttonStyle, disabledButtonStyle, style]}>

      <Text style={[textStyle, disabledTextStyle]}>
        {children}
      </Text>
      
    </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        onPress={onPress} 
        style={[buttonStyle, style]}>

        <Text style={textStyle}>
          {children}
        </Text>
        
      </TouchableOpacity>
    );
  }
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5
  },
  disabledButtonStyle: {
    alignSelf: 'stretch',
    backgroundColor: '#CFCFCF',
    color: '#363636',
  },
  disabledTextStyle: {
    color: '#363636'
  }
};

export { Button };
