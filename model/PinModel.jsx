import { useState } from 'react';

export const usePinModel = () => {
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(null);
  const [showModalMessage, setShowModalMessage] = useState(false);
  return { pin, setPin, pinError, setPinError, showModalMessage, setShowModalMessage};
};
