import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Login from './views/Starting/LoginView';
import Signup from './views/Starting/SignupView';
import Verify from './views/Starting/VerifyView';
import Pin from './views/Starting/PinView';
import Home from './views/Landing/Home';
import Welcome from './views/Starting/Welcome';
import Forgot from './views/Starting/ForgotpasswordView';
import LoadingScreen from './views/LoadingScreen';
import MonthlyIncome from './views/Starting/MonthlyincomeView';
import InspectExpenses from './views/Landing/InspectExpenses';
import InspectIncome from './views/Landing/InspectIncome';
import AddCategory from './views/Landing/AddCategory';
import ForecastSavings from './views/Landing/ForecastSavings';
import AddExpenses from './views/Landing/AddExpenses';
import AddIncome from './views/Landing/AddIncome';

import UserContext from './api_server/context';
import InspectHistory from './views/Landing/InspectHistory';

import UserContext from './api_server/context';

//TODO
// 1. Alert sa pag transition kada button
// 2.Forgot password nga mag type og unsa nga email ang sendan og another OTP nga input para Verify

const statusBarStyle = 'light-content'; // Set your desired status bar style here
const statusBarBackgroundColor = '#CBD18F'; // Set your desired status bar background color here

const Stack = createNativeStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [context,setContext] = React.useState({
    id: null,
    email: null,
    otp:null
  })

  const [category,setCategory] = useState({
    necessities: [
      {
        icon: 17,
        text: 'Maintenance',
      },
      {
        icon: 18,
        text: 'Ensurance',
      },
      {
        icon: 19,
        text: 'Rent',
      },
      {
        icon: 20,
        text: 'Child Care',
      },
      {
        icon: 21,
        text: 'Grocery',
      },
      {
        icon: 22,
        text: 'Utilities',
      },
      {
        icon: 23,
        text: 'Transport',
      },
      {
        icon: 13,
        text: 'Personal care',
      },
      {
        icon: 24,
        text: 'Medical',
      },
      // ... (other necessities)
    ],
    wants: [
      {
        icon: 25,
        text: 'Gifts',
      },
      {
        icon: 26,
        text: 'Gym',
      },
      {
        icon: 27,
        text: 'Furnishing',
      },
      {
        icon:28,
        text: 'Electronincs',
      },
      {
        icon: 29,
        text: 'Hobbies',
      },
      {
        icon: 30,
        text: 'Travel',
      },
      {
        icon: 31,
        text: 'entertainment',
      },
      {
        icon: 32,
        text: 'Dining Out',
      },
      {
        icon: 33,
        text: 'Fashion',
      },
      // ... (other wants)
    ],
    savings: [
      {
        icon: 34,
        text: 'Emergency',
      },
      {
        icon: 35,
        text: 'Long-term',
      },
      {
        icon: 36,
        text: 'Short-Term',
      },
      {
        icon: 37,
        text: 'Retirement',
      },
      {
        icon: 38,
        text: 'Education',
      },
      // ... (other savings)
    ]
  })
  

  const [nav, setNav] = React.useState(false)

  
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
      />
      <NavigationContainer>
      {isLoading ? (
          <LoadingScreen /> 
        ) : (
<UserContext.Provider value={{context,setContext,nav,setNav,category,setCategory}}>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen
            name="Incomes"
            component={MonthlyIncome}
          />
          <Stack.Screen
            name="Welcome"
            component={Welcome}
          />
          <Stack.Screen
            name="Log in"
            component={Login}
          />
          <Stack.Screen
            name="Forgot password"
            component={Forgot}
          />
          <Stack.Screen
            name="Home"
            component={Home}
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
            name="Forecast savings"
            component={ForecastSavings}
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
          />
          <Stack.Screen
            name="Verify"
            component={Verify}
          />
          <Stack.Screen
            name="Pin"
            component={Pin}
          />
        </Stack.Navigator>
        </UserContext.Provider>
        )}
      </NavigationContainer>
      
    </SafeAreaView>
  );
};

export default App;
