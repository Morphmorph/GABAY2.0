import { View, Text, TouchableOpacity,StyleSheet, ScrollView,Modal, Alert } from 'react-native'
import React, { useContext, useState } from 'react';
import Style from '../Style'
import Icon from 'react-native-vector-icons/FontAwesome';
import Iconn from 'react-native-vector-icons/MaterialCommunityIcons';
import { useForgotPasswordController } from '../../controller/ForgotpasswordController';
import ModalMessage from '../Modal';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import CustomInput from '../CustomInput';
import Loader from '../Starting/actionLoader';
import UserContext from '../../api_server/context';
import { axiosRequest } from '../../api_server/axios';
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

  const {context,setContext} = useContext(UserContext)

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [loader1,setLoader1] = useState(false)
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
  const toggleModal1 = () => {
    setIsDeleteModalVisible(!isDeleteModalVisible)
  };

  const handleDelete = async() => {
    // try {
    //   await AsyncStorage.clear();
    //   console.log('AsyncStorage cleared successfully.');
    // } catch (error) {
    //   console.error('Error clearing AsyncStorage:', error);
    // }
  };
  const handleDeleteConfirmed = async () => {


    toggleModal1(); // Close the logout modal
    setLoader1(true); // Show the loading indicator
  
    // Simulate an asynchronous logout process
    await new Promise(resolve => setTimeout(resolve, 2000)); // Replace this with your actual logout logic
    
    // Once the logout process is complete, navigate to the login screen and hide the loader
    handleDelete(); 
    const data = {email:null,id :null,otp:null }

    await axiosRequest.delete(`/auth/user/delete/${context.id}/`)
    .then((response)=>{
      setContext(data)
      setLoader1(false);
      Alert.alert(
        'Account Deleted',
        'Click Contnue to Proceed to Sign In',
        [
          { text: 'Continue', onPress: () => navigation.navigate('Log in') }
        ],
        { cancelable: false }
      );

    })
    .catch(e => setLoader1(false))

    
  };
  return (
    <>
   
    <View style={Style.common}>
    <Loader visible ={loader1} message="Deleting account..."/>
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
      <View style={{borderBottomWidth: 0, borderColor: '#144714', marginHorizontal: 10}}>
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
        <View>
        <Text style={{marginTop: 5, fontSize: 25, color: '#CBD18f'}}>Delete User and Account</Text>
        </View>
        <TouchableOpacity  onPress={toggleModal1}>
        <View style={{backgroundColor: '#810000', top: -5, marginBottom: -1, padding:10,margin: 10, alignItems: 'center', borderRadius: 10, flexDirection: 'row', justifyContent: 'center'}}>
        {/* <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent:"center",width:"100%", backgroundColor: '#810000', borderRadius: 10}}> */}
          <AntDesign name="delete" size={20} color={'#E3B448'} />
          <Text style={{ color: '#E3B448', fontSize: 15 }}>Delete account</Text>
        </View>
      </TouchableOpacity>
      </View>
     
      <Modal
        animationType="fade"
        transparent={true}
        visible={isDeleteModalVisible}
        onRequestClose={toggleModal1}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Are you sure you want to delete your account?</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.yesButton} onPress={handleDeleteConfirmed}>
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.noButton} onPress={toggleModal1}>
                <Text style={styles.buttonText2}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
   
    
      <Modal
        animationType="slide"
        transparent={true}
        visible={isEditModalVisible}
        onRequestClose={() => {
          setEditModalVisible(!isEditModalVisible);
        }}
      >
        <View style={Style.modalContainer}>
        <Loader visible={loader} message="Updating..." />
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