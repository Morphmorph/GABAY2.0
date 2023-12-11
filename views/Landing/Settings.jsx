import { View, Text, TouchableOpacity,StyleSheet, ScrollView,Modal } from 'react-native'
import React, { useState } from 'react';
import Style from '../Style'
import Icon from 'react-native-vector-icons/FontAwesome';
import Iconn from 'react-native-vector-icons/MaterialCommunityIcons';
import { useForgotPasswordController } from '../../controller/ForgotpasswordController';
import ModalMessage from '../Modal';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CustomInput from '../CustomInput';
// import { ScrollView } from 'react-native-gesture-handler';

const Settings = ({navigation}) => {
  const {
    passwordData,
    errors,
    isUppercase,
    isLowercase,
    hasNumber,
    hasSymbol,
    setPasswordData,
    setErrors,
    handleUpdatePassword,
    showModalMessage,
    setShowModalMessage,
    loader,
    setLoader
  } = useForgotPasswordController();

  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const handleTOS = () => {
    navigation.navigate('Terms of Service');
  };
  const handlePP = () => {
    navigation.navigate('Privacy Policy');
  };
  const handleHelp = () => {
    navigation.navigate('Help');
  };
  const handleAbout = () => {
    navigation.navigate('About');
  };
  const handleCP = () => {
    setEditModalVisible(!isEditModalVisible);
  };
  const Support = () => {
    navigation.navigate('Support inbox');
  };
  const Report = () => {
    navigation.navigate('Report inbox');
  };
  return (
    <>
   
    <View style={Style.common}>
    <ScrollView showsVerticalScrollIndicator={false} style={{flex:0}}>
      <View style={{borderBottomWidth: 1, borderColor: '#144714', marginHorizontal: 10}}>
        <View>
        <Text style={{marginTop: 5, fontSize: 25, color: '#CBD18f'}}>Account</Text>
        <Text style={{marginTop: 5, fontSize: 15, color: '#E3B448'}}>Update your password to keep your account secure</Text>
        </View>
        <TouchableOpacity onPress={handleCP}>
        <View style={{backgroundColor: '#A2A869', padding: 10, margin: 10, alignItems: 'center', borderRadius: 10, flexDirection: 'row', justifyContent: 'center'}}>
        <Iconn name='key-variant' style={{ fontSize: 20, color: '#144714' }} />
        <Text style={{color: '#144714', fontSize: 15}}> Change Password</Text>
        </View>
        </TouchableOpacity>
      </View>
      <View style={{borderBottomWidth: 1, borderColor: '#144714', marginHorizontal: 10}}>
        <View>
        <Text style={{marginTop: 5, fontSize: 25, color: '#CBD18f'}}>Community Standards and Policies</Text>
        </View>
        <TouchableOpacity onPress={handleTOS}>
        <View style={{backgroundColor: '#A2A869', padding: 10, margin: 10, alignItems: 'center', borderRadius: 10, flexDirection: 'row', justifyContent: 'center'}}>
        <Iconn name='book-open-page-variant-outline' style={{ fontSize: 20, color: '#144714' }} />
        <Text style={{color: '#144714', fontSize: 15}}> Terms and services</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePP}>
        <View style={{backgroundColor: '#A2A869', top: -10, marginBottom: -1, padding: 10, margin: 10, alignItems: 'center', borderRadius: 10, flexDirection: 'row', justifyContent: 'center'}}>
        <Iconn name='database-arrow-left-outline' style={{ fontSize: 20, color: '#144714' }} />
        <Text style={{color: '#144714', fontSize: 15}}> Privacy and policy</Text>
        </View>
        </TouchableOpacity>
      </View>
      <View style={{borderBottomWidth: 1, borderColor: '#144714', marginHorizontal: 10}}>
        <View>
        <Text style={{marginTop: 5, fontSize: 25, color: '#CBD18f'}}>Help and Support</Text>
        </View>
        <TouchableOpacity onPress={handleHelp}>
        <View style={{backgroundColor: '#A2A869', padding: 10, margin: 10, alignItems: 'center', borderRadius: 10, flexDirection: 'row', justifyContent: 'center'}}>
        <Iconn name='help-circle-outline' style={{ fontSize: 20, color: '#144714' }} />
        <Text style={{color: '#144714', fontSize: 15}}> Help</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAbout}>
        <View style={{backgroundColor: '#A2A869', top: -10, marginBottom: -1, padding: 10, margin: 10, alignItems: 'center', borderRadius: 10, flexDirection: 'row', justifyContent: 'center'}}>
        <Iconn name='book-open-page-variant' style={{ fontSize: 20, color: '#144714' }} />
        <Text style={{color: '#144714', fontSize: 15}}> About</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={Support}>
        <View style={{backgroundColor: '#A2A869', top: -10, marginBottom: -1, padding: 10, margin: 10, alignItems: 'center', borderRadius: 10, flexDirection: 'row', justifyContent: 'center'}}>
        <Iconn name='lifebuoy' style={{ fontSize: 20, color: '#144714' }} />
        <Text style={{color: '#144714', fontSize: 15}}> Support inbox</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={Report}>
        <View style={{backgroundColor: '#A2A869', top: -10, marginBottom: -1, padding: 10, margin: 10, alignItems: 'center', borderRadius: 10, flexDirection: 'row', justifyContent: 'center'}}>
        <Iconn name='message-alert-outline' style={{ fontSize: 20, color: '#144714' }} />
        <Text style={{color: '#144714', fontSize: 15}}> Report a problem</Text>
        </View>
        </TouchableOpacity>
        
      </View>
   
   
    
      <Modal
        animationType="slide"
        transparent={true}
        visible={isEditModalVisible}
        onRequestClose={() => {
          setEditModalVisible(!isEditModalVisible);
        }}
      >
        <View style={Style.modalContainer}>
          <View style={Style.modalContent}>
          <Text style={{ fontSize: 20, marginBottom: 20, color: '#E3B448', }}>Change Password:</Text>
          <CustomInput
          iconName="lock"
          placeholder="New Password"
          value={passwordData.newPassword}
          onChangeText={(text) => setPasswordData({ ...passwordData, newPassword: text })}
          secureTextEntry
          error={errors.newPassword}
          onFocus={() => {
            // Clear password error on focus
            setErrors({ ...errors, newPassword: null });
          }}
        />

        {errors.newPassword && (
          <View style={{ flexDirection: 'row', top: -12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
              <Icon
                name={isUppercase ? 'check' : 'times'}
                size={15}
                color={isUppercase ? 'green' : '#810000'}
                style={{ marginRight: 5 }}
              />
              <Text style={{ fontSize: 12, color: '#144714' }}>Uppercase</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
              <Icon
                name={isLowercase ? 'check' : 'times'}
                size={15}
                color={isLowercase ? 'green' : '#810000'}
                style={{ marginRight: 5 }}
              />
              <Text style={{ fontSize: 12, color: '#144714' }}>Lowercase</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
              <Icon
                name={hasNumber ? 'check' : 'times'}
                size={15}
                color={hasNumber ? 'green' : '#810000'}
                style={{ marginRight: 5 }}
              />
              <Text style={{ fontSize: 12, color: '#144714' }}>Number</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon
                name={hasSymbol ? 'check' : 'times'}
                size={15}
                color={hasSymbol ? 'green' : '#810000'}
                style={{ marginRight: 5 }}
              />
              <Text style={{ fontSize: 12, color: '#144714' }}>Symbol</Text>
            </View>
          </View>
        )}

        <CustomInput
          iconName="lock"
          placeholder="Confirm New Password"
          value={passwordData.confirmNewPassword}
          onChangeText={(text) => setPasswordData({ ...passwordData, confirmNewPassword: text })}
          secureTextEntry
          error={errors.confirmNewPassword}
          onFocus={() => {
            // Clear confirm new password error on focus
            setErrors({ ...errors, confirmNewPassword: null });
          }}
        />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.yesButton} onPress={handleUpdatePassword}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.noButton} onPress={() => setEditModalVisible(false)}>
                <Text style={styles.buttonText2}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <ModalMessage showAutomatically={showModalMessage} message="Your password is updated!" icon={<MaterialCommunityIcons name="lock-check" size={200} color="#E3B448" />} navigateToScreen="Log in"/>
     
     
    
      </ScrollView>
      <View style={Style.footer}>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Iconn name='email' style={{ fontSize: 15, color: '#144714' }} />
        <Text style={Style.footerText}> team.gabay404@gmail.com</Text>
        </View>
        <Text style={Style.footerText}>© 2023 GABAY. All Rights Reserved.</Text>
      </View>
    </View>

    
    
    
    </>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
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
export default Settings