import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Image, Modal} from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import Logo from '../../assets/logo/logo1.png';
import Iconn from 'react-native-vector-icons/MaterialCommunityIcons';
import LoadingScreen from '../LoadingScreen';
import { Header, Icon } from 'react-native-elements';
import Style from '../Style';

const Home = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Income');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAddOption, setSelectedAddOption] = useState('');

  const toggleModal = () => {
  
      if (selectedAddOption === 'expenses') {
        setSelectedAddOption('income');
      } else {
        setSelectedAddOption('expenses');
      }
      setIsModalVisible(!isModalVisible);
    };

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 3,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    labelColor: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    labelPosition: 45,
    labelStyle: {
      fontSize: 14,
    },
    formatLabelText: (item, percentage) => `${item.name} (${percentage}%)`,
  };
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  const screenWidth = Dimensions.get('window').width;
  const headerHeight = 70;

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };
  
  const toggleOption = () => {
    setSelectedOption(selectedOption === 'Income' ? 'Expenses' : 'Income');
  };

  const data = [
    {
      name: 'School',
      population: 3000,
      color: '#E3B448',
    },
    {
      name: 'Grocery',
      population: 7000,
      color: '#144714',
    },
    {
      name: 'Utility',
      population: 4000,
      color: '#CBD18F',
    },
    {
      name: 'Savings',
      population: 1000,
      color: 'orange',
    },
    
    {
      name: 'Online',
      population: 2000,
      color: 'pink',
    },
  ];
  const dataIncome = [
    {
      name: 'Salary',
      population: 5000,
      color: '#FF5733', 
    },
    {
      name: 'Online',
      population: 3000,
      color: '#FFC300', 
    },

  ];
  // Calculate the total population for percentage calculation
  const totalPopulation = data.reduce((total, item) => total + item.population, 0);

  // Update data to include percentages
  const percentageData = data.map((item) => ({
    name: item.name,
    population: item.population,
    color: item.color,
    percentage: ((item.population / totalPopulation) * 100).toFixed(2),
  }));

  const totalPopulation1 = dataIncome.reduce((total, item) => total + item.population, 0);

  // Update data to include percentages
  const percentageData1 = dataIncome.map((item) => ({
    name: item.name,
    population: item.population,
    color: item.color,
    percentage: ((item.population / totalPopulation) * 100).toFixed(2),
  }));
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
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
                right: 2,
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
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
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
          
          <View style={{ top: 10, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', paddingVertical: 10, backgroundColor: '#144714', height: 60, width: 200, borderRadius: 10, }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 2, borderBottomColor: '#CBD18F' }}>
              <Iconn name="currency-php" style={{ fontSize: 20, color: '#E3B448' }} />
              <Text style={{ fontWeight: '500', fontSize: 20, color: '#E3B448' }}>1,000,000</Text>
            </View>
            <Text style={{ color: '#E3B448' }}>Income</Text>
          </View>

          <View style={{top: 30, alignSelf: 'center' }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{ fontSize: 35, color: '#E3B448' }}>HISTORY</Text>
            <TouchableOpacity onPress={toggleOption}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#144714',
                  height: 40,
                  width: 110,
                  paddingHorizontal: 5,
                  borderRadius: 5,
                  justifyContent: 'space-between'
                }}
              >
                <Text style={{ fontSize: 20, color: '#E3B448' }}>{selectedOption}</Text>
                <Iconn name="swap-horizontal" style={{ fontSize: 25, color: '#E3B448', marginLeft: 2 }} />
              </View>
            </TouchableOpacity>
            
            </View>
            {selectedOption === 'Income' && (
            
            <View style={{ top: 10, backgroundColor: 'white', width: 330, borderRadius: 10 }}>
            <View style={{ top: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20 }}>
              <TouchableOpacity onPress={() => { /* Add your logic here */ }}>
              <Iconn name='arrow-left-thick' style={{ fontSize: 30, color: '#144714' }} />
              </TouchableOpacity>
              <Text style={{ fontSize: 20, color: '#144714' }}>January</Text>
              <TouchableOpacity onPress={() => {}}>
              <Iconn name='arrow-right-thick' style={{ fontSize: 30, color: '#144714' }} />
              </TouchableOpacity>
            </View>
              
              <View style={{ padding: 20, flexDirection: 'row', flexWrap: 'wrap'}}>
              <PieChart
                data={percentageData}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                accessor="population"
                backgroundColor="transparent"
                center={[5, 0]}
                hasLegend={true} // Set this to false to hide the default legend
              />
              <TouchableOpacity style={{backgroundColor: '#144714', left: 5, paddingVertical: 10, paddingHorizontal: 30, borderRadius: 5,}} onPress={() => {navigation.navigate('Expenses')}}>
                <Text style={{color: '#E3B448', fontSize: 18, fontWeight: 'bold'}}>Inspect</Text>
              </TouchableOpacity>
              
              </View>
              </View>
              )}
              {selectedOption === 'Expenses' && (
               <View style={{ top: 10, backgroundColor: 'white', width: 330, borderRadius: 10 }}>
               <View style={{ top: 10, alignItems: 'center'}}>
              
              <Text style={{ fontSize: 20, color: '#144714' }}>Income</Text>
              
            </View>
               <View style={{ padding: 20, flexDirection: 'row', flexWrap: 'wrap'}}>
              <PieChart
                data={percentageData1}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                accessor="population"
                backgroundColor="transparent"
                center={[5, 0]}
                hasLegend={true} // Set this to false to hide the default legend
              />
              <TouchableOpacity style={{backgroundColor: '#144714', left: 5, paddingVertical: 10, paddingHorizontal: 30, borderRadius: 5,}} onPress={() => {navigation.navigate('Income')}}>
                <Text style={{color: '#E3B448', fontSize: 18, fontWeight: 'bold'}}>Inspect</Text>
              </TouchableOpacity>
              
              </View>
              </View>
              )}
            </View>
          </View>

      
      <View style={{ position: 'absolute', bottom: 10, left: 0, right: 0 }}>
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
              <Text style={Style.modalButtonText}>Cancel</Text>
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