import React, { Component } from 'react';
import DatePicker from 'react-native-datepicker';
import { View, Text } from 'react-native';
 
/**
 * CustomDatePicker
 * @var label show left of the  datepicker element.
 * @var dateChanged callback function on datechange.
 * @returns dateChanged with new date.
 */
class CustomDatePicker extends Component {
  
  parseCurrentDayString() {
    const date = new Date();
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    const month = (date.getMonth()+1) < 10 ? '0' + (date.getMonth()+1) : (date.getMonth()+1);
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }

  onDateChange() {
    this.props.onDateChange(this.props.date);
  }
  
  constructor(props){
    super(props)
    this.state = {date: this.parseCurrentDayString()}
  }
 
  render() {
    const { label, dateChanged } = this.props;
    const { labelStyle, containerStyle } = styles;
    
    return (
      <View style={containerStyle}>
        <Text style={labelStyle}>{label}</Text>
        <DatePicker
          style={{width: 200}}
          date={this.state.date}
          mode="date"
          placeholder="placeholder"
          format="DD.MM.YYYY"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            // ... You can check the source to find the other keys.
          }}
          onDateChange={ (date) => { this.setState({date: date}); dateChanged(date); } }
        />
      </View>
    )
  }
}

const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
};

export { CustomDatePicker };