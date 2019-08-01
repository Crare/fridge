import React, { Component } from 'react';
import DatePicker from 'react-native-datepicker';
import { View, Text } from 'react-native';
 
/**
 * CustomDatePicker
 * @var label show left of the  datepicker element.
 * @var dateChanged callback function on datechange.
 * @var minDate minimum date to select.
 * @returns dateChanged with new date.
 */
class CustomDatePicker extends Component {
  
  parseToDateString(date) {
    if (date.constructor.name === 'String') {
      return date;
    }
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
  }
 
  render() {
    const { label, dateChanged, minDate, date } = this.props;
    const { labelStyle, containerStyle } = styles;
    
    return (
      <View style={containerStyle}>
        <Text style={labelStyle}>{label}</Text>
        <DatePicker
          style={{width: 200}}
          date={date}
          mode="date"
          minDate={minDate}
          format="DD.MM.YYYY"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            // ... You can check the source to find the other keys.
          }}
          onDateChange={ (date_value) => { this.setState({date: date_value}); dateChanged(this.parseToDateString(date_value)); } }
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