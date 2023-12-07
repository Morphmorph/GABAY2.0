import { useState } from 'react';

export const useLoginModel = () => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const [loader,SetLoader] = useState(false)
  const [showModalMessage, setShowModalMessage] = useState(false);
  const [showModalEMessage, setShowModalEMessage] = useState(false);
  const [showModalEEMessage, setShowModalEEMessage] = useState(false);
  const [showModalEEEMessage, setShowModalEEEMessage] = useState(false);
  const [errors, setErrors] = useState({});

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  return { inputs, setInputs, errors, setErrors, isValidEmail,loader,SetLoader, showModalMessage, showModalEEEMessage, setShowModalEEEMessage, setShowModalMessage, showModalEMessage, setShowModalEMessage, showModalEEMessage, setShowModalEEMessage};
};
