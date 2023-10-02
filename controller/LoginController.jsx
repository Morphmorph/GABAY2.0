import { useNavigation } from '@react-navigation/native';
import { useLoginModel } from '../model/LoginModel'; // Import the model

export const useLoginController = () => {
  const navigation = useNavigation();
  const { inputs, setInputs, errors, setErrors, isValidEmail } = useLoginModel();

  const goToSignup = () => {
    navigation.navigate('Sign up');
  };

  const goToForgot = () => {
    navigation.navigate('Forgot password');
  };

  const handleSignIn = () => {
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
      navigation.navigate('Income');
    }
  };

  return { inputs, setInputs, errors, setErrors, goToSignup, goToForgot, handleSignIn };
};
