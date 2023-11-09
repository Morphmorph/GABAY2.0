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
// import Welcome from './views/Starting/Welcome';
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

  const [incomeIcon,setIncomeIcon] = useState({
    income : [
    {
      icon: require('../GABAY2.0/assets/Icon/income/i1.png'),
      text: 'Business',
    },
    {
      icon: require('../GABAY2.0/assets/Icon/income/i2.png'),
      text: 'Investment',
    },
    {
      icon:  require('../GABAY2.0/assets/Icon/income/i3.png'),
      text: 'Annuities',
    },
    {
      icon: require('../GABAY2.0/assets/Icon/income/i4.png'),
      text: 'Capital gain',
    },
    {
      icon: require('../GABAY2.0/assets/Icon/income/i5.png'),
      text: 'Pension',
    },
    {
      icon: require('../GABAY2.0/assets/Icon/income/i6.png'),
      text: 'Dividend',
    },
    {
      icon: require('../GABAY2.0/assets/Icon/income/i7.png'),
      text: 'Rental',
    },
    {
      icon: require('../GABAY2.0/assets/Icon/income/i10.png'),
      text: 'Freelancing',
    },
    {
      icon: require('../GABAY2.0/assets/Icon/income/i9.png'),
      text: 'Vlogging',
    },
    {
      icon: require('../GABAY2.0/assets/Icon/income/i12.png'),
      text: 'Employment',
    },
    {
      icon: require('../GABAY2.0/assets/Icon/income/i13.png'),
      text: 'Interest',
    },
    {
      icon: require('../GABAY2.0/assets/Icon/income/i8.png'),
      text: 'Online selling',
    },
    {
      icon: require('../GABAY2.0/assets/Icon/income/i14.png'),
      text: 'Gifts',
    },
    {
      icon: require('../GABAY2.0/assets/Icon/income/i15.png'),
      text: 'Commission',
    },
    {
      icon: require('../GABAY2.0/assets/Icon/income/i17.png'),
      text: 'Sport',
    },
    {
      icon: require('../GABAY2.0/assets/Icon/income/i16.png'),
      text: 'NFT Sales',
    },
    {
      icon: require('../GABAY2.0/assets/Icon/income/i23.png'),
      text: 'Lottery',
    }, ]
})

  

  const [category1,setCategory1] = useState({
    necessities: [
      {
        icon: require('../GABAY2.0/assets/Icon/necessities/n9.png'),
        text: 'Maintenance',
      },
      {
        icon: require('../GABAY2.0/assets/Icon/necessities/n2.png'),
        text: 'Ensurance',
      },
      {
        icon: require('../GABAY2.0/assets/Icon/necessities/n3.png'),
        text: 'Rent',
      },
      {
        icon:  require('../GABAY2.0/assets/Icon/necessities/n4.png'),
        text: 'Child Care',
      },
      {
        icon:  require('../GABAY2.0/assets/Icon/necessities/n5.png'),
        text: 'Grocery',
      },
      {
        icon: require('../GABAY2.0/assets/Icon/necessities/n6.png'),
        text: 'Utilities',
      },
      {
        icon: require('../GABAY2.0/assets/Icon/necessities/n7.png'),
        text: 'Transport',
      },
      {
        icon: require('../GABAY2.0/assets/Icon/necessities/n1.png'),
        text: 'Personal care',
      },
      {
        icon: require('../GABAY2.0/assets/Icon/necessities/n8.png'),
        text: 'Medical',
      },
      // ... (other necessities)
    ],
    wants: [
      {
        icon: require('../GABAY2.0/assets/Icon/wants/w1.png'),
        text: 'Gifts',
      },
      {
        icon: require('../GABAY2.0/assets/Icon/wants/w2.png'),
        text: 'Gym',
      },
      {
        icon: require('../GABAY2.0/assets/Icon/wants/w3.png'),
        text: 'Furnishing',
      },
      {
        icon:require('../GABAY2.0/assets/Icon/wants/w4.png'),
        text: 'Electronincs',
      },
      {
        icon: require('../GABAY2.0/assets/Icon/wants/w5.png'),
        text: 'Hobbies',
      },
      {
        icon: require('../GABAY2.0/assets/Icon/wants/w6.png'),
        text: 'Travel',
      },
      {
        icon: require('../GABAY2.0/assets/Icon/wants/w7.png'),
        text: 'entertainment',
      },
      {
        icon: require('../GABAY2.0/assets/Icon/wants/w8.png'),
        text: 'Dining Out',
      },
      {
        icon: require('../GABAY2.0/assets/Icon/wants/w9.png'),
        text: 'Fashion',
      },
      // ... (other wants)
    ],
    savings: [
      {
        icon: require('../GABAY2.0/assets/Icon/savings/s1.png'),
        text: 'Emergency',
      },
      {
        icon: require('../GABAY2.0/assets/Icon/savings/s2.png'),
        text: 'Long-term',
      },
      {
        icon: require('../GABAY2.0/assets/Icon/savings/s3.png'),
        text: 'Short-Term',
      },
      {
        icon: require('../GABAY2.0/assets/Icon/savings/s4.png'),
        text: 'Retirement',
      },
      {
        icon: require('../GABAY2.0/assets/Icon/savings/s5.png'),
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
          initialRouteName={context.id ? "Home" :"Onboarding"}
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
          {/* <Stack.Screen
            name="Welcome"
            component={Welcome}
          /> */}
          <Stack.Screen
            name="Log in"
            component={Login}
           
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
            name="Home"
            component={Home}
            options={{
              headerShown: false,
              animation: 'flip',
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

export default App;
