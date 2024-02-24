import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, Modal, Linking } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import Style from '../Style'
import { Picker } from '@react-native-picker/picker';
import CustomInput from '../CustomInput'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useIsFocused } from '@react-navigation/native'
import DonutChart from './DonutChart'
import { axiosRequest, server } from '../../api_server/axios';
import UserContext from '../../api_server/context';
import Loader from '../Starting/actionLoader';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ModalMessageE from '../ModalE';
import ModalMessage from '../Modal';
import i from '../../assets/Icon/Icons/Savings.png'
import GSC2 from './GSC2';
// import fileDownload from 'js-file-download';
// import RNFetchBlob from 'rn-fetch-blob';

const ForecastSavings = ({ navigation }) => {
  // const navigation = useNavigation()
  const isFocused = useIsFocused();
  const screenWidth = Dimensions.get('window').width;
  const margin = screenWidth === 360 ? 5 : 2.2;
  const [showModalEMessage, setShowModalEMessage] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [income, setIncome] = useState(null)
  const [incomeError, setIncomeError] = useState(null)
  const [selectedOption, setSelectedOption] = useState('Year');
  const [forecast, setForcast] = useState([])
  const [predict,setPredict] =useState([])
  const { context, totalincome, pdfprint, setPdfPrint, delay, setDelay,fixedsavings } = useContext(UserContext)
  const [value, setValue] = useState(null)
  const [select,setSelect] = useState(null)
  const [savings,setSavings] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [isPDFModalVisible, setIsPDFModalVisible] = useState(false);
  const [loader, setLoader] = useState(false)
  const [showModalMessage, setShowModalMessage] = useState(false);
  const [selectedOption1, setSelectedOption1] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [previousMonthsVisible, setPreviousMonthsVisible] = useState(false);
  const [selectedPreviousMonth, setSelectedPreviousMonth] = useState(null);
  const [selectedPreviousYearVisible, setSelectedPreviousYearVisible] = useState(null);
  const [selectedOverallVisible, setSelectedOverallVisible] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [applyButtonDisabled, setApplyButtonDisabled] = useState(true);
  const [applyButtonDisabled1, setApplyButtonDisabled1] = useState(true);
  const Download = server + `gabay/transaction-data/${context.id}/?no_months_to_predict=${income}&income=${fixedsavings}&period=${selectedOption}&choice=PDF`

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
  useEffect(() => {
    // Enable the Apply button if both year and month are selected
    setApplyButtonDisabled(!selectedYear || !selectedPreviousMonth);
  }, [selectedYear, selectedPreviousMonth]);

  useEffect(() => {
    // Enable the Apply button if both year and month are selected
    setApplyButtonDisabled1(!selectedYear);
  }, [selectedYear]);

  const handleApplySelection = (freq) => {
    console.log(selectedYear)
    setLoader(true);
    setPdfPrint(!pdfprint);
    setTimeout(() => {
      Linking.openURL(server + `gabay/generate-pdf/${context.id}/?year=${selectedYear}&month=${selectedPreviousMonth}&freq=${freq}`)
      setLoader(false);
      setIsModalVisible(false)
    }, 1000);

  };
  const toggleModal1 = () => {
    console.log('Before toggle:', pdfprint);
    setPdfPrint(!pdfprint);
    console.log('After toggle:', !pdfprint);
  };
  const [availableYears, setAvailableYears] = useState([]);
  const [availableMonth, setAvailableMonth] = useState({});

  
  const toggleModal = (option) => {
    setSelectedOption1(option);
    setIsModalVisible(!isModalVisible);
    setPreviousMonthsVisible(false);
    setSelectedPreviousYearVisible(false);
    setSelectedOverallVisible(false);

    const filterAPI = () => {
      axiosRequest.get(`gabay/same/year/${context.id}/?year=${selectedYear}`)
        .then((response) => {
          const date = { ...response.data };
          // setDdate(date);
           console.log(response.data)
          // // Extract the unique years from the expenses data
          const uniqueYears = Array.from(new Set(Object.keys(date).map((key) => new Date(date[key].date).getFullYear())));
          setAvailableYears(uniqueYears);
  
        })
        .catch((e) => {
          console.log(e);
        });
    }



    if (option === 'Monthly') {
      setPreviousMonthsVisible(true);
      filterAPI()
    } else if (option === 'Yearly') {
      setSelectedPreviousYearVisible(true);


      filterAPI()
    } else if (option === 'Overall') {
      // Set the state to show the pdfprint modal
      setSelectedOverallVisible(true);
    }
  }

  const filterAPmonth = (year) => {
    axiosRequest.get(`gabay/same/month/year/${context.id}/?year=${year}`)
      .then((response) => {
        // setDdate(date);
         console.log(response.data)
         data = response.data
        // // Extract the unique years from the expenses data
        // const uniqueYears = Array.from(new Set(Object.keys(date).map((key) => new Date(date[key].date).getFullYear())));
        setAvailableMonth(data);
        console.log(data);

      })
      .catch((e) => {
        console.log(availableMonth);
      });
  }
  const getLastDayOfMonth = (year, month) => new Date(year, month + 1, 0);
  const currentDate = new Date();
  const currentMonthIndex = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Calculate previous months
  const previousMonths = [];
  // for (let i = 0; i < currentMonthIndex; i++) {
  //   const lastDayOfMonth = new Date(selectedYear, i + 1, 0);
  //   const formattedDate = `${lastDayOfMonth.getFullYear()}-${String(lastDayOfMonth.getMonth() + 1).padStart(2, '0')}-${String(lastDayOfMonth.getDate()).padStart(2, '0')}`;
  //   previousMonths.push(formattedDate);
  // }
  if (currentYear !== selectedYear) {
    // Push all months for the previous year
    for (let i = 0; i < 12; i++) {
      const lastDayOfMonth = new Date(selectedYear, i + 1, 0);
      const formattedDate = `${lastDayOfMonth.getFullYear()}-${String(lastDayOfMonth.getMonth() + 1).padStart(2, '0')}-${String(lastDayOfMonth.getDate()).padStart(2, '0')}`;
      previousMonths.push(formattedDate);
    }
  } else {
    // Push previous months of the current year up to the current month
    for (let i = 0; i < currentMonthIndex; i++) {
      const lastDayOfMonth = new Date(currentYear, i + 1, 0);
      const formattedDate = `${lastDayOfMonth.getFullYear()}-${String(lastDayOfMonth.getMonth() + 1).padStart(2, '0')}-${String(lastDayOfMonth.getDate()).padStart(2, '0')}`;
      previousMonths.push(formattedDate);
    }
  }
  const handlePDF = async () => {

    setTimeout(() => {
      Linking.openURL(server + `gabay/transaction-data/${context.id}/?no_months_to_predict=${income}&income=${fixedsavings}&period=${selectedOption}&choice=PDF`)
      setIsLoading(false);

    }, 1000);


  };
  const handlePDFConfirmed = async () => {
    toggleModal1(); // Close the logout modal
    toggleModal();
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

  const opencalc = () => {
    navigation.navigate('Savings Calculator')
  }
  const Forecast = async () => {
    setIsLoading(true);

    axiosRequest.get(`gabay/transaction-data/${context.id}/?no_months_to_predict=${income}&income=${fixedsavings}&period=${selectedOption}`)
      .then((response) => {
        setTimeout(() => {
          data = response.data.avarage
          savings_data = response.data.saving_description
          setSavings(savings_data)
          setForcast(data)
          setPredict(data)
          setSelect(response.data.forecast)
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
      if (Object.keys(forecast).length) {
        setDelay(false)
        // console.log(forecast)
      } else {

      }
    }
    if (Object.keys(forecast).length) {
      setDelay(false)
      // console.log(forecast)
    } else {

    }

    const unsubscribe = navigation.addListener('focus', onFocus);
    return () => {
      unsubscribe();

    };
  }, [forecast]);

  return (
    <View style={Style.common}>
      <Loader visible={isLoading} message="Analyzing Data..." />
      <Loader visible={loader} message="Generating PDF..." />
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
          <View style={{ top: -10, flexDirection: 'row', justifyContent: 'space-evenly',}}>
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
          width: '80%',
          
          paddingHorizontal: 0,
          flexDirection: 'row',
          justifyContent: 'space-evenly'
        }}
      >
        <View style={{ width: '50%'}}>
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
        <View style={{ position: 'absolute', right: 0}}>
        <TouchableOpacity style={{  justifyContent: 'flex-end',}} onPress={opencalc}>
          <Image
            source={require('../../assets/Icon/calculatore.png')}
            style={{ width: 30, height: 30 }}
            resizeMode="contain"
          />
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
              animationType="slide"
              transparent={true}
              visible={pdfprint}
              onRequestClose={toggleModal1}
            >
              <View style={Style.modalContainer}>
                <View style={Style.modalContent}>

                  <Text style={{ fontSize: 20, marginBottom: 20, color: '#E3B448', }}>What records and reports do you want to download?</Text>
                  <TouchableOpacity
                    style={Style.modalButton}
                    onPress={() => toggleModal('Monthly')}
                  >
                    <Text style={Style.modalButtonText}>Monthly</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={Style.modalButton}
                    onPress={() => toggleModal('Yearly')}
                  >
                    <Text style={Style.modalButtonText}>Yearly</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={Style.modalButton}
                    onPress={() => toggleModal('Overall')}
                  >
                    <Text style={Style.modalButtonText}>Overall</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[Style.modalButton, Style.modalCancelButton]}
                    onPress={toggleModal1}
                  >
                    <Text style={{ color: '#CBD18F', fontSize: 18, }}>Cancel</Text>
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
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginBottom: 20, }}>
                    <View style={{ borderWidth: .5, borderColor: '#144714', borderRadius: 10 }}>

                      <Picker
                        selectedValue={selectedYear}
                        style={{ height: 50, width: 150, color: '#144714', }}
                        onValueChange={(itemValue) => {setSelectedYear(itemValue)
                        filterAPmonth(itemValue)
                        }}
                      >

                        <Picker.Item label="Year" value={null} />
                        {/* {Array.from({ length: 5 }, (_, index) => {
                          const year = currentYear - index;
                          return <Picker.Item key={availableYears} label={availableYears.toString()} value={availableYears} />;
                        })} */}
                         {availableYears.map((year)=> (
                           <Picker.Item key={year} label={year.toString()} value={year} />
                        ))}
                      </Picker>
                    </View>
                    <View style={{ borderWidth: .5, borderColor: '#144714', borderRadius: 10 }}>
                      <Picker
                        selectedValue={selectedPreviousMonth}
                        style={{ height: 50, width: 150, color: '#144714' }}
                        onValueChange={(itemValue) => setSelectedPreviousMonth(itemValue)}
                      >
                        <Picker.Item label="Month" value={null} />
                        { availableMonth && Array.isArray(availableMonth) && availableMonth.map((month) => (
                          <Picker.Item key={month.date} label={new Date(month.date).toLocaleString('default', { month: 'long' })} value={month.date} />
                        ))}
                      </Picker>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={{
                      backgroundColor: applyButtonDisabled ? 'gray' : '#A2A869',
                      padding: 10,
                      borderRadius: 5,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      if (!applyButtonDisabled) {
                        handleApplySelection("Monthly"); // Function to handle applying the selection
                        setPreviousMonthsVisible(false);
                      }
                    }}
                    disabled={applyButtonDisabled}

                  >
                    <Text style={{ color: applyButtonDisabled ? '#E3B448' : '#144714', fontSize: 18 }}>Apply</Text>
                  </TouchableOpacity>
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
                    <Text style={{ color: '#CBD18F', fontSize: 18, }}>
                      Cancel
                    </Text>
                  </TouchableOpacity>

                </View>
              </View>
            </Modal>
            
            <Modal
              animationType="slide"
              transparent={true}
              visible={selectedPreviousYearVisible}
              onRequestClose={() => {
                setSelectedPreviousYearVisible(!selectedPreviousYearVisible);
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
                    Select Year:
                  </Text>
                  <View style={{ flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-between', marginBottom: 20, borderWidth: .5, borderColor: '#144714', borderRadius: 10, }}>

                    <Picker
                      selectedValue={selectedYear}
                      style={{ height: 50, width: '100%', color: '#144714', }}
                      onValueChange={(itemValue) => setSelectedYear(itemValue)}
                      dropdownIconColor={'red'}
                    >
                      <Picker.Item label="Year" value={null} />
                      {availableYears.map((year)=> (
                           <Picker.Item key={year} label={year.toString()} value={year} />
                        ))}
                    </Picker>

                  </View>
                  <TouchableOpacity
                    style={{
                      backgroundColor: applyButtonDisabled1 ? 'gray' : '#A2A869',
                      padding: 10,
                      borderRadius: 5,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      if (!applyButtonDisabled1) {
                        handleApplySelection("Yearly"); // Function to handle applying the selection
                        setSelectedPreviousYearVisible(false);
                      }
                    }}
                    disabled={applyButtonDisabled1}

                  >
                    <Text style={{ color: applyButtonDisabled1 ? '#E3B448' : '#144714', fontSize: 18 }}>Apply</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#810000',
                      padding: 10,
                      borderRadius: 5,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 10,
                    }}
                    onPress={() => setSelectedPreviousYearVisible(false)}
                  >
                    <Text style={{ color: '#CBD18F', fontSize: 18, }}>
                      Cancel
                    </Text>
                  </TouchableOpacity>

                </View>
              </View>
            </Modal>
            <Modal
              animationType="slide"
              transparent={true}
              visible={selectedOverallVisible}
              onRequestClose={() => {
                setSelectedOverallVisible(!selectedOverallVisible);
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
                    Do you want to download the overall records and reports?
                  </Text>
                  
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#CBD18F',
                      padding: 10,
                      borderRadius: 5,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 10,
                    }}
                    onPress={handlePDFConfirmed}
                  >
                    <Text style={{ color: '#144714', fontSize: 18, }}>
                      Yes
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#810000',
                      padding: 10,
                      borderRadius: 5,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 10,
                    }}
                    onPress={() => setSelectedOverallVisible(false)}
                  >
                    <Text style={{ color: '#CBD18F', fontSize: 18, }}>
                      Cancel
                    </Text>
                  </TouchableOpacity>

                </View>
              </View>
            </Modal>
            <View style={{ top: -5, padding: 18.8, paddingHorizontal: 10, marginBottom: 10, }}>
            <View style={{borderWidth: .5, borderRadius: 10,}}>
            <Picker
                      selectedValue={value}
                      style={{ height: 50, width: '100%', color: '#144714', }}
                      onValueChange={(itemValue) => {
                        setValue(itemValue)
                        if (itemValue != select){
                          setPredict(savings)
                          console.log(itemValue)
                        }else{
                          setPredict(forecast)
                        }
                      }}
                    >
                      <Picker.Item label="Overall" value={select} />
                      {savings.map((description)=> (
                           <Picker.Item key={description} label={description.key} value={description.value} />
                        ))}
                    </Picker>
                    </View>
              <DonutChart data={predict} predict={value} />

            </View>
            <View style={{marginBottom: -10}}>
            <TouchableOpacity style={{ bottom: 20, backgroundColor: '#A2A869', paddingVertical: 10, width: '100%', paddingHorizontal: 30, borderRadius: 5, alignSelf: 'center', alignItems: 'center' }} onPress={() => {

              navigation.navigate('History', { details: predict })
            }}>
              <Text style={{ color: '#144714', fontSize: 18, }}>View details</Text>
            </TouchableOpacity>
            </View>
          </View> : <View style={{ justifyContent: 'space-evenly', alignItems: 'center', paddingBottom: 13, width: '100%' }}>
            <Image source={require('../../assets/logo/logo1.png')} style={{ top: 20, opacity: 0.3, width: 170 }} resizeMode='contain' />
            <Text style={{ fontSize: 24, fontWeight: '400', fontStyle: 'italic', marginTop: 60.5, color: '#144714', opacity: 0.3, letterSpacing: 2, textAlign: 'center' }}>

              Start Forecasting!
            </Text>
          </View>}
      </View>
      <ModalMessageE showAutomatically={showModalEMessage} message="Something went wrong!" icon={<MaterialIcons name="warning" size={200} color="#810000" />} navigateToScreen="" />
      <ModalMessage showAutomatically={showModalMessage} message="Download completed!" icon={<MaterialCommunityIcons name="file-download-outline" size={200} color="#CBD28F" />} navigateToScreen="" />
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