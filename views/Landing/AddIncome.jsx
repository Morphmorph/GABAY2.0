import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import Plus from '../../assets/Icon/plus.png';
import Style from '../Style';
import CustomInput from '../CustomInput';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Asset } from 'expo-asset';
import UserContext from '../../api_server/context';
import { axiosRequest } from '../../api_server/axios';
import ModalMessage from '../Modal';
import Loader from '../Starting/actionLoader';

const AddIncome = ({route}) => {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;
  const margin = screenWidth === 360 ? 6 : 2.2;
  const openAddCategory = () => {
    navigation.navigate('Add Category', { destination: 'Add income', cat: null });
  };

  const [showModalMessage, setShowModalMessage] = useState(false);
  const [showLoader, setShowLoader] = useState(false); // Add loader state

  // Declare state variables
  const [income, setIncome] = useState('');
  const [incomeError, setIncomeError] = useState(null);
  const [selectedIcons, setSelectedIcons] = useState(null);
  const [iconAssets, setIconAssets] = useState([]);
  const [iconError, setIconError] = useState(null);
  const { context, incomeIcon } = useContext(UserContext);

  const handleIncomeChange = (text) => {
    setIncomeError(null);
    const numericValue = text.replace(/[^0-9]/g, '');
    const formattedIncome = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    setIncome(formattedIncome);
  };

  const toggleIconSelection = (iconUrl) => {
    if (selectedIcons === iconUrl) {
      setSelectedIcons(null);
      setIconError(iconUrl);
    } else {
      setSelectedIcons(iconUrl);
      setIconError(null);
    }
  };

  const startButtonPressed = async () => {
    setIncomeError(null);
    setIconError(null);

    if (!income) {
      setIncomeError('Required');
    }

    if (!selectedIcons) {
      setIconError('no_icon_selected');
    } else if (!incomeError && !iconError && income) {
      try {
        setShowLoader(true); // Show loader before making the API request

        const Data = {
          user: context.id,
          title: selectedIcons.text,
          amount: parseInt(income.replace(/,/g, ''), 10),
          icon: selectedIcons.icon,
        };

        // Perform the async operation and wait for it to complete
        const response = await axiosRequest.post('gabay/add/', Data);

        // Hide loader after the request is complete
        setShowLoader(false);

        // Show success modal after the request is complete
        setShowModalMessage(true);
        setTimeout(() => setShowModalMessage(false), 500);
      } catch (error) {
        console.log('Error:', error);
        setShowLoader(false); // Hide loader in case of an error
      }
    }
  };

  useEffect(() => {
    const loadIcons = async () => {
      const loadedAssets = await Promise.all(
        incomeIcon.income.map((path) => Asset.fromModule(path.icon).downloadAsync())
      );
      setIconAssets(loadedAssets);
    };

    loadIcons();
  }, []);

  return (
    <View style={Style.common}>
       <Loader visible={showLoader} message="Adding..." />
      <View>
        <View
          style={{
            top: 20,
            alignSelf: 'center',
            backgroundColor: '#2b5127',
            paddingTop: 5,
            paddingBottom: -70,
            paddingHorizontal: 20,
            marginHorizontal: 40,
            borderRadius: 5,
            width: '80%'
          }}
        >
          <CustomInput
            iconName="currency-php"
            placeholder="00.00"
            keyboardType="numeric"
            value={income}
            onChangeText={handleIncomeChange}
            error={incomeError}
            onFocus={() => {
              // Clear income error on focus
              setIncomeError(null)
            }}
          />
          <Text style={{ top: -10, textAlign: 'center', color: '#E3B448' }}>Amount</Text>
        </View>
      </View>
      <View style={{ top: 30, borderBottomWidth: 1, borderColor: '#144714', margin: 10, alignItems: 'center' }}>
        <Text style={{ color: iconError ? '#810000' : '#E3B448', paddingVertical: 5 }}>Select categories</Text>
      </View>
      
      <View style={{ top: 30, height: 280, overflow: 'hidden', margin: 10, borderWidth: 1, borderColor: iconError ? '#810000' : '#144714',  borderRadius: 20,  }}>
      <ScrollView 
      nestedScrollEnabled
      contentContainerStyle={{ backgroundColor: '#2b5627', flexDirection: 'row', flexWrap: 'wrap', padding: 5 ,alignSelf:"center", justifyContent: 'flex-start'}}>
      {incomeIcon.income.map((iconUrl, index) => (
      <TouchableOpacity
      key={index}
      style={{
        margin: margin,
        alignItems: 'center',
      }}
      onPress={() => {toggleIconSelection(iconUrl) }}
    >
      <View
        style={{
          backgroundColor: selectedIcons === iconUrl ? '#CBD18F' : 'transparent',
          padding: 10,
          borderRadius: 5,
        }}
      >
        <Image source={iconUrl.icon} style={{ width: 50, height: 50}} />
      </View>
      <Text style={{ marginTop: 5, color: '#E3B448', fontSize: 10, fontWeight: 'bold' }}>{iconUrl.text}</Text>
    </TouchableOpacity>
  ))}
  <TouchableOpacity
            style={{
              margin: 2,
              alignItems: 'center',
            }}
            onPress={openAddCategory}
          >
            <View
              style={{
                backgroundColor: 'transparent', // You can set your desired background color
                padding: 5,
                margin: 5,
                borderRadius: 5,
              }}
            >
            <Image source={Plus} style={{ width: 50, height: 50 }} />
            </View>
            </TouchableOpacity>
        </ScrollView>
      
        </View>
        
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between', // Apply space-between here
          position: 'absolute',
          bottom: 20,
          alignSelf: 'center',
          width: '100%',
          paddingHorizontal: 20,
        }}
      >
        <View style={{ width: '45%' }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#CBD18F',
              padding: 10,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%', // Set the width to 100% for the inner View
            }}
            onPress={startButtonPressed}
          >
            <Text style={{ color: '#144714', fontSize: 18,}}>Add</Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: '45%' }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#810000',
              padding: 10,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%', // Set the width to 100% for the inner View
            }}
            onPress={() => {
              navigation.navigate('Home')
            }}
          >
            <Text style={{ color: '#CBD18F', fontSize: 18, }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ModalMessage showAutomatically={showModalMessage} message="Income successfully added!" icon={<MaterialCommunityIcons name="checkbox-marked-circle-plus-outline" size={200} color="#E3B448" />} navigateToScreen="Home" again={false} current = {route.name}/>
    </View>
  )
}

export default AddIncome
