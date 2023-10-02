import { useNavigation } from '@react-navigation/native';
import { useForgotPasswordModel } from '../model/ForgotpasswordModel';

export const useForgotPasswordController = () => {
    const navigation = useNavigation();
    const {
        passwordData,
        setPasswordData,
        errors,
        setErrors,
        isPasswordValid,
        isUppercase,
        isLowercase,
        hasNumber,
        hasSymbol,
    } = useForgotPasswordModel();
  
    const goToSignin = () => {
      navigation.navigate('Log in');
    };
  
    const handleUpdatePassword = () => {
      // Clear existing errors
      setErrors({});
  
    
      // Validate password
      if (!passwordData.newPassword) {
        setErrors((prevErrors) => ({ ...prevErrors, newPassword: 'Password is required' }));
      } else if (passwordData.newPassword.length < 8) {
        setErrors((prevErrors) => ({ ...prevErrors, newPassword: 'At least 8 characters' }));
      } else if (!isPasswordValid) {
        setErrors((prevErrors) => ({ ...prevErrors, newPassword: 'Follow required format' }));
      }
  
      // Validate confirm password
      if (!passwordData.confirmNewPassword) {
        setErrors((prevErrors) => ({ ...prevErrors, confirmNewPassword: 'Required' }));
      } else if (passwordData.newPassword !== passwordData.confirmNewPassword) {
        setErrors((prevErrors) => ({ ...prevErrors, confirmNewPassword: 'Passwords do not match' }));
      }
  
      // Check if all fields are valid
      if (
        passwordData.newPassword.length >= 8 &&
        isPasswordValid &&
        passwordData.confirmNewPassword &&
        passwordData.newPassword === passwordData.confirmNewPassword
      ) {
        // Clear the password error when all conditions are met
        setErrors((prevErrors) => ({ ...prevErrors, newPassword: null }));
        navigation.navigate('Log in');
      }
    };
  

    const isValidPassword = (newPassword) => {
      return (
        newPassword.length >= 8 &&
        /[A-Z]/.test(newPassword) &&
        /[a-z]/.test(newPassword) &&
        /[0-9]/.test(newPassword) &&
        /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(newPassword)
      );
    };
  
    return {
      passwordData,
      setPasswordData,
      errors,
      setErrors,
      isPasswordValid,
      isUppercase,
      isLowercase,
      hasNumber,
      hasSymbol,
      goToSignin,
      handleUpdatePassword,
    };
};
