import { useState } from 'react';

export const useMonthlyIncomeModel = () => {
  const [income, setIncome] = useState('');
  const [incomeError, setIncomeError] = useState(null);

  return { income, setIncome, incomeError, setIncomeError };
};
