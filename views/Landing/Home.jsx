import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Image, Modal, ScrollView,BackHandler} from 'react-native';
import Logo from '../../assets/logo/logo1.png';
import Peso from '../../assets/Icon/peso.png'
import Iconn from 'react-native-vector-icons/MaterialCommunityIcons';
import LoadingScreen from '../LoadingScreen';
import { Header, Icon } from 'react-native-elements';
import Style from '../Style';
import DonutChart from './DonutChart';
import randomColor from 'randomcolor';
import { axiosRequest} from '../../api_server/axios'
import UserContext from '../../api_server/context';
const Home = ({ navigation }) => {
  
  const [isLoading, setIsLoading] = useState(true);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Income');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAddOption, setSelectedAddOption] = useState('');
  const {context} = useContext(UserContext)
  const [ddate,setDdate] = useState([])
  const [page,setPage] = useState(0)
  const [expense,setExpense] = useState([])
  const [incomes,setIncomes] = useState([])
  // const iconPaths = [
  //   require('../../assets/Icon/Icons/c1.png'),
  //   require('../../assets/Icon/Icons/c2.png'),
  //   require('../../assets/Icon/Icons/c3.png'),
  //   require('../../assets/Icon/Icons/c4.png'),
  //   require('../../assets/Icon/Icons/c5.png'),
  //   require('../../assets/Icon/Icons/c6.png'),
  //   require('../../assets/Icon/Icons/c7.png'),
  //   require('../../assets/Icon/wants/w1.png'),
  //   require('../../assets/Icon/wants/w2.png'),
  //   require('../../assets/Icon/wants/w3.png'),
  //   require('../../assets/Icon/wants/w4.png'),
  //   require('../../assets/Icon/wants/w5.png'),
  //   require('../../assets/Icon/wants/w6.png'),
  //   require('../../assets/Icon/wants/w7.png'),
  //   require('../../assets/Icon/wants/w8.png'),
  //   require('../../assets/Icon/wants/w9.png'),
  //   require('../../assets/Icon/Icons/c8.png'),
  //   require('../../assets/Icon/Icons/c9.png'),
  //   require('../../assets/Icon/Icons/c11.png'),
  //   require('../../assets/Icon/Icons/c12.png'),
  //   require('../../assets/Icon/Icons/c13.png'),
  //   require('../../assets/Icon/Icons/c14.png'),
  //   require('../../assets/Icon/Icons/c15.png'),
  //   require('../../assets/Icon/Icons/c16.png'),
  //   require('../../assets/Icon/Icons/c17.png'),
  //   require('../../assets/Icon/Icons/c18.png'),
  //   require('../../assets/Icon/Icons/c19.png'),
  //   require('../../assets/Icon/savings/s1.png'),
  //   require('../../assets/Icon/savings/s2.png'),
  //   require('../../assets/Icon/savings/s3.png'),
  //   require('../../assets/Icon/savings/s4.png'),
  //   require('../../assets/Icon/savings/s5.png'),
  //   require('../../assets/Icon/Icons/c20.png'),
  //   require('../../assets/Icon/Icons/c21.png'),
  //   require('../../assets/Icon/Icons/c22.png'),
  //   require('../../assets/Icon/Icons/c23.png'),
  //   require('../../assets/Icon/income/i1.png'),
  //   require('../../assets/Icon/income/i2.png'),
  //   require('../../assets/Icon/income/i3.png'),
  //   require('../../assets/Icon/income/i4.png'),
  //   require('../../assets/Icon/income/i5.png'),
  //   require('../../assets/Icon/income/i6.png'),
  //   require('../../assets/Icon/income/i7.png'),
  //   require('../../assets/Icon/income/i10.png'),
  //   require('../../assets/Icon/income/i9.png'),
  //   require('../../assets/Icon/income/i12.png'),
  //   require('../../assets/Icon/income/i13.png'),
  //   require('../../assets/Icon/income/i8.png'),
  //   require('../../assets/Icon/Icons/c24.png'),
  //   require('../../assets/Icon/Icons/c25.png'),
  //   require('../../assets/Icon/Icons/c26.png'),
  //   require('../../assets/Icon/Icons/c27.png'),
  //   require('../../assets/Icon/Icons/c28.png'),
  //   require('../../assets/Icon/Icons/c29.png'),
  //   require('../../assets/Icon/Icons/c30.png'),
  //   require('../../assets/Icon/necessities/n9.png'),
  //   require('../../assets/Icon/necessities/n2.png'),
  //   require('../../assets/Icon/necessities/n3.png'),
  //   require('../../assets/Icon/necessities/n4.png'),
  //   require('../../assets/Icon/income/i14.png'),
  //   require('../../assets/Icon/income/i15.png'),
  //   require('../../assets/Icon/income/i17.png'),
  //   require('../../assets/Icon/income/i16.png'),
  //   require('../../assets/Icon/income/i18.png'),
  //   require('../../assets/Icon/income/i19.png'),
  //   require('../../assets/Icon/income/i20.png'),
  //   require('../../assets/Icon/income/i21.png'),
  //   require('../../assets/Icon/income/i22.png'),
  //   require('../../assets/Icon/income/i23.png'),
  //   require('../../assets/Icon/necessities/n5.png'),
  //   require('../../assets/Icon/necessities/n6.png'),
  //   require('../../assets/Icon/necessities/n7.png'),
  //   require('../../assets/Icon/necessities/n1.png'),
  //   require('../../assets/Icon/necessities/n8.png'),
  //   require('../../assets/Icon/Icons/c31.png'),
  //   require('../../assets/Icon/Icons/c32.png'),
  //   require('../../assets/Icon/Icons/c33.png'),
  //   require('../../assets/Icon/Icons/c34.png'),
  //   require('../../assets/Icon/Icons/c35.png'),
  //   require('../../assets/Icon/Icons/c36.png'),
  // ];
 

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

  const toggleModal = () => {
  
      if (selectedAddOption === 'expenses') {
        setSelectedAddOption('income');
      } else {
        setSelectedAddOption('expenses');
      }
      setIsModalVisible(!isModalVisible);
    };

    const handlePress = () => {
      const newpage = page + 1
      const backpage = 0
      if(page === Object.keys(ddate).length - 1){
        setPage(backpage)
      }else{
        setPage(newpage);
        // console.log(Object.keys(ddate).length)
      }
      
    };

    const api = () => {
      axiosRequest.get(`gabay/same/month/year/${context.id}/`)
        .then((response) => {
          const date = {...response.data};
          setDdate(date);
          // console.log(ddate);
          console.log(context);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    const getData = (pagess) =>{
      axiosRequest.get(`gabay/page/${context.id}/?date=${Object.keys(ddate).length > 0 ? pagess: null}&page=1`).then((response)=>{
        setExpense(response.data)
      }).catch((e)=>{
        console.log(e)
      })
    }

    const getIncome = () =>{
      axiosRequest.get(`gabay/user/income/?user=${context.id}`).then((response)=>{
        setIncomes(response.data)
      }).catch((e)=>{
        console.log(e)
      })
    }
   
    useEffect(() => {
      const onFocus = async() => {
        await api();
        getIncome()
        if(Object.keys(ddate).length > 0){
          getData(Object.keys(ddate).length > 0 ? ddate[page].date: null)
        }
       
        setTimeout(() => {
        setIsLoading(false);
          // if (!context.id) {
          //   navigation.navigate('Log in');
          // }
        }, 3000 );
      };
  
      const unsubscribe = navigation.addListener('focus', onFocus);
  
      return () => {
        unsubscribe();
        
      };
    }, [navigation, context,page,expense]);

  useEffect(() => {
      // console.log(page); // Log the updated page value separately
      if(Object.keys(ddate).length > 0){
        getData(Object.keys(ddate).length > 0 ? ddate[page].date: null)
      }
     
      
    }, [page,ddate]);
  const screenWidth = Dimensions.get('window').width;
  const headerHeight = 70;

  const toggleDropdown = async() => {
    setIsDropdownVisible(!isDropdownVisible);
  };
  
  const toggleOption = () => {
    setSelectedOption(selectedOption === 'Income' ? 'Expenses' : 'Income');
  };

  // useEffect(() => {
  //   const loadIcons = async () => {
  //     // Load and cache the icon assets
  //     // console.log(transaction);
  //     const loadedAssets = await Promise.all(
  //       iconPaths.map((path) => {Asset.fromModule((path)).downloadAsync()
  //       })

  //     )

  // //     // Set the iconAssets state with the loaded assets
  // //     setIconAssets(loadedAssets)
  // //   }

  //   loadIcons()
  //   }}, [])
  return (
    
    <View style={Style.common}>
      
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
       
       <View>
        
          <Header
            placement="left"
            centerComponent={
              <View style={{ flexDirection: 'row', alignItems: 'center',  }}>
                <Image source={Logo} style={{ width: 50, height: 50, marginRight: 5, marginLeft: -15, padding: 20 }} resizeMode="contain" />
                <Text style={{
                  color: '#E3B448',
                  fontSize: screenWidth < 400 ? 40 : 45,
                }}>
                  GABAY
                </Text>
              </View>
            }
            rightComponent={
              <TouchableOpacity onPress={toggleDropdown}>
                <Icon
                  name={isDropdownVisible ? 'close' : 'menu'}
                  type="material"
                  color="#E3B448"
                  size={screenWidth < 400 ? 50 : 55}
                />
              </TouchableOpacity>
            }
            containerStyle={{
              backgroundColor: '#144714',
              borderColor: 'transparent',
              height: headerHeight,
            }}
          />

          {isDropdownVisible && (
            <View
              style={{
                backgroundColor: '#CBD18F',
                position: 'absolute',
                marginTop: 2,
                borderRadius: 5,
                top: headerHeight,
                right: 20,
                width: 100,
                height: 'auto',
                zIndex: 1,
              }}
            >
              <View style={{ padding: 5 }}>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon
                    name="info"
                    type="material"
                    color="#144714"
                    size={25}
                  />
                  <Text style={{ fontSize: 20, color: '#144714' }}> About</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
                  <Icon
                    name="help"
                    type="material"
                    color="#144714"
                    size={25}
                  />
                  <Text style={{ fontSize: 20, paddingVertical: 5, color: '#144714' }}> Help</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress = {()=>{
                  navigation.navigate("Log in")
                }}>
                  <Icon
                    name="logout"
                    type="material"
                    color="#144714"
                    size={25}
                  />
                  <Text style={{ fontSize: 20, color: '#144714' }}> Logout</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          
         <View style={Style.glass}>
            <View style={{ alignItems: 'center', backgroundColor: '#091F0A', borderRadius: 5}}>
              <Text style={{ color: '#E3B448', fontSize: 25 }}>HISTORY</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <View style={{ alignItems: 'center', width: 150, backgroundColor: '#2C702B', padding: 5, borderRadius: 5, borderWidth: 1, borderColor: selectedOption === 'Expenses' ? '#E3B448' : 'transparent', }}>
                <View style={{ flexDirection: 'row', borderBottomWidth: 1 }}>
                  <Image source={Peso} style={{ width: 20, height: 20 }} />
                  <Text style={{ color: '#144714', fontSize: 20 }}> {incomes.total_amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
                </View>
                <Text style={{ color: '#E3B448', fontSize: 12}}>Income</Text>
              </View>
              <View style={{ alignItems: 'center', width: 150, backgroundColor: '#2C702B', padding: 5, borderRadius: 5, borderWidth: 1, borderColor: selectedOption === 'Income' ? '#E3B448' : 'transparent', }}>
                <View style={{ flexDirection: 'row', borderBottomWidth: 1 }}>
                  <Image source={Peso} style={{ width: 20, height: 20 }} />
                  <Text style={{ color: '#144714', fontSize: 20 }}> 13,700.00</Text>
                </View>
                <Text style={{ color: '#E3B448', fontSize: 12 }}>Expenses</Text>
              </View>
            </View>
          
            <TouchableOpacity onPress={toggleOption}>
            <View style={{ alignItems: 'center', backgroundColor: '#CBD18F', borderRadius: 5, flexDirection: 'row', justifyContent: 'space-between', padding: 5,marginTop:10}}>
                <Text style={{ fontSize: 20, color: '#144714' }}>{selectedOption}</Text>
                <Iconn name="swap-horizontal" style={{ fontSize: 25, color: '#144714', marginLeft: 2 }} />
              </View>
              </TouchableOpacity>
          </View>

          <View style={{top: 30, paddingHorizontal: 10}}>
          
            </View>

            {selectedOption === 'Income' && (
            
            <View style={{ top: 10, backgroundColor: 'white', width:(Dimensions.get('window').width * 90 / 100),marginHorizontal:30, borderRadius: 10 ,}}>
            { Object.keys(ddate).length ? <View >
            <View style={{ top: 10, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', paddingHorizontal: 20 }}>
              <TouchableOpacity onPress={handlePress}>
              <Iconn name='arrow-left-thick' style={{ fontSize: 30, color: '#144714' }} />
              </TouchableOpacity>
              <Text style={{ fontSize: 20, color: '#144714' }}>{Object.keys(ddate).length > 0 ?   new Date(ddate[page].date).toLocaleString('default', { month: 'long' }):console.log(ddate)}</Text>
              <TouchableOpacity onPress={handlePress
              }>
              <Iconn name='arrow-right-thick' style={{ fontSize: 30, color: '#144714' }} />
              </TouchableOpacity>
            </View>
              
              <View style={{padding: 10, width: 'auto',}}>
              <DonutChart data={expense} total_sum = {incomes.total_amount}/>

              </View>
              <TouchableOpacity style={{bottom: 10, backgroundColor: '#CBD18F', paddingVertical: 10,  width: 'auto', paddingHorizontal: 30, borderRadius: 5, alignSelf: 'center', alignItems: 'center',}} onPress={() => {navigation.navigate('Expenses',{expense:expense,date:Object.keys(ddate).length > 0 ?   new Date(ddate[page].date).toLocaleString('default', { month: 'long' }):console.log(ddate)})}}>
                <Text style={{color: '#144714', fontSize: 18, }}>View details</Text>
              </TouchableOpacity>
            </View>: <View style={{justifyContent: 'space-evenly', alignItems: 'center' ,padding:10,width:'100%'}}>
              <Image source={require('../../assets/logo/logo1.png')} style={{opacity:0.3,width:150}} resizeMode='center'/>
              <Text style={{ fontSize: 24, fontWeight: '300',fontStyle: 'italic', marginTop: 20, color: '#CBD18F' ,letterSpacing:2,textAlign:'center'}}>

               Empty!
              </Text>
              </View>}
              </View>
              
              )}
              {selectedOption === 'Expenses' && (
               <View style={{top: 10, backgroundColor: 'white', width:(Dimensions.get('window').width * 90 / 100),marginHorizontal:30, borderRadius: 10 }}>
               <View style={{ top: 10, alignItems: 'center'}}>
              
              <Text style={{ fontSize: 20, color: '#144714' }}>Income</Text>
              
            </View>
               <View style={{ padding: 20, }}>
               <DonutChart data={incomes.data}/>
              </View>
              <TouchableOpacity style={{bottom: 10, backgroundColor: '#CBD18F', paddingVertical: 10,  width: 'auto', paddingHorizontal: 30, borderRadius: 5, alignSelf: 'center', alignItems: 'center',}} onPress={() => {navigation.navigate('Income',{income:incomes.data})}}>
                <Text style={{color: '#144714', fontSize: 18, }}>View details</Text>
              </TouchableOpacity>
              </View>
              )}
            </View>

      
      <View style={{ position: 'absolute', bottom: 5, left: 0, right: 0 }}>
      <View style={{ flexDirection: 'row', backgroundColor: '#144714', height: 80, width: 250, alignSelf: 'center', alignItems: 'center', justifyContent: 'space-around', borderRadius: 20 }}>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={() => {navigation.navigate('Home')}}>
            <Iconn name="history" style={{ fontSize: 40, color: '#E3B448' }} />
          </TouchableOpacity>
          <Text style={{ color: '#E3B448', fontSize: 12 }}>Home</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={() => toggleModal()}> 
            <Iconn name="plus-circle-outline" style={{ fontSize: 60, color: '#E3B448' }} />
          </TouchableOpacity>
          <Text style={{ color: '#E3B448', fontSize: 15, top: -5 }}>Add</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={() => {navigation.navigate('Forecast savings')}}>
            <Iconn name="bullseye-arrow" style={{ fontSize: 40, color: '#E3B448' }} />
          </TouchableOpacity>
          <Text style={{ color: '#E3B448', fontSize: 12 }}>Predict</Text>
        </View>
        
      </View>
      </View>
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
        
            <Text style={{ fontSize: 20, marginBottom: 20, color: '#E3B448',}}>Select an option:</Text>
            <TouchableOpacity
              style={Style.modalButton}
              onPress={() => {
                // Handle "Add expenses" option
                setIsModalVisible(!isModalVisible);
                if (selectedAddOption == 'expenses') {
                  navigation.navigate('Add expenses'); // Navigate to the "AddExpenses" screen or your desired screen for adding expenses
                }
              }}
            >
              <Text style={Style.modalButtonText}>Add Expenses</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={Style.modalButton}
              onPress={() => {
                // Handle "Add income" option
                setIsModalVisible(!isModalVisible);
                if (selectedAddOption == 'income') {
                  navigation.navigate('Add income'); // Navigate to the "AddIncome" screen or your desired screen for adding income
                }
              }}
            >
              <Text style={Style.modalButtonText}>Add Income</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[Style.modalButton, Style.modalCancelButton]}
              onPress={() => setIsModalVisible(!isModalVisible)}
            >
              <Text style={{color: '#CBD18F', fontSize: 18,}}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      </> 
      )}
          
    </View>
   
  );
  
};
export default Home;

