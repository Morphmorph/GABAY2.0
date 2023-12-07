import { useNavigation } from '@react-navigation/native';
import { axiosRequest } from '../api_server/axios';
import { useLoginModel } from '../model/LoginModel'; // Import the model
import UserContext from '../api_server/context';
import React from 'react';


export const useLoginController = () => {
  const navigation = useNavigation();
  const { inputs, setInputs, errors, setErrors, isValidEmail,loader,SetLoader, setShowModalMessage, showModalEEEMessage, setShowModalEEEMessage, showModalMessage, showModalEMessage, setShowModalEMessage, showModalEEMessage, setShowModalEEMessage} = useLoginModel();
  const {setNav,setContext} = React.useContext(UserContext)
  const goToSignup = () => {
    navigation.navigate('Sign up');
  };

  const goToForgot = () => {
    // navigation.navigate('Forgot password');
    setNav(true)
    navigation.navigate('Verify');
  
  };

  const handleSignIn = async() => {
    // Clear existing errors
    setErrors({});



    // Validate email
    if (!inputs.email) {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Email is required' }));
    } else if (!isValidEmail(inputs.email)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Invalid email address' }));
    }

    // Validate password
    if (!inputs.password) {
      setErrors((prevErrors) => ({ ...prevErrors, password: 'Password is required' }));
    }

    // Navigate to Home if there are no errors
    if (isValidEmail(inputs.email) && inputs.password) {
      SetLoader(true)
      await axiosRequest.post("auth/login/",JSON.stringify(inputs),{
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },).then((response)=>{
        
        // console.log(response.data)
        // must set a loading screen here from View like Setloading = false 
        if(response.data.status === 200){
          // setContext({email:email})
          const data = {email:response.data.user.email,id :response.data.user.id }
          setContext(data)

         setShowModalMessage(true);
         setTimeout(() => setShowModalMessage(false), 500);

        }else if(response.data.status=== 100){
          const data = {email:response.data.user.email,id :response.data.user.id }

          setContext(data)
          navigation.navigate('Homescreen')
        }
        
        else if(response.data.status == 401){
          // Change this alert to model
         setShowModalEEEMessage(true)
          setNav(false)
          setTimeout(() => setShowModalEEEMessage(false), 500);
        }
        else{
          setShowModalEMessage(true);
          setTimeout(() => setShowModalEMessage(false), 500);
        }
        SetLoader(false)
      }).catch((err)=>{
        SetLoader(false)
        console.log(err)
        setShowModalEEMessage(true);
          setTimeout(() => setShowModalEEMessage(false), 500);
          alert("Something Went Wrong! Check your Intertnet Connection")
      })
    }
  };

  return { inputs, setInputs, errors, setErrors, goToSignup, goToForgot, handleSignIn,loader,SetLoader, showModalEEEMessage, setShowModalEEEMessage, showModalMessage, setShowModalMessage, showModalEMessage, setShowModalEMessage, showModalEEMessage, setShowModalEEMessage };
};
