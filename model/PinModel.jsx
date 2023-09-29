import { useState } from 'react';

export const usePinModel = () => {
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(null);

  return { pin, setPin, pinError, setPinError };
};
