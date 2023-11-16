import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomInput = ({ iconName, placeholder, value, onChangeText, keyboardType, showSoftInputOnFocus, secureTextEntry, error, onFocus = () => {} }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleTextChange = (text) => {
    // Clear the error message when text is changed
    onChangeText(text);
  };

  return (
    <View
      style={[
        styles.inputContainer,
        {
          borderColor: isFocused ? '#144714' : error ? '#810000' : '#144714',
          borderBottomWidth: isFocused ? 1 : error ? 1 : 1,
        },
      ]}
    >
      <Icon name={iconName} style={[styles.icon, error ? { color: '#810000' } : null]} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={handleTextChange}
        keyboardType={keyboardType}
        showSoftInputOnFocus={showSoftInputOnFocus}
        secureTextEntry={!showPassword && secureTextEntry}
        onFocus={() => {
          onFocus();
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
      />
      {!error && secureTextEntry && (
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Icon
            name={showPassword ? 'eye-outline' : 'eye-off-outline'}
            style={styles.icon}
          />
        </TouchableOpacity>
      )}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#144714',
    marginBottom: '5%',
  },
  icon: {
    fontSize: 20,
    marginRight: 10,
    color: '#E3B448',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#CBD18F',
  },
  errorText: {
    color: '#810000',
    marginTop: 5,
  },
});

export default CustomInput;
