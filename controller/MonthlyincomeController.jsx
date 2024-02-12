import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {useMonthlyIncomeModel} from '../model/MonthlyincomeModel';
import { axiosRequest } from '../api_server/axios';
import UserContext from '../api_server/context';


export const useMonthlyIncomeController = () => {
    const {context} = React.useContext(UserContext)
    const navigation = useNavigation();
    const { income, setIncome, incomeError, setIncomeError, savings, savingsError, setSavings, setSavingsError, showModalMessage, setShowModalMessage, loader, setLoader, showModalEEMessage, setShowModalEEMessage } = useMonthlyIncomeModel();
    const Data = {
      user : context.id,
      title : "Main",
      amount : parseInt(income.replace(/,/g, ''), 10),
      icon : 36
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
    const handleSavingsChange = (text) => {
      // Clear existing errors
      setSavingsError(null);
      // Remove non-digit characters
      const numericValue = text.replace(/[^0-9]/g, '');
  
      // Format the numeric value with commas
      const formattedIncome = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
      setSavings(formattedIncome);
    };

    const startButtonPressed = () => {
      // Clear existing errors
      setIncomeError(null);
      setSavingsError(null);
      // Validate income
      if (!income) {
        setIncomeError('Income is required');
      } 
      else if (!savings){
        setSavingsError('Savings is required')
      }
      else {
        setLoader(true)
        axiosRequest.post('gabay/add/',Data).then((response)=>{
          setTimeout(() => {
            setShowModalMessage(true);
            setLoader(false)
          }, 4000);

        }).catch((e)=>{
          console.log(e)
        setShowModalEEMessage(true);
          setTimeout(() => setShowModalEEMessage(false), 500);
          
        })
      }
    };
  
    return { income, setIncome, incomeError, setIncomeError, savings, savingsError, setSavings, setSavingsError, handleSavingsChange, handleIncomeChange, startButtonPressed,showModalMessage, setShowModalMessage,loader, setLoader, showModalEEMessage, setShowModalEEMessage };
  };