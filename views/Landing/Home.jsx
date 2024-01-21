import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Image, Modal, Alert, ScrollView, BackHandler, TouchableHighlight } from 'react-native';
import Logo from '../../assets/logo/logo1.png';
import Iconn from 'react-native-vector-icons/MaterialCommunityIcons';
import LoadingScreen from '../LoadingScreen';
import { Header, Icon } from 'react-native-elements';
import Style from '../Style';
import DonutChart from './DonutChart';
import { axiosRequest } from '../../api_server/axios'
import axios from 'axios';
import UserContext from '../../api_server/context';
import YearPicker from '../YearPicker';
import LottieView from 'lottie-react-native';
import { ColorSpace } from 'react-native-reanimated';

const Home = ({ navigation }) => {

  const [isLoading, setIsLoading] = useState(true);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Income');
  const { context, setTotalIncome, setPdfPrint, delay, setDelay } = useContext(UserContext)
  const [chartloading, setChartLoading] = useState(false)
  const [ddate, setDdate] = useState([])
  const [page, setPage] = useState(0)
  const selectedDate = ddate[page]?.date || (ddate[0]?.date || null);
  const [expense, setExpense] = useState([])
  const [incomes, setIncomes] = useState([])

  const screenWidth1 = Dimensions.get('window').width;
  // console.log(screenWidth1)
  const viewWidthPercentage = 80;
  const viewWidth = (screenWidth1 * viewWidthPercentage) / 100;
  const { width } = Dimensions.get('window');
  const expenses = [
    {
      key: 'food',
      value: 500,
    },
    {
      key: 'utilities',
      value: 1500,
    },
    {
      key: 'transportation',
      value: 2000,
    },
    {
      key: 'school',
      value: 1000,
    },
    {
      key: 'gifts',
      value: 5000,
    },
    {
      key: 'entertainment',
      value: 3700,
    },

  ];

  const income = [
    {
      key: 'Online selling',
      value: 1000,
    },
    {
      key: 'Employment',
      value: 15000,
    },
    {
      key: 'Freelancing',
      value: 4000,
    },

  ];

  const handlePress = () => {
    const newpage = page + 1
    const backpage = 0
    setChartLoading(true)
    if (page === Object.keys(ddate).length - 1) {
      setPage(backpage)

      setTimeout(() => {
        setChartLoading(false)
        // if (!context.id) {
        //   navigation.navigate('Log in');
        // }
      }, 1000);

    } else {
      setPage(newpage);
      setTimeout(() => {
        setChartLoading(false)
        // if (!context.id) {
        //   navigation.navigate('Log in');
        // }
      }, 1000);
      // console.log(Object.keys(ddate).length)
    }

  };

  const handlePresslef = () => {
    const newpage = 0;  // Swap values
    const backpage = page - 1;  // Swap values
    setChartLoading(true)
    if (page === 0) {  // Adjust condition
      setPage(Object.keys(ddate).length - 1);

      setTimeout(() => {
        setChartLoading(false)
        // if (!context.id) {
        //   navigation.navigate('Log in');
        // }
      }, 1000);
    } else {
      setPage(backpage);
      setTimeout(() => {
        setChartLoading(false)
        // if (!context.id) {
        //   navigation.navigate('Log in');
        // }
      }, 1000);
      // console.log(Object.keys(ddate).length)
    }
  };
  const [availableYears, setAvailableYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());



  const filterAPI = () => {
    axiosRequest.get(`gabay/same/year/${context.id}/?year=${selectedYear}`)
      .then((response) => {
        const date = { ...response.data };
        // setDdate(date);
        // console.log(response.data)
        // // Extract the unique years from the expenses data
        const uniqueYears = Array.from(new Set(Object.keys(date).map((key) => new Date(date[key].date).getFullYear())));
        setAvailableYears(uniqueYears);
        setSelectedYear(uniqueYears[0])
        console.log(response.data == '')
        if (response.data == '') {
          setAvailableYears([])
          setSelectedYear([])
        }


      })
      .catch((e) => {
        console.log(e);
      });
  }



  const api = () => {
    if (selectedYear != '') {
      axiosRequest.get(`gabay/same/month/year/${context.id}/?year=${selectedYear}`)
        .then((response) => {
          const date = { ...response.data };
          setDdate(date);

          // console.log("api",response.data)
          // // Extract the unique years from the expenses data
          // const uniqueYears = Array.from(new Set(Object.keys(date).map((key) => new Date(date[key].date).getFullYear())));
          // setAvailableYears(uniqueYears);
        })
        .catch((e) => {
          console.log(e, "api");
          Alert.alert("Network Error", "Check Your Internet Connection and Try Again",
            [
              {
                text: "Reload",
                onPress: () => { api() }
                ,
                style: "yes"
              }, {
                text: "Exit",
                onPress: () => {
                  BackHandler.exitApp()
                }
                ,
                style: "cancel"
              }
            ]
          )
        });
    }
  };

  const getData = (pagess) => {
    if (availableYears != '') {
      axiosRequest.get(`gabay/page/${context.id}/?date=${Object.keys(ddate).length > 0 ? pagess : null}&page=1&year=${selectedYear}`)
        .then((response) => {
          setExpense(response.data);
          // console.log("ddate",ddate);
          // console.log(ddate)
          setIsLoading(false);
          // api()
        })
        .catch((e) => {
          console.log("errer", e);
          setExpense(null)
          // console.log(ddate)
          setChartLoading(true)
          Alert.alert("Network Error", "Check Your Internet Connection and Try Again",
            [
              {
                text: "Reload",
                onPress: () => getData(pagess)
                ,
                style: "yes"
              }, {
                text: "Exit",
                onPress: () => {
                  BackHandler.exitApp()
                }
                ,
                style: "cancel"
              }
            ]
          )
        })
    } else { setExpense([]) }
  };

  const getIncome = () => {
    axiosRequest.get(`gabay/user/income/?user=${context.id}`).then((response) => {
      setIncomes(response.data)
      setTotalIncome(response.data.total_amount)
      // console.log(response.data) 
      if (!response.data.total_amount) {
        navigation.navigate("Incomes")
      }


      setIsLoading(false);

    }).catch((e) => {
      // alert("Check your internet connection!")
      Alert.alert("Network Error", "Check Your Internet Connection and Try Again",
        [
          {
            text: "Reload",
            onPress: () => {
              getIncome()
              api()
              filterAPI()
            }
            ,
            style: "yes"
          }, {
            text: "Exit",
            onPress: () => {
              BackHandler.exitApp()
            }
            ,
            style: "cancel"
          }
        ]
      )

    })
  }

  useEffect(() => {

  }, [])


  useEffect(() => {



    if (Object.keys(availableYears).length > 0 && selectedYear != '') {
      api()

    }




    const onFocus = () => {
      setPage(0)
      if (Object.keys(availableYears).length > 0) {
        setSelectedYear(availableYears[0])
        console.log(selectedYear)

      }

      filterAPI()
      getIncome()
      // setPdfPrint(null)
      setDelay(true)



      if (selectedDate && selectedYear != '') {
        getData(selectedDate);
        // console.log(availableYears[0])
        if (Object.keys(availableYears).length > 0) {
          setSelectedYear(availableYears[0])

        }
      }

    };




    const unsubscribe = navigation.addListener('focus', onFocus);

    return () => {
      unsubscribe();

    };
  }, [navigation, chartloading, page, availableYears, selectedYear]);


  useEffect(() => {
    // console.log(page); // Log the updated page value separately
    // api()
    // setPage(0)
    const selectedDate = (ddate[page]?.date || ddate[0]?.date || null);
    if (selectedDate && selectedYear != '') {
      getData(selectedDate);
      // console.log(selectedDate)
      // console.log(selectedDate)
      // if(Object.keys(availableYears).length > 0){
      //   setSelectedYear(availableYears[0])
      //   console.log(availableYears[0])
      // } 
      // console.log(incomes.total_amount)
    } else { }
    // console.log(ddate)  


  }, [navigation, chartloading, ddate, page, availableYears, selectedYear]);

  useEffect(() => { setPage(0) }, [selectedYear])

  const toggleOption = () => {
    setSelectedOption(selectedOption === 'Income' ? 'Expenses' : 'Income');
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [randomQuote, setRandomQuote] = useState('');

 

  const getRandomQuote = async() => {
    // const randomIndex = Math.floor(Math.random() * dailyQuotes.length);
    // setRandomQuote(dailyQuotes[randomIndex]);
    await axios.get('https://api.api-ninjas.com/v1/quotes?category=money',{headers : {'X-Api-Key' : `dAu+aBtDqzRCXJgrJH35vA==9a6EamyE3Wfsi9sA`}}).
    then((response)=>{

      console.log(response.data)
      setRandomQuote(`${response.data[0]?.quote} 
       
      -${response.data[0]?.author}`);
    }).catch((e)=>{
      Alert.alert("Error Occured", "Check Your Internet Connection and Try Again",
        [
          {
            text: "Reload",
            onPress: () => { getRandomQuote() }
            ,
            style: "yes"
          }, {
            text: "Exit",
            onPress: () => {
              setIsModalVisible(false)
            }
            ,
            style: "cancel"
          }
        ]
      )
    })
  };

  useEffect(() => {

    setTimeout(() => {
      setIsModalVisible(true); 
    }, 1000);
    getRandomQuote();
    
  }, []);

  return (

    <View style={Style.common}>
      {isLoading ? (
        <LoadingScreen />
      ) : (

        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <View style={styles.lottie}>
                  <LottieView
                    source={require('../../assets/onboarding/quotes.json')}
                    autoPlay
                    loop
                  />
                </View>
                <Text style={styles.modalText}>{randomQuote}</Text>
                <TouchableHighlight
                  style={{ position: 'absolute', top: 10, right: 10, }}
                  onPress={() => {
                    setIsModalVisible(!isModalVisible);
                  }}>
                  <Image source={require('../../assets/x.png')} style={{ height: 30, width: 30, }} resizeMode='contain' />
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
          <View style={Style.glass}>
            <View style={{ alignItems: 'center', backgroundColor: '#E3B448', borderRadius: 5 }}>
              <Text style={{ color: '#144714', fontSize: 25 }}>HISTORY</Text>
            </View>

            <View style={{ marginTop: 5, alignItems: 'center', width: '100%', backgroundColor: '#2C702B', padding: 5, borderRadius: 5, borderWidth: 1, borderColor: 'transparent', }}>
              <View style={{ width: '100%', flexDirection: 'row', borderBottomWidth: .5, alignItems: 'center', borderColor: '#144714', justifyContent: 'center' }}>

                <Text style={{ color: '#CBD18F', fontSize: 20 }}> ₱ {incomes.total_amount ? incomes.total_amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : "00"}.00 </Text>
              </View>
              <Text style={{ color: '#E3B448', fontSize: 12 }}>Monthly income</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 2, maxWidth: '100%' }}>

              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 5, backgroundColor: '#CBD18F', borderRadius: 5, marginHorizontal: 10, marginRight: 30 }}>
                <Text style={{ fontSize: 20, color: '#144714', width: '100%', textAlign: 'center' }}>{selectedOption}</Text>
              </View>

              <View>
                <TouchableOpacity onPress={toggleOption} style={{ right: 7 }}>
                  <Iconn name="swap-vertical-circle-outline" style={{ fontSize: 40, color: '#E3B448', }} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {selectedOption === 'Income' && (

            <View style={{ top: 5, backgroundColor: '#CBD18F', paddingHorizontal: 10, marginHorizontal: 10, borderRadius: 10, }}>
              {expense != "" && <View style={{ padding: 10, }}>
                <View style={{ borderWidth: .5, borderRadius: 10, }}>
                  <YearPicker
                    selectedYear={selectedYear}
                    onYearChange={setSelectedYear}
                    years={availableYears}
                    onBlur={() => setSelectedYear(selectedYear)}
                  />
                </View>
              </View>}
              {Object.keys(ddate).length && expense != "" ? <View >
                <View style={{ top: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, textAlign: 'center', }}>

                  {Object.keys(ddate).length > 1 && <TouchableOpacity onPress={handlePress}>
                    <Iconn name='arrow-left-thick' style={{ fontSize: 30, color: '#144714' }} />
                  </TouchableOpacity>}
                  <Text style={{ fontSize: 20, color: '#144714', textAlign: 'center', flex: 1 }}>{Object.keys(ddate).length > 0 ? new Date(ddate[page]?.date ? ddate[page].date : ddate[0].date).toLocaleString('default', { month: 'long' }) : null}</Text>
                  {Object.keys(ddate).length > 1 && <TouchableOpacity onPress={handlePresslef
                  }>
                    <Iconn name='arrow-right-thick' style={{ fontSize: 30, color: '#144714' }} />
                  </TouchableOpacity>}
                </View>

                <View style={{ padding: 18.8, top: -15, }}>
                  {chartloading ? <View style={{ justifyContent: 'space-evenly', alignItems: 'center', padding: 10, width: '100%', marginBottom: -16.8 }}>
                    <Image source={require('../../assets/logo/logo1.png')} style={{ top: -20, opacity: 0.3, width: 170 }} resizeMode='contain' />
                    {/* <LoadingScreen/> */}
                  </View> : expense ? <DonutChart data={expense} total_sum={incomes.total_amount} /> : null}

                </View>
                <View style={{ marginBottom: -10 }}>
                  <TouchableOpacity style={{ bottom: 20, backgroundColor: '#A2A869', paddingVertical: 10, width: '100%', paddingHorizontal: 30, borderRadius: 5, alignSelf: 'center', alignItems: 'center', }} onPress={() => { navigation.navigate('Expenses', { expense: expense, date: Object.keys(ddate).length > 0 ? new Date(ddate[page].date).toLocaleString('default', { month: 'long' }) : console.log(ddate) }) }}>
                    <Text style={{ color: '#144714', fontSize: 18, }}>View details</Text>
                  </TouchableOpacity>
                </View>
              </View> : <View style={{ justifyContent: 'space-evenly', alignItems: 'center', padding: 10, width: '100%' }}>
                <Image source={require('../../assets/logo/logo1.png')} style={{ top: 20, opacity: 0.3, width: 170 }} resizeMode='contain' />
                <Text style={{ fontSize: 24, fontWeight: '400', fontStyle: 'italic', marginTop: 60.5, color: '#144714', opacity: 0.3, letterSpacing: 2, textAlign: 'center' }}>

                  No History
                </Text>
              </View>}
            </View>

          )}
          {selectedOption === 'Expenses' && (
            <View style={{ top: 5, backgroundColor: '#CBD18F', paddingHorizontal: 10, marginHorizontal: 10, borderRadius: 10, }}>
              <View style={{ top: 10, alignItems: 'center' }}>

                <Text style={{ fontSize: 20, color: '#144714' }}>Income</Text>

              </View>
              <View style={{ padding: 20, top: -10 }}>
                <DonutChart data={incomes.data} />
              </View>
              <TouchableOpacity style={{ bottom: 10, backgroundColor: '#A2A869', paddingVertical: 10, width: '100%', paddingHorizontal: 30, borderRadius: 5, alignSelf: 'center', alignItems: 'center', }} onPress={() => { navigation.navigate('Income', { income: incomes.data }) }}>
                <Text style={{ color: '#144714', fontSize: 18, }}>View details</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

      )}
    </View>



  );
};

// Home.navigationOptions
export default Home;

const styles = {
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  modalContent: {
    backgroundColor: '#E3B448',
    padding: 10,
    borderRadius: 10,
    width: '90%',
    opacity: 0.95
  },
  modalText: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#144714',
  },

  lottie: {
    // backgroundColor: 'red',
    alignSelf: 'center',
    bottom: 50,
    width: '100%',
    height: '50%',
  },

};