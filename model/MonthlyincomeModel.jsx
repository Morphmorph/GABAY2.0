import { useState } from 'react';

export const useMonthlyIncomeModel = () => {
  const [income, setIncome] = useState('');
  const [incomeError, setIncomeError] = useState(null);
  const [savings, setSavings] = useState('');
  const [savingsError, setSavingsError] = useState(null);
  const [showModalMessage, setShowModalMessage] = useState(false);
  const [showModalEEMessage, setShowModalEEMessage] = useState(false);
  const [loader,setLoader] = useState(false)
  return { income, setIncome, incomeError, setIncomeError, savings, savingsError, setSavings, setSavingsError, showModalMessage, setShowModalMessage, loader, setLoader, showModalEEMessage, setShowModalEEMessage};
};
