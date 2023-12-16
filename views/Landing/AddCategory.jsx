import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useState, useEffect, useContext,useLayoutEffect } from 'react'
import Style from '../Style'
import CustomInput from '../CustomInput'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Asset } from 'expo-asset'
import UserContext from '../../api_server/context'

const AddCategory = ({route}) => {
  const navigation = useNavigation()
  const screenWidth = Dimensions.get('window').width;
  const margin = screenWidth === 360 ? 6 : 2.2;
  const { destination,cat} = route.params;
  const [category, setCategory] = useState('')
  const [categoryError, setCategoryError] = useState(null)
  const [selectedIcons, setSelectedIcons] = useState(null);
  const [iconAssets, setIconAssets] = useState([])
  const [iconError, setIconError] = useState(null);
  const {category1,setCategory1,incomeIcon,setIncomeIcon,iconPaths} = useContext(UserContext)

  
  
  // console.log(iconPaths)
  const toggleIconSelection = (iconUrl) => {
    if (selectedIcons === iconUrl) {
      setSelectedIcons(null); // Deselect the currently selected icon
      setIconError(iconUrl)
    } else {
      setSelectedIcons(iconUrl); // Select the new icon
      setIconError(null)
    }
  };

  const startButtonPressed = () => {
    // Clear existing errors
    setCategoryError(null);
    setIconError(null); // Clear icon selection error

    // Validate income
    if (!category) {
      setCategoryError('Required');
    }

    // Validate icon selection
    if (!selectedIcons) {
      setIconError('no_icon_selected');
    }

    else if (!categoryError && !iconError) {
      const newCategory = {
        icon: selectedIcons,
        text: category,
      }
      
console.log(newCategory)
      
      if(destination == "Add expenses"){
        const updatedNecessities = [newCategory, ...category1[cat].slice(0)];
        setCategory1({ ...category1, [cat]: updatedNecessities });
        navigation.navigate(destination);
      }else if(destination == "Add income"){
        const updatedNecessities = [newCategory, ...incomeIcon.income.slice(0)];
        setIncomeIcon({...incomeIcon,income:updatedNecessities})
        navigation.navigate(destination);
      }
      
    
      
     
      // console.log('Icon:', selectedIcons)
      // console.log(category1.necessities)

    }
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Add New Description',
    });
  }, [navigation]);

  useEffect(() => {
    const loadIcons = async () => {
      // Load and cache the icon assets
      // console.log('Category:', selectedIcons)
      const loadedAssets = await Promise.all(
        iconPaths.map((path) => Asset.fromModule(path).downloadAsync())
      )

      // Set the iconAssets state with the loaded assets
      setIconAssets(loadedAssets)
    }

    loadIcons()
  }, [])



  return (
    <View style={Style.common}>
      <View>
        <View
          style={{
            top: 20,
            alignSelf: 'center',
            backgroundColor: '#2b5127',
            paddingTop: 5,
            paddingBottom: -70,
            paddingHorizontal: 20,
            marginHorizontal: 40,
            borderRadius: 5,
            width: '80%'
          }}
        >
          <CustomInput
            iconName="application-outline"
            placeholder="Title"
            value={category}
            onChangeText={(text) => setCategory(text)}
            error={categoryError}
            onFocus={() => {
              // Clear income error on focus
              setCategoryError(null)
            }}
          />
          <Text style={{ top: -10, textAlign: 'center', color: '#E3B448' }}>Category</Text>
        </View>
      </View>
      <View style={{top: 30, borderBottomWidth: 1, borderColor: '#144714', margin: 10, alignItems: 'center', marginBottom: 30}}>
        <Text style={{ color: iconError ? '#810000' : '#E3B448', paddingVertical: 5 }}>Select icon</Text>
      </View>
     
      <ScrollView contentContainerStyle={{paddingBottom: 90, height: 'auto'}}>
      <View style={{backgroundColor: '#2b5627',height: 430,overflow: 'hidden', alignContent:"center",margin: 10, borderWidth: 1, borderColor: iconError ? '#810000' : '#144714',  borderRadius: 20 ,alignItems:'center' }}>
      <ScrollView 
      nestedScrollEnabled
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ width:"100%",justifyContent:'flex-start', flexDirection: 'row', flexWrap: 'wrap', padding: 3 }}>
      {iconPaths.map((iconUrl, index) => (
      <TouchableOpacity
      key={index}
      style={{
        margin: margin,
        alignItems: 'center',
      }}
      onPress={() => toggleIconSelection(iconUrl)}
    >
      <View
        style={{
          backgroundColor: selectedIcons === iconUrl ? '#CBD18F' : 'transparent',
          padding: screenWidth < 390 ? 6 : screenWidth > 390 && screenWidth <= 413 ? 8 : 12,
          borderRadius: 5,
        }}
      >
        <Image source={iconUrl} style={{ width:50, height:50}} />
      </View>
      
    </TouchableOpacity>
  ))}
        </ScrollView>
        </View>
        </ScrollView>
     
      <View
        style={{
          alignItems: 'center',
          position: 'absolute',
          bottom: 20,
          alignSelf: 'center',
          width: '100%',
          paddingHorizontal: 20,
        }}
      >
        <View style={{ width: '45%' }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#CBD18F',
              padding: 10,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%', // Set the width to 100% for the inner View
            }}
            onPress={startButtonPressed}
          >
            <Text style={{ color: '#144714', fontSize: 18,}}>Add</Text>
          </TouchableOpacity>
        </View>
        
      </View>
    </View>
  )
}

export default AddCategory