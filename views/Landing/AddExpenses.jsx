import { View, Text, ScrollView, Modal, TouchableOpacity, Image, Dimensions} from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import Plus from '../../assets/Icon/plus.png'
import Style from '../Style'
import CustomInput from '../CustomInput'
import { useNavigation } from '@react-navigation/native'
import { Asset } from 'expo-asset'
import UserContext from '../../api_server/context'


const AddExpenses = () => {
  const navigation = useNavigation()
  const screenWidth = Dimensions.get('window').width;
  const margin = screenWidth === 360 ? 5 : 2.2;
  const openAddCategory = () => {
    navigation.navigate('Add Category', { destination: 'Add expenses' });
  };
  const [expenses, setExpenses] = useState('')
  const [expensesError, setExpensesError] = useState(null)
  const [selectedIcons, setSelectedIcons] = useState(null);
  const [iconAssets, setIconAssets] = useState([])
  const [iconError, setIconError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(''); // To track the selected option
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [previousMonthsVisible, setPreviousMonthsVisible] = useState(false);
  const [selectedPreviousMonth, setSelectedPreviousMonth] = useState(null);
  const {category} = useContext(UserContext)


// console.log(iconAssets)


// const itemss = require(`'${category.necessities[0].icon}'`)
// console.log(itemss)

  const necessities = [
    require('../../assets/Icon/necessities/n9.png'),
    require('../../assets/Icon/necessities/n2.png'),
    require('../../assets/Icon/necessities/n3.png'),
    require('../../assets/Icon/necessities/n4.png'),
    require('../../assets/Icon/necessities/n5.png'),
    require('../../assets/Icon/necessities/n6.png'),
    require('../../assets/Icon/necessities/n7.png'),
    require('../../assets/Icon/necessities/n1.png'),
    require('../../assets/Icon/necessities/n8.png'),
  ];

  // console.log(necessities)
  const necessitiesText = [
    'Maintenance',
    'Ensurance',
    'Rent',
    'Child care',
    'Grocery',
    'Utilities',
    'Transport',
    'Personal care',
    'Medical',
  ];
  const wants = [
    require('../../assets/Icon/wants/w1.png'),
    require('../../assets/Icon/wants/w2.png'),
    require('../../assets/Icon/wants/w3.png'),
    require('../../assets/Icon/wants/w4.png'),
    require('../../assets/Icon/wants/w5.png'),
    require('../../assets/Icon/wants/w6.png'),
    require('../../assets/Icon/wants/w7.png'),
    require('../../assets/Icon/wants/w8.png'),
    require('../../assets/Icon/wants/w9.png'),
  ];
 
  const wantsText = [
    'Gifts',
    'Gym',
    'Furnishing',
    'Electronincs',
    'Hobbies',
    'Travel',
    'Entertainment',
    'Dining out',
    'Fashion',
  ];
  const savings = [
    require('../../assets/Icon/savings/s1.png'),
    require('../../assets/Icon/savings/s2.png'),
    require('../../assets/Icon/savings/s3.png'),
    require('../../assets/Icon/savings/s4.png'),
    require('../../assets/Icon/savings/s5.png'),
    require('../../assets/Icon/Icons/c11.png'),
  ];
  
  const savingsText = [
    'Emergency',
    'Long-term',
    'Short-term',
    'Retirement',
    'Education',
    'Vacation'

  ];


  
  const handleExpensesChange = (text) => {
    // Clear existing errors
    setExpensesError(null)

    // Remove non-digit characters
    const numericValue = text.replace(/[^0-9]/g, '')

    // Format the numeric value with commas
    const formattedIncome = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

    setExpenses(formattedIncome)
  }
  const toggleModal = (option) => {
    setSelectedOption(option); // Set the selected option when the user selects an option in the modal
    setIsModalVisible(!isModalVisible);
    setPreviousMonthsVisible(false);

    if (option === 'Current month') {
      const currentDate = new Date();
      const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
      const currentYear = currentDate.getFullYear(); // Get the current year
      const selectedMonthWithYear = `${currentMonth} ${currentYear}`; 
      setSelectedMonth(selectedMonthWithYear);
      setPreviousMonthsVisible(false);
      navigation.navigate('Home', {
        expenses: expenses,
        selectedIcons: selectedIcons,
        selectedMonth: selectedMonthWithYear,
      });
      // Log the selected option
      console.log('Selected Option: Current month');
      console.log('Current Month:', selectedMonthWithYear);
    } else if (option === 'Previous month') {
      setPreviousMonthsVisible(true); // Display previous months options
    }
  };
  const currentDate = new Date();
const currentMonthIndex = currentDate.getMonth();
const currentYear = currentDate.getFullYear();

// Calculate previous months
const previousMonths = [];
for (let i = 0; i < currentMonthIndex; i++) {
  const month = new Date(currentYear, i, 1).toLocaleString('default', { month: 'long' });
  previousMonths.push(`${month} ${currentYear}`); // Include the year in each month
}

const handlePreviousMonthSelection = (month) => {
  setSelectedPreviousMonth(month);
  setPreviousMonthsVisible(false); 
  navigation.navigate('Home', {
    expenses: expenses,
    selectedIcons: selectedIcons,
    selectedMonth: month, // The selected month already includes the year
  });
  // Log the selected previous month
  console.log('Selected Previous Month:', month);
};

  
  
  const toggleIconSelection = (iconUrl) => {
    if (selectedIcons === iconUrl) {
      setSelectedIcons(null); // Deselect the currently selected icon
      setIconError(iconUrl)
    } else {
      setSelectedIcons(iconUrl); // Select the new icon
      setIconError(null)
    }
  };

  const startButtonPressed = () => {
    // Clear existing errors
    setExpensesError(null);
    setIconError(null); // Clear icon selection error

    // Validate income
    if (!expenses) {
      setExpensesError('Required');
    }

    // Validate icon selection
    if (!selectedIcons) {
      setIconError('no_icon_selected');
    }

    else if (!expensesError && !iconError) {
      console.log('amount: ',expenses)
      console.log('icon: ', selectedIcons)

      toggleModal(true);
    }
  };

  // useEffect(() => {
  //   const loadIcons = async () => {
  //     // Load and cache the icon assets
  //     const loadedAssets = await Promise.all(
  //       [...necessities, ...wants, ...savings].map((path) => {Asset.fromModule((path)).downloadAsync()
  //       })

  //     )

  //     // Set the iconAssets state with the loaded assets
  //     setIconAssets(loadedAssets)
  //   }

  //   loadIcons()
  // }, [])

  return (
    <View style={Style.common}>
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
          }}
        >
          <CustomInput
            iconName="currency-php"
            placeholder="00.00"
            keyboardType="numeric"
            value={expenses}
            onChangeText={handleExpensesChange}
            error={expensesError}
            onFocus={() => {
              // Clear income error on focus
              setExpensesError(null)
            }}
          />
          <Text style={{top: -10, textAlign: 'center', color: '#E3B448'}}>Amount</Text>
      </View>
      </View>
      <View style={{ top: 30, borderBottomWidth: 1, borderColor: '#144714', margin: 10, alignItems: 'center',  marginBottom: 30}}>
        <Text style={{ color: iconError ? '#810000' : '#E3B448', paddingVertical: 5, }}>Select categories</Text>
      </View>
      
      <ScrollView contentContainerStyle={{paddingBottom: 90, height: 'auto',}}>
      <Text style={{alignSelf: 'center', color: '#E3B448'}}>Necessities</Text>
      {/* <View style={{height: 190, overflow: 'hidden', margin: 10, borderWidth: 1, borderColor: iconError ? '#810000' : '#144714',  borderRadius: 20,  }}> */}
      <View style={{overflow: 'hidden', margin: 10, borderWidth: 1, borderColor: iconError ? '#810000' : '#144714',  borderRadius: 20,  }}>
      <ScrollView 
      nestedScrollEnabled
      contentContainerStyle={{ backgroundColor: '#2b5627', justifyContent: 'space-between', flexDirection: 'row', flexWrap: 'wrap', padding: 5 }}>
  {category.necessities.map((iconUrl, index) => (
    <TouchableOpacity
      key={index}
      style={{
        margin: margin,
        alignItems: 'center',
      }}
      onPress={() => toggleIconSelection(iconUrl)}
    >
      <View
        style={{
          backgroundColor: selectedIcons === iconUrl ? '#CBD18F' : 'transparent',
          padding: 10,
          borderRadius: 5,
        }}
      >
        <Image source={iconUrl.icon} style={{ width: 50, height: 50}} />
        {/* <Text>{iconUrl.icon}</Text> */}
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
        <Text style={{alignSelf: 'center', color: '#E3B448'}}>Wants</Text>
      <View style={{ overflow: 'hidden', margin: 10, borderWidth: 1, borderColor: iconError ? '#810000' : '#144714',  borderRadius: 20,  }}>
      <ScrollView 
      nestedScrollEnabled
      contentContainerStyle={{ backgroundColor: '#2b5627', justifyContent: "space-between", flexDirection: 'row', flexWrap: 'wrap', padding: 5 }}>
  {category.wants.map((iconUrl, index) => (
    <TouchableOpacity
      key={index}
      style={{
        margin: margin,
        alignItems: 'center',
      }}
      onPress={() => toggleIconSelection(iconUrl)}
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
        
        <Text style={{alignSelf: 'center', color: '#E3B448'}}>Savings</Text>
      <View style={{ overflow: 'hidden', margin: 10, borderWidth: 1, borderColor: iconError ? '#810000' : '#144714',  borderRadius: 20,flex: 1, alignItems: 'center' }}>

      <ScrollView 
      nestedScrollEnabled
      contentContainerStyle={{ backgroundColor: '#2b5627', justifyContent: "space-between", flexDirection: 'row', flexWrap: 'wrap', paddingVertical: 5 }}>
  {category.savings.map((iconUrl, index) => (
    <TouchableOpacity
      key={index}
      style={{
        margin: margin,
        alignItems: 'center',
      }}
      onPress={() => toggleIconSelection(iconUrl)}
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
          <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={() => {
              setIsModalVisible(!isModalVisible);
            }}
          >
            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)',}}>
              <View
                style={{
                  backgroundColor: '#3A6B35',
                  width: '100%',
                  paddingVertical: 20,
                  paddingHorizontal: 30,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                }}
              >
                <Text style={{ fontSize: 20, marginBottom: 20, color: '#E3B448'}}>What month is this expenses? </Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#CBD18F',
                    padding: 10,
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 10,
                  }}
                  onPress={() => toggleModal('Current month')}
                >
                  <Text style={{ color: '#144714', fontSize: 18, }}>Current month</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#CBD18F',
                    padding: 10,
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => toggleModal('Previous month')}
                >
                  <Text style={{ color: '#144714', fontSize: 18,}}>Previous month</Text>
                </TouchableOpacity>
                {previousMonthsVisible && (
                <ScrollView>
                  {previousMonths.map((month, index) => (
                    <TouchableOpacity
                      key={month}
                      style={{
                        backgroundColor:
                          selectedMonth === month ? '#144714' : 'transparent',
                        padding: 10,
                        borderRadius: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 10,
                      }}
                      onPress={() => {
                        setSelectedMonth(month);
                        toggleModal('Selected month');
                      }}
                    >
                      <Text
                        style={{
                          color: selectedMonth === month ? '#144714' : '#E3B448',
                          fontSize: 18,
                          fontWeight: 'bold',
                        }}
                      >
                        {month}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}
                <TouchableOpacity
                  style={{
                    backgroundColor: '#810000',
                    padding: 10,
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10,
                  }}
                  onPress={() => setIsModalVisible(!isModalVisible)}
                >
                  <Text style={{ color: '#CBD18F', fontSize: 18,}}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <Modal
            animationType="slide"
            transparent={true}
            visible={previousMonthsVisible}
            onRequestClose={() => {
              setPreviousMonthsVisible(!previousMonthsVisible);
            }}
          >
            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', }}>
              <View
                style={{
                  backgroundColor: '#3A6B35',
                  width: '100%',
                  paddingVertical: 20,
                  paddingHorizontal: 30,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                }}
              >
                <Text style={{ fontSize: 20, marginBottom: 20, color: '#E3B448'}}>
                  Select Month:
                </Text>
                {previousMonths.map((month) => (
                  <TouchableOpacity
                    key={month}
                    style={{
                      backgroundColor: '#CBD18F',
                      padding: 10,
                      borderRadius: 5,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginBottom: 10,
                    }}
                    onPress={() => handlePreviousMonthSelection(month)}
                  >
                    <Text style={{ color: '#144714', fontSize: 18,}}>
                      {month}
                    </Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity
                  style={{
                    backgroundColor: '#810000',
                    padding: 10,
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10,
                  }}
                  onPress={() => setPreviousMonthsVisible(false)}
                >
                  <Text style={{ color: '#CBD18F', fontSize: 18,}}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          </ScrollView> 
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
    </View>
  )
}

export default AddExpenses
