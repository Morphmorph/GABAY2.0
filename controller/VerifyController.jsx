import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useVerifyModel } from '../model/VerifyModel'; // Import the model
import { axiosRequest } from '../api_server/axios';
import UserContext from '../api_server/context';
export const useVerifyController = () => {
  const navigation = useNavigation();
  const { email, setEmail, emailError, setEmailError } = useVerifyModel();
  const {setContext} = React.useContext(UserContext)
 

  const handleVerify = async() => {
    // Clear existing errors
    setEmailError(null);

    // Validate email
    if (!email) {
      setEmailError('Email is required');
    } else if (!isValidEmail(email)) {
      setEmailError('Invalid email address');
    } else {
      await axiosRequest.post("auth/otp/",JSON.stringify({"email":email}),{
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response)=>{
        console.log(response.data)
        // must set a loading svreen here from View like Setloading = false 
        if(response.data.status == 200){
          alert(response.data.Warning)
          setContext({email:email})
          navigation.navigate('Pin');
        }else{
          alert(response.data.Warning)
        }
        
      }).catch((err)=>{
        console.log(JSON.stringify(data))
        console.log(err)
      })
    }
  };

  const reSend = () => {
    navigation.navigate('Sign up');
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  return { email, setEmail, emailError, setEmailError, handleVerify, reSend };
};
