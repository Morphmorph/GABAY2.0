import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Style from '../Style';
import CustomInput from '../CustomInput';
import { useNavigation } from '@react-navigation/native';

const MonthlyIncome = () => {
    const [income, setIncome] = useState('');
    const [error, setError] = useState(null);
    const navigation = useNavigation();

    const handleIncomeChange = (text) => {
        setError(null);
        // Remove non-digit characters
        const numericValue = text.replace(/[^0-9]/g, '');

        // Format the numeric value with commas
        const formattedIncome = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        setIncome(formattedIncome);
    };

    const startButtonPressed = () => {
        setError(null);

        // Validate income
        if (!income) {
            setError('Income is required');
        } else {
            navigation.navigate('Home');
        }
    };

    return (
        <View style={[Style.common, { justifyContent: 'center' }]}>
            <View style={Style.container}>
                <Text style={Style.textcolor}>TOTAL MONTHLY INCOME</Text>

                <CustomInput
                    iconName="currency-php"
                    placeholder="Income"
                    keyboardType="numeric"
                    value={income}
                    onChangeText={handleIncomeChange}
                    error={error}
                    onFocus={() => {
                        // Clear income error on focus
                        setError(null);
                    }}
                />


                <TouchableOpacity style={Style.signInButton} onPress={startButtonPressed}>
                    <Text style={Style.signInButtonText}>Start</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default MonthlyIncome;
