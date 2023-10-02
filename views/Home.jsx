import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView } from 'react-native'
import LoadingScreen from './LoadingScreen'


const Home = () => {
  const [isLoading, setIsLoading] = useState(true); // Initial loading state

  useEffect(() => {
    // Simulate loading delay (you can replace this with your actual loading logic)
    setTimeout(() => {
      setIsLoading(false); // Set loading state to false after the delay
    }, 3000); // Adjust the delay time as needed
  }, []);

  return (
    
    <SafeAreaView style={{ flex: 1, backgroundColor: '#3A6B35' }}>
      {isLoading ? (
          <LoadingScreen /> // Show the loading component while loading
        ) : (
      <View>
      
      <Text>Home</Text>
        </View>
        )}
    </SafeAreaView>
  )
}

export default Home