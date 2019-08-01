import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { RNCamera } from 'react-native-camera';
import { searchProductByBarcode } from '../actions';
import { Spinner } from './common';

class BarcodeScanner extends Component {

  state = { foundBarcode: null };

  // componentDidMount() {
  //   const { navigation } = this.props;
  //   navigation.addListener('willFocus', () =>
  //     this.setState({ focusedScreen: true })
  //   );
  //   navigation.addListener('willBlur', () =>
  //     this.setState({ focusedScreen: false })
  //   );
  // }

  componentDidMount() {
    setTimeout(() => {
      this.props.searchProductByBarcode('123123'); // '6415600550390');
    }, 1000);
  }

  onBarCodeRead(event) {
    console.warn(event.data);
    this.setState({ foundBarcode: event.data });
    this.props.searchProductByBarcode(event.data);
  }

  renderCamera() {
    const { foundBarcode } = this.state;
    const { preview } = styles;

    if(foundBarcode) {
      return;
    }

    return (
      <RNCamera
          ref={cam => {
            this.camera = cam;
          }}
          style={preview}
          onBarCodeRead={event => this.onBarCodeRead(event)}
          captureAudio={false}
        >
      </RNCamera>
    );
  }

  renderFoundBarcode() {
    const { foundBarcode } = this.state;

    if (foundBarcode) {
      return (
        <View style={{ flexDirection: 'row' }}>
          <Text>Found barcode: {foundBarcode}</Text>
          <Text>Searching for product...</Text>
          <Spinner />
        </View>
      );
    }
  }
 
  render() {
    // TODO: add flashmode
    const { container } = styles;
    
    return (
      <View style={container}>
        {this.renderCamera()}

        {this.renderFoundBarcode()}
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
}

 export default connect(null, { searchProductByBarcode }) (BarcodeScanner);
 