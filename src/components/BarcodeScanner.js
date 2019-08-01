import React, {Component} from 'react';
import {
  Text, View, Alert, TouchableOpacity, Image
}from 'react-native';
import Camera from 'react-native-camera';

class BarcodeScanner extends Component {

  state = { torchOn: false };
  
  onBarCodeRead = (event) => {
    Alert.alert("Barcode value is: "+event.data ,"Barcode type is: "+event.type);
  }

  render() {
    const { container, preview, bottomOverlay, cameraIcon } = styles;
    const { torchOn } = this.state;

    return (
      <View style={container}>
        <Camera
          style={preview}
          torchMode={torchOn}
          onBarCodeRead={event => this.onBarCodeRead(event)}
          ref={cam => this.camera = cam}
        >
          <Text style={{ backgroundColor: 'white' }}>
            BARCODE SCANNER
          </Text>
        </Camera>

        <View style={bottomOverlay}>
          <TouchableOpacity onPress={() => this.setState({ torchOn: !this.state.torchOn })}>
            <Image style={cameraIcon}
              source={torchOn ? require('../images/flash_on.png') : require('../images/flash_off.png')} />
          </TouchableOpacity>
        </View>

      </View>
    )
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
  cameraIcon: {
    margin: 5,
    height: 40,
    width: 40
  },
  bottomOverlay: {
    position: "absolute",
    width: "100%",
    flex: 20,
    flexDirection: "row",
    justifyContent: "space-between"
  }
}

 export { BarcodeScanner };