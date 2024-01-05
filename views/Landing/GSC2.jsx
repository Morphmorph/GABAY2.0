import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Style from '../Style';
import CustomInput from '../CustomInput';
import { AntDesign } from '@expo/vector-icons';

const GSC2 = ({navigation}) => {
  const [principleAmount, setPrincipleAmount] = useState(null);
  const [interestRate, setInterestRate] = useState(null);
  const [contribution, setContribution] = useState(null);
  const [timePeriod, setTimePeriod] = useState(null);
  const [frequency, setFrequency] = useState('weekly'); 
  const [principleAmountError, setPrincipleAmountError] = useState(null);
  const [interestRateError, setInterestRateError] = useState(null);
  const [contributionError, setContributionError] = useState(null);
  const [timePeriodError, setTimePeriodError] = useState(null);
  const [validationError, setValidationError] = useState(null);
  const [result, setResult] = useState(null);

  const handlePrincipleAmountChange = (text) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    const formattedAmount = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    setPrincipleAmount(formattedAmount);
    setPrincipleAmountError(null);
    handleValidate(); // Calculate result on change
  };

  const handleInterestRateChange = (text) => {
    

    const numericValue = text.replace(/[^0-9]/g, '');
    const interestRateValue = Math.min(100, Math.max(0, parseInt(numericValue, 10)));
    const formattedInterestRate = `${interestRateValue}`;
    setInterestRate(formattedInterestRate);
    setInterestRateError(null);
    handleValidate(); // Calculate result on change
  };

  const handleContributionChange = (text) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    const formattedAmount = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    setContribution(formattedAmount);
    setContributionError(null);
    handleValidate(); // Calculate result on change
  };

  const handleTimePeriodChange = (text) => {
    setTimePeriod(text);
    setTimePeriodError(null);
    handleValidate(); // Calculate result on time period change
  };

  const handleFrequencyChange = (value) => {
    setFrequency(value);
    handleValidate(); // Calculate result on change
  };

  const handleValidate = () => {
    if (!principleAmount || !interestRate || !contribution || !timePeriod) {
      setValidationError('All fields must be filled');
      setResult(null);
    } else {
      setValidationError(null);

      const principle = parseFloat(principleAmount.replace(/,/g, ''));
      const rate = parseFloat(interestRate);
      const contributionValue = parseFloat(contribution.replace(/,/g, ''));
      const time = parseFloat(timePeriod);
      const periodsPerYear = getPeriodsPerYear(frequency);

      // Calculate future value
      const futureValue = calculateFutureValue(principle, rate, contributionValue, time, periodsPerYear);
      // Format the result, adjust as needed
      setResult(futureValue.toFixed(2)); 
    }
  };

  // number of compounding periods per year based on frequency
  const getPeriodsPerYear = (frequency) => {
    switch (frequency) {
      case 'weekly':
        return 52;
      case 'biweekly':
        return 26;
      case 'monthly':
        return 12;
      case 'quarterly':
        return 4;
      case 'annually':
        return 1;
      default:
        // Default to annually
        return 1; 
    }
  };

//  calculate future value
const calculateFutureValue = (principle, rate, contribution, time, periodsPerYear) => {
  const r = rate / 100 / periodsPerYear; // Convert annual rate to periodic rate
  const n = periodsPerYear * time; // Total number of compounding periods

  let futureValue = principle;

  for (let i = 1; i <= n; i++) {
    futureValue = futureValue * (1 + r) + contribution;
  }

  // Round to 2 decimal places for precision
  futureValue = Math.round(futureValue * 100) / 100;

  return futureValue;
};
const openAbout = () => {
  navigation.navigate('Calculator Guide')
}

useEffect(() => {
  handleValidate();
}, [principleAmount, interestRate, contribution, timePeriod, frequency]);

  return (
    <View style={[Style.common, { padding: 10 }]}>
      <View style={{justifyContent: 'center', padding: 10}}>
          <TouchableOpacity onPress={() => openAbout()}>
          <View style={{flexDirection: 'row', justifyContent: 'center',}}>
      <AntDesign name="exclamationcircleo" size={15} color={'#E3B448'} style={{marginHorizontal: 5}} />
          <Text style={{color: '#E3B448'}}>How to use Savings calculator?</Text>
          </View>
          </TouchableOpacity>
        </View>
      <View style={{ padding: 10 }}>
      
        <CustomInput
          iconName="cash"
          placeholder="Principle Amount"
          keyboardType="numeric"
          value={principleAmount}
          onChangeText={handlePrincipleAmountChange}
          error={principleAmountError}
        />
        <CustomInput
          iconName="percent"
          placeholder="Interest Rate (%)"
          keyboardType="numeric"
          value={interestRate}
          onChangeText={handleInterestRateChange}
          error={interestRateError}
        />
        <CustomInput
          iconName="cash"
          placeholder="Contribution Amount"
          keyboardType="numeric"
          value={contribution}
          onChangeText={handleContributionChange}
          error={contributionError}
        />
        <CustomInput
          iconName="clock"
          placeholder="Time Period (years)"
          keyboardType="numeric"
          value={timePeriod}
          onChangeText={handleTimePeriodChange}
          error={timePeriodError}
        />
        <View style={{ marginBottom: 10 }}>
          <Text style={{ color: '#E3B448' }}>Select Frequency:</Text>
          <View style={{ borderWidth: .5,  borderColor: '#144714', borderRadius: 10 }}>
          <Picker
            selectedValue={frequency}
            onValueChange={handleFrequencyChange}
            style={{ color: '#CBD18F' }}
          >
            <Picker.Item label="Weekly" value="weekly" />
            <Picker.Item label="Bi-Weekly" value="biweekly" />
            <Picker.Item label="Monthly" value="monthly" />
            <Picker.Item label="Quarterly" value="quarterly" />
            <Picker.Item label="Annually" value="annually" />
          </Picker>
          </View>
        </View>
        <View style={{ alignItems: 'center', paddingTop: 10, marginTop: 10, borderTopWidth: 1, borderColor: '#144714',}}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 5, color: '#E3B448' }}>
              Estimated Savings:
            </Text>
            <View style={{backgroundColor: '#CBD18F', width: '100%', height: '30%', justifyContent: 'center', alignItems: 'center', borderRadius: 10}}>
            <Text style={{ fontSize: 40, color: '#144714' }}>
              ₱{result && parseFloat(result).toLocaleString('en-US', { maximumFractionDigits: 2 })}
            </Text>
            </View>
          </View>
       
      </View>
    </View>
  );
};

export default GSC2;
