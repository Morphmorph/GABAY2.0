import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useSignupModel } from '../model/SignupModel';
import { axiosRequest } from '../api_server/axios';
import UserContext from '../api_server/context';

export const useSignupController = () => {
  const navigation = useNavigation();
  const {
    formData,
    setFormData,
    errors,
    setErrors,
    isPasswordValid,
    isUppercase,
    isLowercase,
    hasNumber,
    hasSymbol,
    loader,
    SetLoader
  } = useSignupModel();


const {setContext} = React.useContext(UserContext)

  const goToSignin = () => {
    navigation.navigate('Log in');
  };


  const handleSignUp = async() => {
    // Clear existing errors
    setErrors({});

    // Validate email
    if (!formData.email) {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Email is required' }));
    } else if (!isValidEmail(formData.email)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Invalid email address' }));
    }

    // Validate password
    if (!formData.password) {
      setErrors((prevErrors) => ({ ...prevErrors, password: 'Password is required' }));
    } else if (formData.password.length < 8) {
      setErrors((prevErrors) => ({ ...prevErrors, password: 'At least 8 characters' }));
    } else if (!isPasswordValid) {
      setErrors((prevErrors) => ({ ...prevErrors, password: 'Follow required format' }));
    }

    // Validate confirm password
    if (!formData.confirmPassword) {
      setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: 'Required' }));
    } else if (formData.password !== formData.confirmPassword) {
      setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: 'Passwords do not match' }));
    }

    // Check if all fields are valid
    if (
      isValidEmail(formData.email) &&
      formData.password.length >= 8 &&
      isPasswordValid &&
      formData.confirmPassword &&
      formData.password === formData.confirmPassword
    ) {
      // Clear the password error when all conditions are met
      setErrors((prevErrors) => ({ ...prevErrors, password: null }));
      SetLoader(true)
      await axiosRequest.post("auth/register/",JSON.stringify(formData),{
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response)=>{
        alert(response.data)
        setContext({email:formData.email})
        SetLoader(false)
        setNav(false)
        if(response == 'Registered successfully!'){
          navigation.navigate('Verify');
        }
       
      }).catch((err)=>{
        console.log(formData)
        SetLoader(false)
        // alert("Something Went Wrong! Check your Intertnet Connection")
      })
      
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password)
    );
  };

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    isPasswordValid,
    isUppercase,
    isLowercase,
    hasNumber,
    hasSymbol,
    goToSignin,
    handleSignUp,
    loader,
    SetLoader
  };
};
