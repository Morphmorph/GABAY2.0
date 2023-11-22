import { useState, useEffect } from 'react';

export const useForgotPasswordModel = () => {
    const [passwordData, setPasswordData] = useState({
        newPassword: '',
        confirmNewPassword: '',
      });
    
      const [errors, setErrors] = useState({});
      const [isPasswordValid, setIsPasswordValid] = useState(true);
      const [isUppercase, setIsUppercase] = useState(false);
      const [isLowercase, setIsLowercase] = useState(false);
      const [hasNumber, setHasNumber] = useState(false);
      const [hasSymbol, setHasSymbol] = useState(false);
      const [showModalMessage, setShowModalMessage] = useState(false);

      useEffect(() => {
        if (passwordData.newPassword) {
          setIsPasswordValid(isValidPassword(passwordData.newPassword));
          setIsUppercase(/[A-Z]/.test(passwordData.newPassword));
          setIsLowercase(/[a-z]/.test(passwordData.newPassword));
          setHasNumber(/[0-9]/.test(passwordData.newPassword));
          setHasSymbol(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(passwordData.newPassword));
        }
      }, [passwordData.newPassword]);
    
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
        showModalMessage,
        setShowModalMessage
      };
};
