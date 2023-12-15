import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, Modal,Linking } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import Style from '../Style'
import CustomInput from '../CustomInput'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation,useIsFocused } from '@react-navigation/native'
import DonutChart from './DonutChart'
import { axiosRequest, server } from '../../api_server/axios';
import UserContext from '../../api_server/context';
import Loader from '../Starting/actionLoader';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ModalMessageE from '../ModalE';
import ModalMessage from '../Modal';
import i from '../../assets/Icon/Icons/Savings.png'
// import fileDownload from 'js-file-download';
// import RNFetchBlob from 'rn-fetch-blob';

const ForecastSavings = ({navigation}) => {
  // const navigation = useNavigation()
  const isFocused = useIsFocused();
  const screenWidth = Dimensions.get('window').width;
  const margin = screenWidth === 360 ? 5 : 2.2;
  const [showModalEMessage, setShowModalEMessage] = useState(false);
  const [income, setIncome] = useState(null)
  const [incomeError, setIncomeError] = useState(null)
  const [selectedOption, setSelectedOption] = useState('Year');
  const [forecast, setForcast] = useState([])
  const { context, totalincome,pdfprint,setPdfPrint,delay,setDelay } = useContext(UserContext)
  const [value, setValue] = useState(null)
  const [isLoading, setIsLoading] = useState(false);
  const [isPDFModalVisible, setIsPDFModalVisible] = useState(false);
  const [loader,setLoader] = useState(false)
  const [showModalMessage, setShowModalMessage] = useState(false);

  const Download = server+`gabay/transaction-data/${context.id}/?no_months_to_predict=${income}&income=${totalincome}&period=${selectedOption}&choice=PDF`

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };
  const handleIncomeChange = (text) => {
    // Clear existing errors
    setIncomeError(null)

    // Remove non-digit characters
    const numericValue = text.replace(/[^0-9]/g, '')

    // Format the numeric value with commas
    const formattedIncome = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

    setIncome(formattedIncome)
  }

  const toggleModal1 = () => {
    setPdfPrint(!pdfprint)
  };

  const handlePDF = async() => {
   
      setTimeout(() => {
        Linking.openURL(server+`gabay/transaction-data/${context.id}/?no_months_to_predict=${income}&income=${totalincome}&period=${selectedOption}&choice=PDF`)
        setIsLoading(false); 
        
      }, 1000);

   
  };
  const handlePDFConfirmed = async () => {
    toggleModal1(); // Close the logout modal
    setLoader(true); // Show the loading indicator
  
    // Simulate an asynchronous logout process
    await new Promise(resolve => setTimeout(resolve, 5000)); // Replace this with your actual logout logic
  
    // Once the logout process is complete, navigate to the login screen and hide the loader
    handlePDF(); 
    setLoader(false);
    navigateToScreen('Forecast Savings');
    // setShowModalMessage(true);
    setTimeout(() => setShowModalMessage(false), 500);
  };
  const history = [
    {
      key: 'January',
      value: 2000,
    },
    {
      key: 'February',
      value: 5000,
    },
    {
      key: 'March',
      value: 2500,
    },
    {
      key: 'April',
      value: 9000,
    },
    {
      key: 'May',
      value: 1500,
    },

  ];
  const toggleOption = () => {
    setSelectedOption(selectedOption === 'Year' ? 'Month' : 'Year');
  };

  const Forecast = async () => {
    setIsLoading(true);
    
    axiosRequest.get(`gabay/transaction-data/${context.id}/?no_months_to_predict=${income}&income=${totalincome}&period=${selectedOption}`)
      .then((response) => {
        setTimeout(() => {
          data = response.data.avarage
          setForcast(data)
          setValue(response.data.forecast)
          // setPdfPrint(true)
          console.log(pdfprint)
          console.log(response.data.forecast)

          setIsLoading(false);
        }, 3000);

      }).catch(e => {
        setIsLoading(false);
        setShowModalEMessage(true);
        setTimeout(() => setShowModalEMessage(false), 500);
      })


  }

  useEffect(() => {
    const onFocus = async () => {
   if(Object.keys(forecast).length){
    setDelay(false)
    // console.log(forecast)
   }else{
 
   }
  }
  if(Object.keys(forecast).length){
    setDelay(false)
    // console.log(forecast)
   }else{
 
   }

  const unsubscribe = navigation.addListener('focus', onFocus);
   return () => {
     unsubscribe();

   };
  }, [forecast]);

  return (
    <View style={Style.common}>
      <Loader visible={isLoading} message="Analyzing Data..." />
      <Loader visible ={loader} message="Generating PDF..."/>
      <View style={{ marginBottom: 20, }}>
        <View
          style={{
            top: 10,
            alignSelf: 'center',
            backgroundColor: '#2b5127',
            paddingTop: 5,
            paddingHorizontal: 20,
            borderRadius: 5,
            width: '80%'
          }}
        >
          <CustomInput
            iconName="calendar"
            placeholder={selectedOption}
            keyboardType="numeric"
            value={income}
            onChangeText={handleIncomeChange}
            error={incomeError}
            onFocus={() => {
              setIncomeError(null)
            }}
          />
          <View style={{ top: -10, flexDirection: 'row', justifyContent: 'space-evenly', }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignItems: 'center', }}>
              <Text style={{ textAlign: 'center', color: '#E3B448', width: "100%", }}>{selectedOption}</Text>
            </View>
            <View>
              <TouchableOpacity onPress={toggleOption}>
                <Icon name="swap-vertical-circle-outline" style={{ fontSize: 20, color: '#E3B448', right: 5, }} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          alignItems: 'center',
          alignSelf: 'center',
          width: '100%',
          paddingHorizontal: 20,
        }}
      >
        <View style={{ width: '45%' }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#A2A869',
              padding: 10,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}
            onPress={Forecast}
          >
            <Text style={{ color: '#144714', fontSize: 18, }}>Forecast</Text>
          </TouchableOpacity>
        </View>

      </View>
      <View style={{ top: 0, borderBottomWidth: 1, borderTopWidth: 1, borderColor: '#144714', margin: 10, alignItems: 'center', padding: 5, }}>
        <Text style={{ color: '#E3B448', fontSize: 21, }}>Predicted Savings</Text>
      </View>
      <View style={{ backgroundColor: '#CBD18F', paddingHorizontal: 10, marginHorizontal: 10, borderRadius: 10, }}>

        {Object.keys(forecast).length ?

          <View>
            {/* <TouchableOpacity  onPress={toggleModal1}>
            <View style={{ flex: 1, position: 'absolute', right: -5, padding: 5 }}>
              <MaterialCommunityIcons name="content-save-outline" size={30} color="#144714" />
            </View>
            </TouchableOpacity> */}
            <Modal
        animationType="fade"
        transparent={true}
        visible={pdfprint}
        onRequestClose={toggleModal1}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Do you want to save it to PDF file?</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.yesButton} onPress={handlePDFConfirmed}>
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.noButton} onPress={toggleModal1}>
                <Text style={styles.buttonText2}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
            <View style={{ padding: 18.8, marginBottom: 20, }}>
              <DonutChart data={forecast} predict={value} />

            </View>

            <TouchableOpacity style={{ bottom: 10, backgroundColor: '#A2A869', paddingVertical: 10, width: '100%', paddingHorizontal: 30, borderRadius: 5, alignSelf: 'center', alignItems: 'center' }} onPress={() => { 
              
              navigation.navigate('History', { details: forecast }) }}>
              <Text style={{ color: '#144714', fontSize: 18, }}>View details</Text>
            </TouchableOpacity>
          </View> : <View style={{ justifyContent: 'space-evenly', alignItems: 'center', paddingBottom: 13, width: '100%' }}>
            <Image source={require('../../assets/logo/logo1.png')} style={{ top: 20, opacity: 0.3, width: 170 }} resizeMode='contain' />
            <Text style={{ fontSize: 24, fontWeight: '400', fontStyle: 'italic', marginTop: 60.5, color: '#144714', opacity: 0.3, letterSpacing: 2, textAlign: 'center' }}>

              Start Forecasting!
            </Text>
          </View>}
      </View>
      <ModalMessageE showAutomatically={showModalEMessage} message="Something went wrong!" icon={<MaterialIcons name="warning" size={200} color="#810000" />} navigateToScreen="" />
      <ModalMessage showAutomatically={showModalMessage} message="Download completed!" icon={<MaterialCommunityIcons name="file-download-outline" size={200} color="#CBD28F" />} navigateToScreen=""/>
    </View>
  )
}
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
export default ForecastSavings