import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { usePinModel } from '../model/PinModel'; // Import the model
import UserContext from '../api_server/context';
import { axiosRequest } from '../api_server/axios';


export const usePinController = () => {
  const navigation = useNavigation();
  const { pin, setPin, pinError, setPinError, showModalMessage, setShowModalMessage,loader,setLoader } = usePinModel();
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
    } else {
      setLoader(true);
      await axiosRequest
        .post("auth/verify/", JSON.stringify({ email: context.email, otp: pin }), {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.status === 200) {
            setTimeout(() => {
              setLoader(false);
             
              navigation.navigate('Log in');
            }, 4000);
          } else if (response.data.status === 208 && nav) {
            setTimeout(() => {
              setLoader(false);
             
              navigation.navigate('Forgot password');
            }, 4000);
          } else {
            setLoader(false);
            setPinError('Wrong PIN');
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Something Went Wrong! Check your Intertnet Connection")
        });
    }
  };
  const isValidPin = (pin) => {
    const viPin = /6/;
    return viPin.test(pin);
  };

  return { pin, setPin, pinError, setPinError, handleVerify, reSend, setShowModalMessage, showModalMessage, loader, setLoader };
};
