
import React, { useState } from 'react';
import Display from './Display';
import Keypad from './Keypad';
import { add, subtract, multiply, divide, percentage } from '@/utils/mathOperations';

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false);

  const handleNumberInput = (value: string) => {
    if (shouldResetDisplay) {
      setDisplay(value);
      setShouldResetDisplay(false);
    } else {
      setDisplay(display === '0' ? value : display + value);
    }
  };

  const handleDecimalPoint = () => {
    if (shouldResetDisplay) {
      setDisplay('0.');
      setShouldResetDisplay(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperator = (operator: string) => {
    const currentValue = parseFloat(display);
    
    if (previousValue === null) {
      setPreviousValue(currentValue);
      setOperation(operator);
      setExpression(`${currentValue} ${operator}`);
      setShouldResetDisplay(true);
    } else if (operation) {
      const result = calculateResult();
      setPreviousValue(result);
      setOperation(operator);
      setExpression(`${result} ${operator}`);
      setDisplay(String(result));
      setShouldResetDisplay(true);
    }
  };

  const calculateResult = () => {
    const currentValue = parseFloat(display);
    if (previousValue === null || operation === null) return currentValue;

    let result: number;
    switch (operation) {
      case '+':
        result = add(previousValue, currentValue);
        break;
      case '-':
        result = subtract(previousValue, currentValue);
        break;
      case '×':
        result = multiply(previousValue, currentValue);
        break;
      case '÷':
        result = divide(previousValue, currentValue);
        break;
      default:
        return currentValue;
    }
    
    // Round to avoid floating point issues
    return Math.round(result * 1000000) / 1000000;
  };

  const handleEquals = () => {
    if (previousValue === null || operation === null) return;

    const currentValue = parseFloat(display);
    const result = calculateResult();
    
    setExpression(`${previousValue} ${operation} ${currentValue} =`);
    setDisplay(String(result));
    setPreviousValue(result); // Store result for chaining operations
    setOperation(null);
    setShouldResetDisplay(true);
  };

  const handleClear = () => {
    setDisplay('0');
    setExpression('');
    setPreviousValue(null);
    setOperation(null);
    setShouldResetDisplay(false);
  };

  const handlePercentage = () => {
    const value = parseFloat(display);
    const result = percentage(value);
    setDisplay(String(result));
  };

  const handlePlusMinus = () => {
    const value = parseFloat(display);
    setDisplay(String(-value));
  };

  const handleButtonClick = (value: string) => {
    if (value >= '0' && value <= '9') {
      handleNumberInput(value);
    } else if (value === '.') {
      handleDecimalPoint();
    } else if (value === '+' || value === '-' || value === '×' || value === '÷') {
      handleOperator(value);
    } else if (value === '=') {
      handleEquals();
    } else if (value === 'C') {
      handleClear();
    } else if (value === '%') {
      handlePercentage();
    } else if (value === '±') {
      handlePlusMinus();
    }
  };

  return (
    <div className="w-80 mx-auto shadow-2xl rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,0,0,0.2)]">
      <Display value={display} expression={expression} />
      <Keypad onButtonClick={handleButtonClick} />
    </div>
  );
};

export default Calculator;
