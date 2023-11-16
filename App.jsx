import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Animated, Dimensions, StyleSheet, Image, Platform, View, TouchableOpacity, Text, Modal } from 'react-native';
import 'react-native-gesture-handler';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { CommonActions } from '@react-navigation/native';
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
import ModalMessage from './views/Modal';
import UserContext from './api_server/context';
import InspectHistory from './views/Landing/InspectHistory';
import OnboardingScreen from './views/OnboardingScreen';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import plus from './assets/Icon/plus.png';



//TODO

// 1. Alert sa pag transition kada button
// 2.Forgot password nga mag type og unsa nga email ang sendan og another OTP nga input para Verify

const statusBarStyle = 'light-content'; // Set your desired status bar style here
const statusBarBackgroundColor = '#CBD18F'; // Set your desired status bar background color here

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [context, setContext] = React.useState({
    id: null,
    email: null,
    otp: null
  })

  const [incomeIcon, setIncomeIcon] = useState({
    income: [
      {
        icon: require('../GABAY2.0/assets/Icon/income/i1.png'),
        text: 'Business',
      },
      {
        icon: require('../GABAY2.0/assets/Icon/income/i2.png'),
        text: 'Investment',
      },
      {
        icon: require('../GABAY2.0/assets/Icon/income/i3.png'),
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
      },]
  })



  const [category1, setCategory1] = useState({
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
        icon: require('../GABAY2.0/assets/Icon/necessities/n4.png'),
        text: 'Child Care',
      },
      {
        icon: require('../GABAY2.0/assets/Icon/necessities/n5.png'),
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
        icon: require('../GABAY2.0/assets/Icon/wants/w4.png'),
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
        text: 'Entertainment',
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

  const [transaction, setTransaction] = useState({})


  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  }, []);

  const [editMode, setEditMode] = React.useState(false);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#3A6B35' }}>
      <ExpoStatusBar
        style={statusBarStyle}
        backgroundColor={statusBarBackgroundColor}
        translucent={true}
        hidden={true}
      />
      <NavigationContainer>

        <UserContext.Provider value={{ context, setContext, nav, setNav, category1, setCategory1, transaction, setTransaction, incomeIcon, setIncomeIcon }}>
          <Stack.Navigator
            initialRouteName={context.id ? "Homescreen" : "Onboarding"}
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
              component={DrawerScreen}
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
                  fontWeight: 'normal', // Font weight for the title
                },
                headerRight: () => (
                  <TouchableOpacity onPress={toggleEditMode}>
                    <Text style={{ color: '#E3B448', fontSize: 20, right: 10 }}> Edit</Text>
                  </TouchableOpacity>
                ),
              }}
            >
              {({ navigation, route }) => <InspectExpenses navigation={navigation} route={route} editMode={editMode} setEditMode={setEditMode}/>}
            </Stack.Screen>
            <Stack.Screen
              name="Income"
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
                  fontWeight: 'normal', // Font weight for the title
                },
                headerRight: () => (
                  <TouchableOpacity onPress={toggleEditMode}>
                    <Text style={{ color: '#E3B448', fontSize: 20, right: 10 }}> Edit</Text>
                  </TouchableOpacity>
                ),
              }}
            >
              {({ navigation, route }) => <InspectIncome navigation={navigation} route={route} editMode={editMode} setEditMode={setEditMode}/>}
            </Stack.Screen>
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
                  fontWeight: 'normal', // Font weight for the title
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
                  fontWeight: 'normal', // Font weight for the title
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
                  fontWeight: 'normal', // Font weight for the title
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
                  fontWeight: 'normal', // Font weight for the title
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


function DrawerScreen({ }) {

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        animation: 'slide_from_left',
        headerStyle: {
          backgroundColor: '#144714',
          height: 70,
        },
        headerTintColor: '#E3B448',
        drawerActiveBackgroundColor: 'red',
        headerTitle: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center', left: 20 }}>
            <Image
              source={require('./assets/logo/logo1.png')}
              style={{ width: 60, height: 60 }}
              resizeMode="contain"
            />
            <Text style={{ color: '#E3B448', fontSize: 45 }}>GABAY</Text>
          </View>
        ),
      }}
    >
      <Drawer.Screen
        name="HomeDrawer"
        component={Homescreen}
        options={{
          drawerLabel: 'Home',
        }}
      />
      <Drawer.Screen
        name="Forecast Savings"
        component={ForecastSavings}
        options={{
          drawerLabel: 'Forecast Savings',
        }}
      />
    </Drawer.Navigator>
  );
}

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

            <Text style={{ fontSize: 20, marginBottom: 20, color: '#E3B448', }}>Select an option:</Text>
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
              <Text style={{ color: '#CBD18F', fontSize: 18, }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Tab.Navigator
        initialRouteName="Home"
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
            headerShown: false,
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
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View style={{ position: 'absolute', top: 10, right: 45 }}>
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
      <View style={{ position: 'absolute', width: 55, height: 55, bottom: -10, backgroundColor: '#144714', borderRadius: 30, justifyContent: 'center', alignSelf: 'center', alignItems: 'center', marginBottom: Platform.OS == 'android' ? 50 : 30 }}>
        <TouchableOpacity
          onPress={() => toggleModal()}
          style={{ width: 50, height: 50, }}
        >
          <Image source={plus} style={{ width: 50, height: 50 }} />
        </TouchableOpacity>

      </View>

    </View>
  );
}

function CustomDrawerContent({  }) {

  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
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
  const toggleModal1 = () => {
    setIsLogoutModalVisible(!isLogoutModalVisible)
  };

  const handleLogout = () => {
    navigateToScreen('Log in');
  };

  const handleLogoutConfirmed = () => {
    toggleModal1(); // Close the logout modal
    handleLogout(); // Perform the logout action
  };
  return (

    <View style={{ flexDirection: 'column', flex: 1, backgroundColor: '#3A6B35', padding: 10, justifyContent: 'flex-start' }}>
      <TouchableOpacity onPress={() => navigateToScreen('HomeDrawer')}>
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
          <FontAwesome5 name="home" size={30} color={'#CBD18F'} />
          <Text style={{ color: '#E3B448', fontSize: 16, padding: 20 }}>Home</Text>
        </View>
      </TouchableOpacity>
      <View style={{ borderBottomWidth: 1, borderColor: '#144714' }}></View>
      <TouchableOpacity onPress={() => toggleModal()}>
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
          <FontAwesome5 name="plus-circle" size={30} color={'#CBD18F'} />
          <Text style={{ color: '#E3B448', fontSize: 16, padding: 20 }}>Add History</Text>
        </View>
      </TouchableOpacity>
      <View style={{ borderBottomWidth: 1, borderColor: '#144714' }}></View>
      <TouchableOpacity onPress={() => navigateToScreen('Forecast Savings')}>
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, }}>
          <FontAwesome5 name="crosshairs" size={30} color={'#CBD18F'} />
          <Text style={{ color: '#E3B448', fontSize: 16, padding: 20 }}>Forecast Savings</Text>
        </View>
      </TouchableOpacity>
      <View style={{ borderBottomWidth: 1, borderColor: '#144714' }}></View>

      <TouchableOpacity style={{ position: 'absolute', flexDirection: 'row', alignItems: 'center', padding: 10, bottom: 10 }} onPress={toggleModal1}>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, }}>
          <AntDesign name="logout" size={30} color={'#CBD18F'} />
          <Text style={{ color: '#E3B448', fontSize: 16, padding: 20 }}>Logout</Text>
        </View>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isLogoutModalVisible}
        onRequestClose={toggleModal1}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Are you sure you want to log out?</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.yesButton} onPress={handleLogoutConfirmed}>
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.noButton} onPress={toggleModal1}>
                <Text style={styles.buttonText2}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>


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

            <Text style={{ fontSize: 20, marginBottom: 20, color: '#E3B448', }}>Select an option:</Text>
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
              <Text style={{ color: '#CBD18F', fontSize: 18, }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: '#3A6B35',
    borderRadius: 10,
    width: '90%',
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#E3B448'
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  yesButton: {
    flex: 1,
    backgroundColor: '#A2A869',
    borderRadius: 5,
    padding: 10,
    margin: 5,
    alignItems: 'center',
  },
  noButton: {
    flex: 1,
    backgroundColor: '#810000',
    borderRadius: 5,
    padding: 10,
    margin: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#144714',
    fontSize: 16,
  },
  buttonText2: {
    color: '#CBD18F',
    fontSize: 16,
  },
});
