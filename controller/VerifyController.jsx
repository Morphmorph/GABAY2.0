import { useNavigation } from '@react-navigation/native';
import { useVerifyModel } from '../model/VerifyModel'; // Import the model

export const useVerifyController = () => {
  const navigation = useNavigation();
  const { email, setEmail, emailError, setEmailError } = useVerifyModel();

  const reSend = () => {
    navigation.navigate('Sign up');
  };

  const handleVerify = () => {
    // Clear existing errors
    setEmailError(null);

    // Validate email
    if (!email) {
      setEmailError('Email is required');
    } else if (!isValidEmail(email)) {
      setEmailError('Invalid email address');
    } else {
      navigation.navigate('Pin');
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  return { email, setEmail, emailError, setEmailError, handleVerify, reSend };
};
