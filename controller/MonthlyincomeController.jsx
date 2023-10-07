import { useNavigation } from '@react-navigation/native';
import {useMonthlyIncomeModel} from '../model/MonthlyincomeModel';

export const useMonthlyIncomeController = () => {
    const navigation = useNavigation();
    const { income, setIncome, incomeError, setIncomeError } = useMonthlyIncomeModel();
  
    const handleIncomeChange = (text) => {
      // Clear existing errors
      setIncomeError(null);
  
      // Remove non-digit characters
      const numericValue = text.replace(/[^0-9]/g, '');
  
      // Format the numeric value with commas
      const formattedIncome = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
      setIncome(formattedIncome);
    };
  
    const startButtonPressed = () => {
      // Clear existing errors
      setIncomeError(null);
  
      // Validate income
      if (!income) {
        setIncomeError('Income is required');
      } else {
        navigation.navigate('Home');
      }
    };
  
    return { income, setIncome, incomeError, setIncomeError, handleIncomeChange, startButtonPressed };
  };