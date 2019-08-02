import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { RNCamera } from 'react-native-camera';
import { searchProductByBarcode } from '../actions';
import { Spinner, Card, CardSection } from './common';

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
    setTimeout(() => { // debug in simulator
      this.onBarCodeRead({data: '6415600550390'}); //'6415600550390');
    }, 1000);
  }

  onBarCodeRead(event) {
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
    const { productLabelStyle, productTextStyle } = styles;

    if (foundBarcode) {
      return (
        <View style={{ flex: 1 }}>
          <Card>
            <CardSection>
              <Text style={productLabelStyle}>Found barcode: {foundBarcode}</Text>
            </CardSection>

            <CardSection>
              <Text style={productTextStyle}>Searching for product...</Text>
            </CardSection>

            <CardSection>
              <Spinner />
            </CardSection>
          </Card>
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
  },
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

 export default connect(null, { searchProductByBarcode }) (BarcodeScanner);
 