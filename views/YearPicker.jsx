import React from 'react';
import { Picker } from '@react-native-picker/picker';
import { StyleSheet } from 'react-native';

const YearPicker = ({ selectedYear, onYearChange, years }) => {
  return (
    <Picker
      selectedValue={selectedYear}
      onValueChange={(itemValue, itemIndex) => onYearChange(itemValue)}
      style={styles.pickerStyle}
      dropdownIconColor={'red'}
    >
      {years.map((year) => (
        <Picker.Item key={year} label={year.toString()} value={year} />
      ))}
    </Picker>
  );
};

const styles = StyleSheet.create({
  pickerStyle: {
    color: '#144714',
    backgroundColor: 'transparent', 
    top: 0,
    
  },
});

export default YearPicker;
