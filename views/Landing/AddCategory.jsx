import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import Style from '../Style'
import CustomInput from '../CustomInput'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Asset } from 'expo-asset'

const AddCategory = ({route}) => {
  const navigation = useNavigation()
  const { destination } = route.params;
  const [category, setCategory] = useState('')
  const [categoryError, setCategoryError] = useState(null)
  const [selectedIcons, setSelectedIcons] = useState(null);
  const [iconAssets, setIconAssets] = useState([])
  const [iconError, setIconError] = useState(null);

  const iconPaths = [
    require('../../assets/Icon/Icons/c1.png'),
    require('../../assets/Icon/Icons/c2.png'),
    require('../../assets/Icon/Icons/c3.png'),
    require('../../assets/Icon/Icons/c4.png'),
    require('../../assets/Icon/Icons/c5.png'),
    require('../../assets/Icon/Icons/c6.png'),
    require('../../assets/Icon/Icons/c7.png'),
    require('../../assets/Icon/wants/w1.png'),
    require('../../assets/Icon/wants/w2.png'),
    require('../../assets/Icon/wants/w3.png'),
    require('../../assets/Icon/wants/w4.png'),
    require('../../assets/Icon/wants/w5.png'),
    require('../../assets/Icon/wants/w6.png'),
    require('../../assets/Icon/wants/w7.png'),
    require('../../assets/Icon/wants/w8.png'),
    require('../../assets/Icon/wants/w9.png'),
    require('../../assets/Icon/Icons/c8.png'),
    require('../../assets/Icon/Icons/c9.png'),
    require('../../assets/Icon/Icons/c11.png'),
    require('../../assets/Icon/Icons/c12.png'),
    require('../../assets/Icon/Icons/c13.png'),
    require('../../assets/Icon/Icons/c14.png'),
    require('../../assets/Icon/Icons/c15.png'),
    require('../../assets/Icon/Icons/c16.png'),
    require('../../assets/Icon/Icons/c17.png'),
    require('../../assets/Icon/Icons/c18.png'),
    require('../../assets/Icon/Icons/c19.png'),
    require('../../assets/Icon/savings/s1.png'),
    require('../../assets/Icon/savings/s2.png'),
    require('../../assets/Icon/savings/s3.png'),
    require('../../assets/Icon/savings/s4.png'),
    require('../../assets/Icon/savings/s5.png'),
    require('../../assets/Icon/Icons/c20.png'),
    require('../../assets/Icon/Icons/c21.png'),
    require('../../assets/Icon/Icons/c22.png'),
    require('../../assets/Icon/Icons/c23.png'),
    require('../../assets/Icon/income/i1.png'),
    require('../../assets/Icon/income/i2.png'),
    require('../../assets/Icon/income/i3.png'),
    require('../../assets/Icon/income/i4.png'),
    require('../../assets/Icon/income/i5.png'),
    require('../../assets/Icon/income/i6.png'),
    require('../../assets/Icon/income/i7.png'),
    require('../../assets/Icon/income/i10.png'),
    require('../../assets/Icon/income/i9.png'),
    require('../../assets/Icon/income/i12.png'),
    require('../../assets/Icon/income/i13.png'),
    require('../../assets/Icon/income/i8.png'),
    require('../../assets/Icon/Icons/c24.png'),
    require('../../assets/Icon/Icons/c25.png'),
    require('../../assets/Icon/Icons/c26.png'),
    require('../../assets/Icon/Icons/c27.png'),
    require('../../assets/Icon/Icons/c28.png'),
    require('../../assets/Icon/Icons/c29.png'),
    require('../../assets/Icon/Icons/c30.png'),
    require('../../assets/Icon/necessities/n9.png'),
    require('../../assets/Icon/necessities/n2.png'),
    require('../../assets/Icon/necessities/n3.png'),
    require('../../assets/Icon/necessities/n4.png'),
    require('../../assets/Icon/income/i14.png'),
    require('../../assets/Icon/income/i15.png'),
    require('../../assets/Icon/income/i17.png'),
    require('../../assets/Icon/income/i16.png'),
    require('../../assets/Icon/income/i18.png'),
    require('../../assets/Icon/income/i19.png'),
    require('../../assets/Icon/income/i20.png'),
    require('../../assets/Icon/income/i21.png'),
    require('../../assets/Icon/income/i22.png'),
    require('../../assets/Icon/income/i23.png'),
    require('../../assets/Icon/necessities/n5.png'),
    require('../../assets/Icon/necessities/n6.png'),
    require('../../assets/Icon/necessities/n7.png'),
    require('../../assets/Icon/necessities/n1.png'),
    require('../../assets/Icon/necessities/n8.png'),
    require('../../assets/Icon/Icons/c31.png'),
    require('../../assets/Icon/Icons/c32.png'),
    require('../../assets/Icon/Icons/c33.png'),
    require('../../assets/Icon/Icons/c34.png'),
    require('../../assets/Icon/Icons/c35.png'),
    require('../../assets/Icon/Icons/c36.png'),
  ];
  
  
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
      navigation.navigate(destination);
      console.log('Category:', category)
      console.log('Icon:', selectedIcons)
    }
  };

  useEffect(() => {
    const loadIcons = async () => {
      // Load and cache the icon assets
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
      <View style={{ top: 30, borderBottomWidth: 1, borderColor: '#144714', margin: 10, alignItems: 'center' }}>
        <Text style={{ color: iconError ? '#810000' : '#E3B448', paddingVertical: 5 }}>Select icon</Text>
      </View>
      <ScrollView contentContainerStyle={{paddingBottom: 90, height: 'auto'}}>
      <View style={{ top: 30, height: 420, overflow: 'hidden', margin: 10, borderWidth: 1, borderColor: iconError ? '#810000' : '#144714',  borderRadius: 20,  }}>
      <ScrollView 
      nestedScrollEnabled
      contentContainerStyle={{ backgroundColor: '#2b5627', justifyContent: 'space-between', flexDirection: 'row', flexWrap: 'wrap', padding: 5 }}>
      {iconPaths.map((iconUrl, index) => (
      <TouchableOpacity
      key={iconUrl}
      style={{
        margin: 5,
        alignItems: 'center',
      }}
      onPress={() => toggleIconSelection(iconUrl)}
    >
      <View
        style={{
          backgroundColor: selectedIcons === iconUrl ? '#CBD18F' : 'transparent',
          padding: 10,
          borderRadius: 5,
        }}
      >
        <Image source={iconUrl} style={{ width: 50, height: 50}} />
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
              backgroundColor: '#144714',
              padding: 10,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%', // Set the width to 100% for the inner View
            }}
            onPress={startButtonPressed}
          >
            <Text style={{ color: '#E3B448', fontSize: 18, fontWeight: 'bold' }}>Add</Text>
          </TouchableOpacity>
        </View>
        
      </View>
    </View>
  )
}

export default AddCategory
