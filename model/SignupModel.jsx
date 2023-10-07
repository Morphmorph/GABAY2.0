import { useState, useEffect } from 'react';

export const useSignupModel = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isUppercase, setIsUppercase] = useState(false);
  const [isLowercase, setIsLowercase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSymbol, setHasSymbol] = useState(false);

  useEffect(() => {
    if (formData.password) {
      setIsPasswordValid(isValidPassword(formData.password));
      setIsUppercase(/[A-Z]/.test(formData.password));
      setIsLowercase(/[a-z]/.test(formData.password));
      setHasNumber(/[0-9]/.test(formData.password));
      setHasSymbol(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(formData.password));
    }
  }, [formData.password]);

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
  };
};
