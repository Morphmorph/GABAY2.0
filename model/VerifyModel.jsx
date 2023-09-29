import { useState } from 'react';

export const useVerifyModel = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(null);

  return { email, setEmail, emailError, setEmailError };
};
