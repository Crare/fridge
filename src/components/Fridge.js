import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { fetchPurchases } from '../actions';
import { Spinner, Button } from './common';
import ListItem from './ListItem'; 
import { Actions } from 'react-native-router-flux';


class Fridge extends Component {


  componentDidMount() {
    this.props.fetchPurchases();
  }

  renderItem = ({ item }) => {
    return <ListItem purchase={item}/>
  }

  scanBarcode() {
    // TODO: add barcode reading functionality
    Actions.newProduct();
  }

  render() {

    return (
      <View style={{flex: 1}}>
        <View style={{height: 60, paddingBottom: 10, paddingTop: 10}}>
          <Button onPress={this.scanBarcode.bind(this)}>Scan barcode</Button>
        </View>

        <View style={styles.container}>
          
          <Text style={{ padding: 10 }}>Fridge contains:</Text>

          <FlatList style={{ margin: 10 }}
            data={this.props.purchases}
            keyExtractor={ (purchase) => purchase.uid }
            renderItem={this.renderItem}
          />

          {this.props.loading && <Spinner />}
      
          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>

        </View>
    </View>
    );
  };
}

const styles = {
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

  const purchases = Object.keys(state.fridge)
    .map( 
      uid => ({ ...state.purchases[uid], uid })
    );

  return { purchases };
};

export default connect(mapStateToProps, { fetchPurchases })(Fridge);