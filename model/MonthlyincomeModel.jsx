import { useState } from 'react';

export const useMonthlyIncomeModel = () => {
  const [income, setIncome] = useState('');
  const [incomeError, setIncomeError] = useState(null);
  const [showModalMessage, setShowModalMessage] = useState(false);
  return { income, setIncome, incomeError, setIncomeError, showModalMessage, setShowModalMessage };
};
