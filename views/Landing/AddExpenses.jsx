import { View, Text, ScrollView, Modal, TouchableOpacity, Image, Dimensions,Alert} from 'react-native'
import React, { useState, useEffect, useContext, useCallback } from 'react'
import { Picker } from '@react-native-picker/picker';
import Plus from '../../assets/Icon/plus.png'
import Style from '../Style'
import CustomInput from '../CustomInput'
import { useNavigation } from '@react-navigation/native'
import { Asset } from 'expo-asset'
import UserContext from '../../api_server/context'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import randomColor from 'randomcolor'
import { axiosRequest } from '../../api_server/axios'
import Loader from '../Starting/actionLoader'
import ModalMessage from '../Modal'

const AddExpenses = ({route}) => {
  const navigation = useNavigation()
  const screenWidth = Dimensions.get('window').width;
  const margin = screenWidth === 360 ? 6 : 2.2;
  const openAddCategory = (cat) => {
    navigation.navigate('Add Category', { destination: 'Add expenses' ,cat :cat});
  };
  const [showModalMessage, setShowModalMessage] = useState(false);

  const [expenses, setExpenses] = useState('')
  const [expensesError, setExpensesError] = useState(null)
  const [selectedIcons, setSelectedIcons] = useState(null);
  const [iconAssets, setIconAssets] = useState([])
  const [iconError, setIconError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(''); // To track the selected option
  const [selectedMonth, setSelectedMonth] = useState("");
  const [previousMonthsVisible, setPreviousMonthsVisible] = useState(false);
  const [selectedPreviousMonth, setSelectedPreviousMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const {category1,transaction,setTransaction,context} = useContext(UserContext)
  const [legend,setLegend] = useState(null)
  const [action,setAction] = useState(false)


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
      const currentMonth = currentDate.getMonth()
      const currentYear = currentDate.getFullYear(); // Get the current year
      const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); // Get the last day of the month

      const selectedMonthWithYear = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(lastDayOfMonth).padStart(2, '0')}`; 
      setSelectedMonth(selectedMonthWithYear);
      setPreviousMonthsVisible(false);
      const l = true
      const update = {...transaction,date:selectedMonthWithYear,color:randomColor()}
      setAction(l)
      setTransaction(update)
      api(update)
      // navigation.navigate('Home', {
      //   expenses: expenses,
      //   selectedIcons: selectedIcons,
      //   selectedMonth: selectedMonthWithYear,
      // })
    
      // Log the selected option
     

      // console.log('Selected Option: Current month');
      // console.log('Current Month:', selectedMonthWithYear);
    } else if (option === 'Previous month') {
      setPreviousMonthsVisible(true); // Display previous months options
    }
  };
const currentDate = new Date();
const currentMonthIndex = currentDate.getMonth();
const currentYear = currentDate.getFullYear();

const getLastDayOfMonth = (year, month) => new Date(year, month + 1, 0);
// Calculate previous months
const previousMonths = [];
// for (let i = 0; i < currentMonthIndex; i++) {
//   const lastDayOfMonth = new Date(currentYear, i + 1, 0);
//   const formattedDate = `${lastDayOfMonth.getFullYear()}-${String(lastDayOfMonth.getMonth() + 1).padStart(2, '0')}-${String(lastDayOfMonth.getDate()).padStart(2, '0')}`;
//   previousMonths.push(formattedDate);
// }

if (currentYear !== selectedYear) {
  // Push all months for the previous year
  for (let i = 0; i < 12; i++) {
    const lastDayOfMonth = getLastDayOfMonth(currentYear, i);
    const formattedDate = `${lastDayOfMonth.getFullYear()}-${String(lastDayOfMonth.getMonth() + 1).padStart(2, '0')}-${String(lastDayOfMonth.getDate()).padStart(2, '0')}`;
    previousMonths.push(formattedDate);
  }
} else {
  // Push previous months of the current year up to the current month
  for (let i = 0; i < currentMonthIndex; i++) {
    const lastDayOfMonth = getLastDayOfMonth(currentYear, i);
    const formattedDate = `${lastDayOfMonth.getFullYear()}-${String(lastDayOfMonth.getMonth() + 1).padStart(2, '0')}-${String(lastDayOfMonth.getDate()).padStart(2, '0')}`;
    previousMonths.push(formattedDate);
  }
}

const handlePreviousMonthSelection =(month) => {
  const selectedYear = new Date(month).getFullYear();
  setSelectedPreviousMonth(month);
  setPreviousMonthsVisible(false);
  const l = true
  const update = {...transaction,date:month,color: randomColor()}
  setAction(l)
  setTransaction(update)

  setSelectedYear(selectedYear);
  // Log the selected previous month
  api(update)
  console.log(month)
};


  
  const toggleIconSelection = async (iconUrl,leg) => {
    if (selectedIcons === iconUrl) {
      setSelectedIcons(null); // Deselect the currently selected icon
      setIconError(iconUrl)
    } else {
      setSelectedIcons(iconUrl); // Select the new icon
      setLegend(leg)
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

    else if (!expensesError &&   !iconError) {
      // console.log('amount: ',expenses)
      // console.log('icon: ', selectedIcons)
      setTransaction({...transaction,user:context.id,category: parseInt(legend),
        amount:parseInt(expenses.replace(/,/g, ''), 10),
      icon : selectedIcons.icon,description :selectedIcons.text})
     
      toggleModal(true);
    }
  };

  const api = async (data) => {
    try {
      const response = await axiosRequest.post("gabay/transaction/", data, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
      setAction(false);
  
      // Show the modal message upon successful submission
      setShowModalMessage(true);
      setTimeout(() => setShowModalMessage(false), 500);
    } catch (error) {
      console.log(error);
      setAction(false);
    }
  };


  useEffect(() => {
    const loadIcons = async () => {
      // Load and cache the icon assets
      // console.log(transaction);
      const loadedAssets = await Promise.all(
        [...category1.necessities, ...category1.wants, ...category1.savings].map((path) => {Asset.fromModule((path.icon)).downloadAsync()
        })

      )

  //     // Set the iconAssets state with the loaded assets
  //     setIconAssets(loadedAssets)
  //   }

    loadIcons()
    }}, [])



  return (
    <View style={Style.common} pointerEvents ={action ?  'none' : 'auto'}>
      
      <Loader visible={action} message="Adding..."/>
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
      <View style={{height: 190, overflow: 'hidden', margin: 10, borderWidth: 1, borderColor: iconError ? '#810000' : '#144714',  borderRadius: 20,  }}>
      <ScrollView 
      nestedScrollEnabled
      contentContainerStyle={{ backgroundColor: '#2b5627', justifyContent: 'flex-start', flexDirection: 'row', flexWrap: 'wrap', padding: 5 }}>
  {category1.necessities.map((iconUrl, index) => (
    <TouchableOpacity
      key={index}
      style={{
        margin: margin,
        alignItems: 'center',
      }}
      onPress={() => toggleIconSelection(iconUrl,1)}
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
      <Text style={{ marginTop: 5, color: '#E3B448', fontSize: 10, fontWeight: 'bold', textTransform: "capitalize" }}>{iconUrl.text}</Text>
    </TouchableOpacity>
  ))}
            <TouchableOpacity
            style={{
              margin: 2,
              alignItems: 'center',
            }}
            onPress={()=> openAddCategory("necessities")}
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
      contentContainerStyle={{ backgroundColor: '#2b5627', justifyContent: 'flex-start', flexDirection: 'row', flexWrap: 'wrap', padding: 5 }}>
  {category1.wants.map((iconUrl, index) => (
    <TouchableOpacity
      key={index}
      style={{
        margin: margin,
        alignItems: 'center',
      }}
      onPress={() => toggleIconSelection(iconUrl,2)}
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
      <Text style={{ marginTop: 5, color: '#E3B448', fontSize: 10, fontWeight: 'bold', textTransform: "capitalize"}}>{iconUrl.text}</Text>
    </TouchableOpacity>
  ))}
  <TouchableOpacity
            style={{
              margin: 2,
              alignItems: 'center',
            }}
            onPress={()=>openAddCategory("wants")}
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
      contentContainerStyle={{ backgroundColor: '#2b5627', justifyContent: 'flex-start', flexDirection: 'row', flexWrap: 'wrap', padding: 5 }}>
  {category1.savings.map((iconUrl, index) => (
    <TouchableOpacity
      key={index}
      style={{
        margin: margin,
        alignItems: 'center',
      }}
      onPress={() => toggleIconSelection(iconUrl,3)}
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
      <Text style={{ marginTop: 5, color: '#E3B448', fontSize: 10, fontWeight: 'bold', textTransform: "capitalize" }}>{iconUrl.text}</Text>
    </TouchableOpacity>
  ))}
  <TouchableOpacity
            style={{
              margin: 2,
              alignItems: 'center',
            }}
            onPress={()=>openAddCategory("savings")}
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
                    backgroundColor: '#A2A869',
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
                    backgroundColor: '#A2A869',
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
                      key={index}
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
                      <Text style={{ fontSize: 20, marginBottom: 20, color: '#E3B448' }}>
        Select Month and Year:
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
        <ScrollView>
        <Picker
          selectedValue={selectedYear}
          // value = {selectedYear}
          style={{ height: 50, width: 150, color: '#144714' }}
          onValueChange={(itemValue) => setSelectedYear(itemValue)}
        >
          
          {Array.from({ length: 100 }, (_, index) => {
            const year = currentYear - index;
            return <Picker.Item key={year} label={year.toString()} value={year} />;
          })}
        </Picker>
        </ScrollView>
        <Picker
          selectedValue={selectedPreviousMonth}
          style={{ height: 50, width: 150, color: '#144714' }}
          onValueChange={(itemValue) => handlePreviousMonthSelection(itemValue)}
          
          
        >
          {previousMonths.map((month) => (
            <Picker.Item key={month} label={new Date(month).toLocaleString('default', { month: 'long' })} value={month} />
          ))}
          
        </Picker>
        </View>
        
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
      <ModalMessage showAutomatically={showModalMessage} message="Expense successfully added!" icon={<MaterialCommunityIcons name="checkbox-marked-circle-plus-outline" size={200} color="#E3B448" />} navigateToScreen="Home" again={false} current = {route.name}/>
    </View>
  )
}

export default AddExpenses
