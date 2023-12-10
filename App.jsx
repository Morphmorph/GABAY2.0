import React, { useState, useEffect, useContext,useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Animated, Dimensions, StyleSheet, Image, Platform, View, TouchableOpacity, Text, Modal,Linking } from 'react-native';
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
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import plus from './assets/Icon/plus.png';
import Settings from './views/Landing/Settings';
import Loader from './views/Starting/actionLoader';
import PrivacyPolicy from './views/Starting/PrivacyPolicy';
import TermsOfService from './views/Starting/TermsofService';
import Help from './views/Landing/Help';
import About from './views/Landing/About';
import SupportInbox from './views/Landing/SupportInbox';
import ReportInbox from './views/Landing/ReportInbox';
import  AsyncStorage  from '@react-native-async-storage/async-storage'
import { getItem } from './utils/asyncStorage';



//TODO

// 1. Alert sa pag transition kada button
// 2.Forgot password nga mag type og unsa nga email ang sendan og another OTP nga input para Verify

const statusBarStyle = 'light-content'; // Set your desired status bar style here
const statusBarBackgroundColor = '#CBD18F'; // Set your desired status bar background color here

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const App = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true);

  const [context, setContext] = React.useState({
    id: null,
    email: null,
    otp: null
  })
  const [delay,setDelay] = useState(true)

  const [local,setLocal] = useState("Onboarding")
  const [totalincome,setTotalIncome] = React.useState()

  const [incomeIcon, setIncomeIcon] = useState({
    income: [
      {
        icon: require('./assets/Icon/income/i1.png'),
        text: 'Business',
      },
      {
        icon: require('./assets/Icon/income/i2.png'),
        text: 'Investment',
      },
      {
        icon: require('./assets/Icon/income/i3.png'),
        text: 'Annuities',
      },
      {
        icon: require('./assets/Icon/income/i4.png'),
        text: 'Capital gain',
      },
      {
        icon: require('./assets/Icon/income/i5.png'),
        text: 'Pension',
      },
      {
        icon: require('./assets/Icon/income/i6.png'),
        text: 'Dividend',
      },
      {
        icon: require('./assets/Icon/income/i7.png'),
        text: 'Rental',
      },
      {
        icon: require('./assets/Icon/income/i10.png'),
        text: 'Freelancing',
      },
      {
        icon: require('./assets/Icon/income/i9.png'),
        text: 'Vlogging',
      },
      {
        icon: require('./assets/Icon/income/i12.png'),
        text: 'Employment',
      },
      {
        icon: require('./assets/Icon/income/i13.png'),
        text: 'Interest',
      },
      {
        icon: require('./assets/Icon/income/i8.png'),
        text: 'Online selling',
      },
      {
        icon: require('./assets/Icon/income/i14.png'),
        text: 'Gifts',
      },
      {
        icon: require('./assets/Icon/income/i15.png'),
        text: 'Commission',
      },
      {
        icon: require('./assets/Icon/income/i17.png'),
        text: 'Sport',
      },
      {
        icon: require('./assets/Icon/income/i16.png'),
        text: 'NFT Sales',
      },
      {
        icon: require('./assets/Icon/income/i23.png'),
        text: 'Lottery',
      },]
  })



  const [category1, setCategory1] = useState({
    necessities: [
      {
        icon: require('./assets/Icon/necessities/n9.png'),
        text: 'Maintenance',
      },
      {
        icon: require('./assets/Icon/necessities/n2.png'),
        text: 'Ensurance',
      },
      {
        icon: require('./assets/Icon/necessities/n3.png'),
        text: 'Rent',
      },
      {
        icon: require('./assets/Icon/necessities/n4.png'),
        text: 'Child Care',
      },
      {
        icon: require('./assets/Icon/necessities/n5.png'),
        text: 'Grocery',
      },
      {
        icon: require('./assets/Icon/necessities/n6.png'),
        text: 'Utilities',
      },
      {
        icon: require('./assets/Icon/necessities/n7.png'),
        text: 'Transport',
      },
      {
        icon: require('./assets/Icon/necessities/n1.png'),
        text: 'Personal care',
      },
      {
        icon: require('./assets/Icon/necessities/n8.png'),
        text: 'Medical',
      },
      // ... (other necessities)
    ],
    wants: [
      {
        icon: require('./assets/Icon/wants/w1.png'),
        text: 'Gifts',
      },
      {
        icon: require('./assets/Icon/wants/w2.png'),
        text: 'Gym',
      },
      {
        icon: require('./assets/Icon/wants/w3.png'),
        text: 'Furnishing',
      },
      {
        icon: require('./assets/Icon/wants/w4.png'),
        text: 'Electronincs',
      },
      {
        icon: require('./assets/Icon/wants/w5.png'),
        text: 'Hobbies',
      },
      {
        icon: require('./assets/Icon/wants/w6.png'),
        text: 'Travel',
      },
      {
        icon: require('./assets/Icon/wants/w7.png'),
        text: 'Entertainment',
      },
      {
        icon: require('./assets/Icon/wants/w8.png'),
        text: 'Dining Out',
      },
      {
        icon: require('./assets/Icon/wants/w9.png'),
        text: 'Fashion',
      },
      // ... (other wants)
    ],
    savings: [
      {
        icon: require('./assets/Icon/savings/s1.png'),
        text: 'Emergency',
      },
      {
        icon: require('./assets/Icon/savings/s2.png'),
        text: 'Long-term',
      },
      {
        icon: require('./assets/Icon/savings/s3.png'),
        text: 'Short-Term',
      },
      {
        icon: require('./assets/Icon/savings/s4.png'),
        text: 'Retirement',
      },
      {
        icon: require('./assets/Icon/savings/s5.png'),
        text: 'Education',
      },
      // ... (other savings)
    ]
  })

  const iconPaths = [
    require('./assets/Icon/Icons/c1.png'),
    require('./assets/Icon/Icons/c2.png'),
    require('./assets/Icon/Icons/c3.png'),
    require('./assets/Icon/Icons/c4.png'),
    require('./assets/Icon/Icons/c5.png'),
    require('./assets/Icon/Icons/c6.png'),
    require('./assets/Icon/Icons/c7.png'),
    require('./assets/Icon/wants/w1.png'),
    require('./assets/Icon/wants/w2.png'),
    require('./assets/Icon/wants/w3.png'),
    require('./assets/Icon/wants/w4.png'),
    require('./assets/Icon/wants/w5.png'),
    require('./assets/Icon/wants/w6.png'),
    require('./assets/Icon/wants/w7.png'),
    require('./assets/Icon/wants/w8.png'),
    require('./assets/Icon/wants/w9.png'),
    require('./assets/Icon/Icons/c8.png'),
    require('./assets/Icon/Icons/c9.png'),
    require('./assets/Icon/Icons/c11.png'),
    require('./assets/Icon/Icons/c12.png'),
    require('./assets/Icon/Icons/c13.png'),
    require('./assets/Icon/Icons/c14.png'),
    require('./assets/Icon/Icons/c15.png'),
    require('./assets/Icon/Icons/c16.png'),
    require('./assets/Icon/Icons/c17.png'),
    require('./assets/Icon/Icons/c18.png'),
    require('./assets/Icon/Icons/c19.png'),
    require('./assets/Icon/savings/s1.png'),
    require('./assets/Icon/savings/s2.png'),
    require('./assets/Icon/savings/s3.png'),
    require('./assets/Icon/savings/s4.png'),
    require('./assets/Icon/savings/s5.png'),
    require('./assets/Icon/Icons/c20.png'),
    require('./assets/Icon/Icons/c21.png'),
    require('./assets/Icon/Icons/c22.png'),
    require('./assets/Icon/Icons/c23.png'),
    require('./assets/Icon/income/i1.png'),
    require('./assets/Icon/income/i2.png'),
    require('./assets/Icon/income/i3.png'),
    require('./assets/Icon/income/i4.png'),
    require('./assets/Icon/income/i5.png'),
    require('./assets/Icon/income/i6.png'),
    require('./assets/Icon/income/i7.png'),
    require('./assets/Icon/income/i10.png'),
    require('./assets/Icon/income/i9.png'),
    require('./assets/Icon/income/i12.png'),
    require('./assets/Icon/income/i13.png'),
    require('./assets/Icon/income/i8.png'),
    require('./assets/Icon/Icons/c24.png'),
    require('./assets/Icon/Icons/c25.png'),
    require('./assets/Icon/Icons/c26.png'),
    require('./assets/Icon/Icons/c27.png'),
    require('./assets/Icon/Icons/c28.png'),
    require('./assets/Icon/Icons/c29.png'),
    require('./assets/Icon/Icons/c30.png'),
    require('./assets/Icon/necessities/n9.png'),
    require('./assets/Icon/necessities/n2.png'),
    require('./assets/Icon/necessities/n3.png'),
    require('./assets/Icon/necessities/n4.png'),
    require('./assets/Icon/income/i14.png'),
    require('./assets/Icon/income/i15.png'),
    require('./assets/Icon/income/i17.png'),
    require('./assets/Icon/income/i16.png'),
    require('./assets/Icon/income/i18.png'),
    require('./assets/Icon/income/i19.png'),
    require('./assets/Icon/income/i20.png'),
    require('./assets/Icon/income/i21.png'),
    require('./assets/Icon/income/i22.png'),
    require('./assets/Icon/income/i23.png'),
    require('./assets/Icon/necessities/n5.png'),
    require('./assets/Icon/necessities/n6.png'),
    require('./assets/Icon/necessities/n7.png'),
    require('./assets/Icon/necessities/n1.png'),
    require('./assets/Icon/necessities/n8.png'),
    require('./assets/Icon/Icons/c31.png'),
    require('./assets/Icon/Icons/c32.png'),
    require('./assets/Icon/Icons/c33.png'),
    require('./assets/Icon/Icons/c34.png'),
    require('./assets/Icon/Icons/c35.png'),
    require('./assets/Icon/Icons/c36.png'),
  ];


  const [nav, setNav] = React.useState(false)

  const [transaction, setTransaction] = useState({})


  useEffect(() => {
    setTimeout(() => {
      // console.log(JSON.stringify(context))
      // console.log(context)
      setIsLoading(false);
    }, 4000);
  }, [context]);

  const [editMode, setEditMode] = React.useState(false);
  const [first,setFirst] = React.useState(true)

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };




  useEffect(() => {

    const loadUserFromStorage = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        const board = await getItem("onboarded")
        if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setContext(parsedUser);
        if (board) {
          // Navigate to the "LogIn" screen
          // navigation.navigate("Log in");
          setFirst(false)
          
        } 
        // console.log(storedUser)
        // console.log(Boolean(board),"wew")
      } 
        
      } catch (error) {
        console.error('Error loading user from AsyncStorage:', error);
        // console.log(JSON.stringify(context))

      }
    };

    loadUserFromStorage();
  }, []);

  useEffect(() => {
    const saveContextToStorage = async () => {
      try {
      await AsyncStorage.setItem('user', JSON.stringify(context));
      
      if(context.id){
        setLocal("Homescreen")
      }
        
      } catch (error) {
        console.error('Error saving context to AsyncStorage:', error);
        // console.log(JSON.stringify(context))

      }
    };

    saveContextToStorage();
  }, [context]);

  const [pdfprint,setPdfPrint] = React.useState(null)

  const providervalue = useMemo(() => ({  context, setContext, nav, setNav, category1, 
    setCategory1, transaction, setTransaction, incomeIcon, 
    setIncomeIcon,totalincome,setTotalIncome,iconPaths,pdfprint,setPdfPrint,delay,setDelay }), [context, setContext, nav, setNav, category1, setCategory1, transaction, setTransaction, incomeIcon, setIncomeIcon,
      totalincome,setTotalIncome,iconPaths,pdfprint,setPdfPrint,delay,setDelay]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#3A6B35'}}>
      <ExpoStatusBar
        style={statusBarStyle}
        backgroundColor={statusBarBackgroundColor} 
        translucent={true}
        hidden={true}
      />
      <NavigationContainer>

        <UserContext.Provider value={providervalue}>
          <Stack.Navigator
            // initialRouteName={async()=>{}}
            screenOptions={{
              headerShown: false,
              animation: 'fade',
            }}
          >
            {/* {context.id ? () : first ? () : () */}

          {context?.id && <Stack.Screen
              name="Homescreen"
              component={DrawerScreen}
            />}

            { first && <Stack.Screen
              name="Onboarding"
              component={OnboardingScreen}
            /> }

            <Stack.Screen
            name="Log in"
            component={Login}

          />  
           <Stack.Screen
          name="Forecast Savings"
          component={ForecastSavings}

        /> 

      

          
              
            {/* <Stack.Screen
            name="Log in"
            component={Login}
          /> */}
            <Stack.Screen
              name="Incomes"
              component={MonthlyIncome}
              options={{
                headerShown: false,
                animation: 'fade',
              }}
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
                headerTitleAlign:'center',
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
                },headerTitleAlign:'center',
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
                headerTitleAlign:'center'
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
                headerTitleAlign:'center'
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
                headerTitleAlign:'center'
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
                headerTitleAlign:'center'
              }}
            />
            <Stack.Screen
              name="Settings"
              component={Settings}
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
                headerTitleAlign:'center'
              }}
            />
            
            <Stack.Screen
              name="Privacy Policy"
              component={PrivacyPolicy}
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
                headerTitleAlign:'center'
              }}
            />
            <Stack.Screen
              name="Terms of Service"
              component={TermsOfService}
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
                headerTitleAlign:'center'
              }}
            />
            <Stack.Screen
              name="Help"
              component={Help}
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
                headerTitleAlign:'center'
              }}
            />
            <Stack.Screen
              name="About"
              component={About}
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
                headerTitleAlign:'center'
              }}
            />
              <Stack.Screen
              name="Support inbox"
              component={SupportInbox}
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
                headerTitleAlign:'center'
              }}
            />
             <Stack.Screen
              name="Report inbox"
              component={ReportInbox}
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
                headerTitleAlign:'center'
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


function DrawerScreen({navigation,route }) {

  const {pdfprint,setPdfPrint,delay,setDelay} = useContext(UserContext)
  const [dal,setDal] = React.useState(true)

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
        headerTitleAlign: 'center',
        headerTitle: () => (
          <View style={{flex: 1, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Image
              source={require('./assets/logo/logo1.png')}
              style={{ width: 60, height: 60 }}
              resizeMode="contain"
            />
            <Text style={{ color: '#E3B448', fontSize: 45, }}>GABAY</Text>
          </View>
        ),
        headerTitleAlign: "center",
        headerRight: ({ value,income,Download }) =>  {


          return(
          delay ? null:
          <TouchableOpacity style={{padding:20}} onPress={() => Linking.openURL(pdfprint)}>
              <Image
           source={require('./assets/pdf.png')}
           style={{ width: 30, height: 30}}
           resizeMode="contain"
         />
           </TouchableOpacity>
         
  )},
        
      
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
          headerShown:true
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
            tabBarIcon: ({ focused}) => (
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

function CustomDrawerContent({}) {
  const navigation = useNavigation();
  
  const {setContext} = useContext(UserContext)
  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAddOption, setSelectedAddOption] = useState(true);
  const [loader,setLoader] = useState(false)

  const toggleModal = (option) => {
    setSelectedAddOption(option);
    if (selectedAddOption === 'expenses') {
      setSelectedAddOption('income');
      setTimeout(() => setSelectedAddOption(false), 100);
    } else {
      setSelectedAddOption('expenses');
      setTimeout(() => setSelectedAddOption(false), 100);
    }
    setIsModalVisible(!isModalVisible);
  };
  const toggleModal1 = () => {
    setIsLogoutModalVisible(!isLogoutModalVisible)
  };

  const handleLogout = async() => {
    try {
      await AsyncStorage.clear();
      console.log('AsyncStorage cleared successfully.');
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };

  const handleLogoutConfirmed = async () => {


    toggleModal1(); // Close the logout modal
    setLoader(true); // Show the loading indicator
  
    // Simulate an asynchronous logout process
    await new Promise(resolve => setTimeout(resolve, 2000)); // Replace this with your actual logout logic
    
    // Once the logout process is complete, navigate to the login screen and hide the loader
    handleLogout(); 
    const data = {email:null,id :null,otp:null }
    setContext(data)
    setLoader(false);
    navigateToScreen('Log in');
  };
  return (
    
    <View style={{ width:"100%",flexDirection: 'column', flex: 1, backgroundColor: '#3A6B35', padding:10, justifyContent: 'flex-start' }}>
      <Loader visible ={loader} message="Logging out..."/>
      <TouchableOpacity onPress={() => navigateToScreen('Home')}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:"flex-start",width:"100%" }}>
          <FontAwesome5 name="home" size={30} color={'#CBD18F'} />
          <Text style={{ color: '#E3B448', fontSize: 16, padding: 20 }}>Home</Text>
        </View>
      </TouchableOpacity>
      <View style={{ borderBottomWidth: 1, borderColor: '#144714' }}></View>
      <TouchableOpacity onPress={() => toggleModal()}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:"flex-start",width:"100%"  }}>
          <FontAwesome5 name="plus-circle" size={30} color={'#CBD18F'} />
          <Text style={{ color: '#E3B448', fontSize: 16, padding: 20 }}>Add History</Text>
        </View>
      </TouchableOpacity>
      <View style={{ borderBottomWidth: 1, borderColor: '#144714' }}></View>
      <TouchableOpacity onPress={() => navigateToScreen('Settings')}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:"flex-start",width:"100%"  }}>
        <AntDesign name="setting" size={30} color={'#CBD18F'} />
          <Text style={{ color: '#E3B448', fontSize: 16, padding: 20 }}>Settings</Text>
        </View>
      </TouchableOpacity>
      <View style={{ borderBottomWidth: 1, borderColor: '#144714' }}></View>

      <TouchableOpacity style={{ width:"100%",overflow:'hidden',position: 'absolute',flex:1, flexDirection: 'row', alignSelf: 'center', bottom: 10,  }} onPress={toggleModal1}>
        <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent:"center",width:"100%", backgroundColor: '#A2A869', borderRadius: 5}}>
          <AntDesign name="logout" size={30} color={'#144714'} />
          <Text style={{ color: '#144714', fontSize: 16, padding: 15 }}>Logout</Text>
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
