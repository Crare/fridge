import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
// import DeviceInfo from 'react-native-device-info';
import { connect } from 'react-redux';
import { fetchPurchases } from '../actions';
import { Spinner, Button } from './common';
import FridgeListItem from './FridgeListItem'; 
import { Actions } from 'react-native-router-flux';


class Fridge extends Component {

  componentDidMount() {
    this.props.fetchPurchases();
  }

  renderItem = ({ item }) => {
    return <FridgeListItem purchase={item}/>
  }

  scanBarcode() {
    const isSimulator = true; // TODO: check device if simulator

    if (isSimulator) { // DeviceInfo.isEmulator()) {
      Actions.newProduct();
    } else {
      Actions.barcodeScanner();
    }
  }

  renderList() {
    const { errorTextStyle, container } = styles;
    const { error, loading, purchases } = this.props;

    if (loading) {
      return (
        <Spinner />
      );
    } else if (error) {
      return (
        <Text style={errorTextStyle}>
          {error}
        </Text>
      );
    }
    return (
      <View style={container}> 
        <Text style={{ padding: 10 }}>Fridge contains:</Text>

        <FlatList style={{ margin: 10 }}
          data={purchases}
          keyExtractor={ (purchase) => purchase.uid }
          renderItem={this.renderItem}
        />
      </View>
    );
  }

  render() {
    const { barcodeButtonStyle } = styles;

    return (
      <View style={{flex: 1}}>
        <View style={barcodeButtonStyle}>
          <Button onPress={this.scanBarcode.bind(this)}>Scan barcode</Button>
        </View>

        {this.renderList()}
    </View>
    );
  };
}

const styles = {
  barcodeButtonStyle: {
    height: 60,
    paddingBottom: 10,
    paddingTop: 10
  },
  container: {
    flex: 1
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};


const mapStateToProps = state => {

  if (state.fridgeReducer) {
    const purchases = Object.keys(state.fridgeReducer)
      .map( 
        uid => ({ ...state.fridgeReducer[uid], uid })
    );
    return { purchases };
  }
  
  return {};

};

export default connect(mapStateToProps, { fetchPurchases })(Fridge);