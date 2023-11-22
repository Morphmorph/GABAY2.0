import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { usePinModel } from '../model/PinModel'; // Import the model
import UserContext from '../api_server/context';
import { axiosRequest } from '../api_server/axios';


export const usePinController = () => {
  const navigation = useNavigation();
  const { pin, setPin, pinError, setPinError, showModalMessage, setShowModalMessage } = usePinModel();
  const {context,nav} = React.useContext(UserContext)
  const reSend = () => {
    navigation.navigate('Verify');
  };

  const handleVerify = async() => {
    // Clear existing errors
    setPinError(null);

    // Validate pin
    if (!pin) {
      setPinError('PIN is required');
    }  else {
      await axiosRequest.post("auth/verify/",JSON.stringify({email : context.email,otp : pin}),{
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response)=>{
        console.log(response.data)
        if(response.data.status == 200 ){
          setShowModalMessage(true);
         setTimeout(() => {
          // Navigate to the home screen
          navigation.navigate('Log in');
        }, 1800);
        }else if(response.data.status == 208 && nav){
          setShowModalMessage(true);
         setTimeout(() => {
          // Navigate to the home screen
          navigation.navigate('Forgot password');
        }, 1800);
        }
        else{
          setPinError('Wrong PIN');
        }
        
      }).catch((err)=>{
        
        console.log(err)
      })
    }
  };

  const isValidPin = (pin) => {
    const viPin = /6/;
    return viPin.test(pin);
  };

  return { pin, setPin, pinError, setPinError, handleVerify, reSend, setShowModalMessage, showModalMessage };
};
