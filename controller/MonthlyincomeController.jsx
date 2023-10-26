import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {useMonthlyIncomeModel} from '../model/MonthlyincomeModel';
import { axiosRequest } from '../api_server/axios';
import UserContext from '../api_server/context';


export const useMonthlyIncomeController = () => {
    const {context} = React.useContext(UserContext)
    const navigation = useNavigation();
    const { income, setIncome, incomeError, setIncomeError } = useMonthlyIncomeModel();
    const Data = {
      user : context.id,
      title : "Main",
      amount : parseInt(income.replace(/,/g, ''), 10),
      icon : 1
    }
  
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
      
        axiosRequest.post('gabay/add/',Data).then((response)=>{
          alert(`Task Failed Sucessfully!`)
          navigation.navigate('Home');

        }).catch((e)=>{
          console.log(Data)
        })
      }
    };
  
    return { income, setIncome, incomeError, setIncomeError, handleIncomeChange, startButtonPressed };
  };