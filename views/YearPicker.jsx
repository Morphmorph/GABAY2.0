import React from 'react';
import { Picker } from '@react-native-picker/picker';

const YearPicker = ({ selectedYear, onYearChange, years }) => {
  return (
    <Picker
      selectedValue={selectedYear}
      onValueChange={(itemValue, itemIndex) => onYearChange(itemValue)}
    >
      {years.map((year) => (
        <Picker.Item key={year} label={year.toString()} value={year} />
      ))}
    </Picker>
  );
};

export default YearPicker;
