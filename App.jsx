import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Animated, Dimensions, Image, Platform, View, TouchableOpacity, Text, Modal } from 'react-native';
import 'react-native-gesture-handler';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from '@react-navigation/drawer';
import Style from './views/Style';
import Login from './views/Starting/LoginView';
import Signup from './views/Starting/SignupView';
import Verify from './views/Starting/VerifyView';
import Pin from './views/Starting/PinView';
import Home from './views/Landing/Home';
import Forgot from './views/Starting/ForgotpasswordView';
import MonthlyIncome from './views/Starting/MonthlyincomeView';
import InspectExpenses from './views/Landing/InspectExpenses';
import InspectIncome from './views/Landing/InspectIncome';
import AddCategory from './views/Landing/AddCategory';
import ForecastSavings from './views/Landing/ForecastSavings';
import AddExpenses from './views/Landing/AddExpenses';
import AddIncome from './views/Landing/AddIncome';
import UserContext from './api_server/context';
import InspectHistory from './views/Landing/InspectHistory';
import OnboardingScreen from './views/OnboardingScreen';
import Add from './views/Landing/Add';
import { FontAwesome5 } from '@expo/vector-icons';
import plus from './assets/Icon/plus.png';

//TODO

// 1. Alert sa pag transition kada button
// 2.Forgot password nga mag type og unsa nga email ang sendan og another OTP nga input para Verify

const statusBarStyle = 'light-content'; // Set your desired status bar style here
const statusBarBackgroundColor = '#CBD18F'; // Set your desired status bar background color here

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [context,setContext] = React.useState({
    id: null,
    email: null,
    otp:null
  })

  const [incomeIcon,setIncomeIcon] = useState({
    income : [
    {
      icon: 15,
      text: 'Business',
    },
    {
      icon: 53,
      text: 'Investment',
    },
    {
      icon: 54,
      text: 'Annuities',
    },
    {
      icon: 55,
      text: 'Capital gain',
    },
    {
      icon: 56,
      text: 'Pension',
    },
    {
      icon: 57,
      text: 'Dividend',
    },
    {
      icon: 58,
      text: 'Rental',
    },
    {
      icon: 59,
      text: 'Freelancing',
    },
    {
      icon: 60,
      text: 'Vlogging',
    },
    {
      icon: 61,
      text: 'Employment',
    },
    {
      icon: 62,
      text: 'Interest',
    },
    {
      icon: 63,
      text: 'Online selling',
    },
    {
      icon: 75,
      text: 'Gifts',
    },
    {
      icon: 76,
      text: 'Commission',
    },
    {
      icon: 77,
      text: 'Sport',
    },
    {
      icon: 78,
      text: 'NFT Sales',
    },
    {
      icon: 84,
      text: 'Lottery',
    }, ]
})

  

  const [category1,setCategory1] = useState({
    necessities: [
      {
        icon: 71,
        text: 'Maintenance',
      },
      {
        icon: 72,
        text: 'Ensurance',
      },
      {
        icon: 73,
        text: 'Rent',
      },
      {
        icon: 74,
        text: 'Child Care',
      },
      {
        icon: 85,
        text: 'Grocery',
      },
      {
        icon: 86,
        text: 'Utilities',
      },
      {
        icon: 87,
        text: 'Transport',
      },
      {
        icon: 14,
        text: 'Personal care',
      },
      {
        icon: 88,
        text: 'Medical',
      },
      // ... (other necessities)
    ],
    wants: [
      {
        icon: 24,
        text: 'Gifts',
      },
      {
        icon: 25,
        text: 'Gym',
      },
      {
        icon: 26,
        text: 'Furnishing',
      },
      {
        icon:27,
        text: 'Electronincs',
      },
      {
        icon: 28,
        text: 'Hobbies',
      },
      {
        icon: 29,
        text: 'Travel',
      },
      {
        icon: 30,
        text: 'entertainment',
      },
      {
        icon: 31,
        text: 'Dining Out',
      },
      {
        icon: 32,
        text: 'Fashion',
      },
      // ... (other wants)
    ],
    savings: [
      {
        icon: 44,
        text: 'Emergency',
      },
      {
        icon: 45,
        text: 'Long-term',
      },
      {
        icon: 46,
        text: 'Short-Term',
      },
      {
        icon: 47,
        text: 'Retirement',
      },
      {
        icon: 48,
        text: 'Education',
      },
      // ... (other savings)
    ]
  })
  

  const [nav, setNav] = React.useState(false)

  const [transaction,setTransaction] = useState({})


  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#3A6B35' }}>
      <ExpoStatusBar
        style={statusBarStyle}
        backgroundColor={statusBarBackgroundColor}
        translucent={true}
        hidden={true}
      />
      <NavigationContainer>
    
<UserContext.Provider value={{context,setContext,nav,setNav,category1,setCategory1,transaction,setTransaction,incomeIcon,setIncomeIcon}}>
        <Stack.Navigator
          initialRouteName={context.id ? "Homescreen" :"Onboarding"}
          screenOptions={{
            headerShown: false,
            animation: 'fade',
          }}
        >
          <Stack.Screen
            name="Incomes"
            component={MonthlyIncome}
            options={{
              headerShown: false,
              animation: 'fade',
            }}
          />

          <Stack.Screen
            name="Log in"
            component={Login}
           
          />
           <Stack.Screen
            name="Homescreen"
            component={Homescreen}
          />
          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
          />
          <Stack.Screen
            name="Forgot password"
            component={Forgot}
            options={{
              headerShown: false,
              animation: 'slide_from_right',
            }}
          />
          
          <Stack.Screen
            name="Expenses"
            component={InspectExpenses}
            options={{
              headerShown: true,
              animation: 'slide_from_bottom',
              headerStyle: {
                backgroundColor: '#144714', // Background color for the header
                height: 80,
              },
              headerTintColor: '#E3B448', // Text color
              headerTitleStyle: {
                fontSize: 24, // Font size for the title
                fontWeight: 'bold', // Font weight for the title
              },
            }}
          />
          <Stack.Screen
            name="Income"
            component={InspectIncome}
            options={{
              headerShown: true,
              animation: 'slide_from_bottom',
              headerStyle: {
                backgroundColor: '#144714', // Background color for the header
                height: 80,
              },
              headerTintColor: '#E3B448', // Text color
              headerTitleStyle: {
                fontSize: 24, // Font size for the title
                fontWeight: 'bold', // Font weight for the title
              },
            }}
          />
          <Stack.Screen
            name="History"
            component={InspectHistory}
            options={{
              headerShown: true,
              animation: 'slide_from_bottom',
              headerStyle: {
                backgroundColor: '#144714', // Background color for the header
                height: 80,
              },
              headerTintColor: '#E3B448', // Text color
              headerTitleStyle: {
                fontSize: 24, // Font size for the title
                fontWeight: 'bold', // Font weight for the title
              },
            }}
          />
          <Stack.Screen
            name="Add Category"
            component={AddCategory}
            options={{
              headerShown: true,
              animation: 'slide_from_bottom',
              headerStyle: {
                backgroundColor: '#144714', // Background color for the header
                height: 80,
              },
              headerTintColor: '#E3B448', // Text color
              headerTitleStyle: {
                fontSize: 24, // Font size for the title
                fontWeight: 'bold', // Font weight for the title
              },
            }}
          />
          
          <Stack.Screen
            name="Add expenses"
            component={AddExpenses}
            options={{
              headerShown: true,
              animation: 'slide_from_bottom',
              headerStyle: {
                backgroundColor: '#144714', // Background color for the header
                height: 80,
              },
              headerTintColor: '#E3B448', // Text color
              headerTitleStyle: {
                fontSize: 24, // Font size for the title
                fontWeight: 'bold', // Font weight for the title
              },
            }}
          />
          <Stack.Screen
            name="Add income"
            component={AddIncome}
            options={{
              headerShown: true,
              animation: 'slide_from_bottom',
              headerStyle: {
                backgroundColor: '#144714', // Background color for the header
                height: 80,
              },
              headerTintColor: '#E3B448', // Text color
              headerTitleStyle: {
                fontSize: 24, // Font size for the title
                fontWeight: 'bold', // Font weight for the title
              },
            }}
          />
          <Stack.Screen
            name="Sign up"
            component={Signup}
            options={{
              headerShown: false,
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="Verify"
            component={Verify}
            options={{
              headerShown: false,
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="Pin"
            component={Pin}
            options={{
              headerShown: false,
              animation: 'slide_from_right',
            }}
          />
        </Stack.Navigator>
        
        </UserContext.Provider>
        
      </NavigationContainer>
      
    </SafeAreaView>
  );
};

function Homescreen({ navigation }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAddOption, setSelectedAddOption] = useState('');
  const toggleModal = (option) => {
    setSelectedAddOption(option);
    if (selectedAddOption === 'expenses') {
      setSelectedAddOption('income');
    } else {
      setSelectedAddOption('expenses');
    }
    setIsModalVisible(!isModalVisible);
  };
  
  return (
    <View style={Style.common}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(!isModalVisible);
        }}
      >
        <View style={Style.modalContainer}>
          <View style={Style.modalContent}>
        
            <Text style={{ fontSize: 20, marginBottom: 20, color: '#E3B448',}}>Select an option:</Text>
            <TouchableOpacity
              style={Style.modalButton}
              onPress={() => {
                
                setIsModalVisible(!isModalVisible);
                if (selectedAddOption == 'expenses') {
                  navigation.navigate('Add expenses'); 
                }
              }}
            >
              <Text style={Style.modalButtonText}>Add Expenses</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={Style.modalButton}
              onPress={() => {
                
                setIsModalVisible(!isModalVisible);
                if (selectedAddOption == 'income') {
                  navigation.navigate('Add income'); 
                }
              }}
            >
              <Text style={Style.modalButtonText}>Add Income</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[Style.modalButton, Style.modalCancelButton]}
              onPress={() => setIsModalVisible(!isModalVisible)}
            >
              <Text style={{color: '#CBD18F', fontSize: 18,}}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: '#144714',
            position: 'absolute',
            bottom: 10,
            marginHorizontal: 20,
            height: 60,
            borderRadius: 10,
            borderColor: '#144714',
            shadowColor: '#000',
            shadowOpacity: 0.06,
            shadowOffset: { width: 10, height: 10 },
            paddingHorizontal: 1,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: true,
            animation: 'slide_from_right',
            headerStyle: {
              backgroundColor: '#144714', // Background color for the header
              height: 70,
            },
            headerTintColor: '#E3B448', // Text color
            headerTitleStyle: {
              fontSize: 24, // Font size for the title
              fontWeight: 'bold', // Font weight for the title
            },
            headerTitle: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center', left: -5, }}>
              <Image
                source={require('./assets/logo/logo1.png')} 
                style={{ width: 60, height: 60 }} 
                resizeMode="contain"
              />
              <Text style={{color: '#E3B448', fontSize: 45,}}>GABAY</Text>
              </View>
            ),
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.openDrawer()}>
                <FontAwesome5
                  name="bars"
                  size={30}
                  color="#E3B448"
                  style={{ right: 20 }}
                />
              </TouchableOpacity>
            ),
            tabBarIcon: ({ focused }) => (
              <View style={{ position: 'absolute', top: 10, left: 45 }}>
                <FontAwesome5
                  name="home"
                  size={30}
                  color={focused ? '#E3B448' : '#CBD18F'}
                />
              </View>
            ),
          }}
        />
       

        <Tab.Screen
          name="Forecast Savings"
          component={ForecastSavings}
          options={{
            headerShown: true,
            animation: 'slide_from_right',
            headerStyle: {
              backgroundColor: '#144714', // Background color for the header
              height: 70,
            },
            headerTintColor: '#E3B448', // Text color
            headerTitleStyle: {
              fontSize: 24, // Font size for the title
              fontWeight: 'bold', // Font weight for the title
            },
            
            tabBarIcon: ({ focused }) => (
              <View style={{ position: 'absolute', top: 10, right: 45}}>
                <FontAwesome5
                  name="crosshairs"
                  size={30}
                  color={focused ? '#E3B448' : '#CBD18F'}
                />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
      <View style={{ position: 'absolute', width: 55, height: 55, bottom: -10, backgroundColor: '#144714', borderRadius: 30, justifyContent: 'center', alignSelf: 'center', alignItems: 'center', marginBottom: Platform.OS == 'android' ? 50 : 30}}>
              <TouchableOpacity
               onPress={() => toggleModal('expenses')}
              style={{ width: 50, height: 50, }}  
            >
          <Image source={plus} style={{ width: 50, height: 50 }} />
        </TouchableOpacity>
        
      </View>
      
    </View>
  );
}




export default App;
