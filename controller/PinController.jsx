import { useNavigation } from '@react-navigation/native';
import { usePinModel } from '../model/PinModel'; // Import the model

export const usePinController = () => {
  const navigation = useNavigation();
  const { pin, setPin, pinError, setPinError } = usePinModel();

  const reSend = () => {
    navigation.navigate('Verify');
  };

  const handleVerify = () => {
    // Clear existing errors
    setPinError(null);

    // Validate pin
    if (!pin) {
      setPinError('PIN is required');
    } else if (!isValidPin(pin)) {
      setPinError('Wrong PIN');
    } else {
      navigation.navigate('Log in');
    }
  };

  const isValidPin = (pin) => {
    const viPin = /5/;
    return viPin.test(pin);
  };

  return { pin, setPin, pinError, setPinError, handleVerify, reSend };
};
