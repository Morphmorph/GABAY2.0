import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Image, Modal, ScrollView, BackHandler } from 'react-native';
import Logo from '../../assets/logo/logo1.png';
import Peso from '../../assets/Icon/peso.png'
import Iconn from 'react-native-vector-icons/MaterialCommunityIcons';
import LoadingScreen from '../LoadingScreen';
import { Header, Icon } from 'react-native-elements';
import Style from '../Style';
import DonutChart from './DonutChart';
import { axiosRequest } from '../../api_server/axios'
import UserContext from '../../api_server/context';
const Home = ({ navigation }) => {

  const [isLoading, setIsLoading] = useState(true);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Income');
  const { context,setTotalIncome } = useContext(UserContext)
  const [ddate, setDdate] = useState([])
  const [page, setPage] = useState(0)
  const [expense, setExpense] = useState([])
  const [incomes, setIncomes] = useState([])

  const screenWidth1 = Dimensions.get('window').width;
  // console.log(screenWidth1)
  const viewWidthPercentage = 80;
  const viewWidth = (screenWidth1 * viewWidthPercentage) / 100;
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
    if (page === Object.keys(ddate).length - 1) {
      setPage(backpage)
    } else {
      setPage(newpage);
      // console.log(Object.keys(ddate).length)
    }

  };

  const api = () => {
    axiosRequest.get(`gabay/same/month/year/${context.id}/`)
      .then((response) => {
        const date = { ...response.data };
        setDdate(date);
        // console.log(ddate);
        console.log(context);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getData = (pagess) => {
    axiosRequest.get(`gabay/page/${context.id}/?date=${Object.keys(ddate).length > 0 ? pagess : null}&page=1`).then((response) => {
      setExpense(response.data)
    }).catch((e) => {
      console.log(e)
    })
  }

  const getIncome = () => {
    axiosRequest.get(`gabay/user/income/?user=${context.id}`).then((response) => {
      setIncomes(response.data)
      setTotalIncome(response.data.total_amount)
    }).catch((e) => {
      console.log(e)
    })
  }

  useEffect(() => {
    const onFocus = async () => {
      await api();
      getIncome()
      if (Object.keys(ddate).length > 0) {
        getData(Object.keys(ddate).length > 0 ? ddate[page].date : null)
      }

      setTimeout(() => {
        setIsLoading(false);
        // if (!context.id) {
        //   navigation.navigate('Log in');
        // }
      }, 3000);
    };

    const unsubscribe = navigation.addListener('focus', onFocus);

    return () => {
      unsubscribe();

    };
  }, [navigation, context, page, expense]);

  useEffect(() => {
    // console.log(page); // Log the updated page value separately
    if (Object.keys(ddate).length > 0) {
      getData(Object.keys(ddate).length > 0 ? ddate[page].date : null)
    }


  }, [page, ddate]);

  const toggleOption = () => {
    setSelectedOption(selectedOption === 'Income' ? 'Expenses' : 'Income');
  };

  return (

    <View style={Style.common}>

      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <View>

            <View style={Style.glass}>
              <View style={{ alignItems: 'center', backgroundColor: '#E3B448', borderRadius: 5 }}>
                <Text style={{ color: '#144714', fontSize: 25 }}>HISTORY</Text>
              </View>

              <View style={{ marginTop: 10, alignItems: 'center', width: '100%', backgroundColor: '#2C702B', padding: 5, borderRadius: 5, borderWidth: 1, borderColor: 'transparent', }}>
                <View style={{ width: '100%', flexDirection: 'row', borderBottomWidth: 1, alignItems: 'center', borderColor: '#144714', justifyContent: 'center' }}>
                  <Image source={Peso} style={{ width: 20, height: 20 }} />
                  <Text style={{ color: '#CBD18F', fontSize: 20 }}> {incomes.total_amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}.00</Text>
                </View>
                <Text style={{ color: '#E3B448', fontSize: 12 }}>Income</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',  marginTop: 5, maxWidth:'100%'}}>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 5, backgroundColor: '#CBD18F', borderRadius: 5,}}>
                <Text style={{ fontSize: 20, color: '#144714',width:'89%' ,textAlign:'center'}}>{selectedOption}</Text>
              </View>
              <View>
              <TouchableOpacity onPress={toggleOption} >
                <Iconn name="swap-vertical-circle-outline" style={{ fontSize: 40, color: '#E3B448', }} />
              </TouchableOpacity>
              </View>
              </View>
            </View>

            <View style={{ top: 30, paddingHorizontal: 10 }}>

            </View>

            {selectedOption === 'Income' && (

              <View style={{ top: 10, backgroundColor: '#CBD18F', paddingHorizontal: 10, marginHorizontal: 10, borderRadius: 10, }}>
                {Object.keys(ddate).length ? <View >
                  <View style={{ top: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }}>
                    <TouchableOpacity onPress={handlePress}>
                      <Iconn name='arrow-left-thick' style={{ fontSize: 30, color: '#144714' }} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 20, color: '#144714' }}>{Object.keys(ddate).length > 0 ? new Date(ddate[page].date).toLocaleString('default', { month: 'long' }) : console.log(ddate)}</Text>
                    <TouchableOpacity onPress={handlePress
                    }>
                      <Iconn name='arrow-right-thick' style={{ fontSize: 30, color: '#144714' }} />
                    </TouchableOpacity>
                  </View>

                  <View style={{ padding: 16.8, top: -10, }}>
                    <DonutChart data={expense} total_sum={incomes.total_amount} />

                  </View>
                  <TouchableOpacity style={{ bottom: 10, backgroundColor: '#A2A869', paddingVertical: 10, width: '100%', paddingHorizontal: 30, borderRadius: 5, alignSelf: 'center', alignItems: 'center', }} onPress={() => { navigation.navigate('Expenses', { expense: expense, date: Object.keys(ddate).length > 0 ? new Date(ddate[page].date).toLocaleString('default', { month: 'long' }) : console.log(ddate) }) }}>
                    <Text style={{ color: '#144714', fontSize: 18, }}>View details</Text>
                  </TouchableOpacity>
                </View> : <View style={{ justifyContent: 'space-evenly', alignItems: 'center', padding: 10, width: '100%' }}>
                  <Image source={require('../../assets/logo/logo1.png')} style={{ top: 20, opacity: 0.3, width: 170 }} resizeMode='contain' />
                  <Text style={{ fontSize: 24, fontWeight: '400', fontStyle: 'italic', marginTop: 60.5, color: '#144714', opacity: 0.3, letterSpacing: 2, textAlign: 'center' }}>

                    No History
                  </Text>
                </View>}
              </View>

            )}
            {selectedOption === 'Expenses' && (
              <View style={{ top: 10, backgroundColor: '#CBD18F', paddingHorizontal: 10, marginHorizontal: 10, borderRadius: 10, }}>
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


        </>
      )}

    </View>
  );
};

Home.navigationOptions
export default Home;

