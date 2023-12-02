import { useState } from 'react';
import React from 'react';
import UserContext from '../api_server/context';



export const useVerifyModel = () => {
  const {context} = React.useContext(UserContext)
  const [email, setEmail] = useState(context.email);
  const [emailError, setEmailError] = useState(null);
  const [loader,setLoader] = useState(false)
  const [showModalMessage, setShowModalMessage] = useState(false);
  const [showModalEMessage, setShowModalEMessage] = useState(false);
  const [showModalEEMessage, setShowModalEEMessage] = useState(false);
  return { email, setEmail, emailError, setEmailError,loader,setLoader, showModalMessage, setShowModalMessage, setShowModalEMessage, setShowModalEEMessage, showModalEMessage, showModalEEMessage };
};
