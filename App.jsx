import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Login from './views/Starting/LoginView';
import Signup from './views/Starting/SignupView';
import Verify from './views/Starting/VerifyView';
import Pin from './views/Starting/PinView';
import Home from './views/Home';
import Welcome from './views/Starting/Welcome';
import Forgot from './views/Starting/ForgotpasswordView';
import LoadingScreen from './views/LoadingScreen';


const Stack = createNativeStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true); // Initial loading state

  useEffect(() => {
    // Simulate loading delay (you can replace this with your actual loading logic)
    setTimeout(() => {
      setIsLoading(false); // Set loading state to false after the delay
    }, 4000); // Adjust the delay time as needed
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#3A6B35' }}>
      <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#CBD18F" translucent={true} />
      <NavigationContainer>
      {isLoading ? (
          <LoadingScreen /> // Show the loading component while loading
        ) : (
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        >
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
        )}
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
