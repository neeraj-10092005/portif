
import React from 'react';

interface DisplayProps {
  value: string;
  expression: string;
}

const Display: React.FC<DisplayProps> = ({ value, expression }) => {
  // Format large numbers with commas
  const formatNumber = (num: string) => {
    // Don't format if it contains a decimal point
    if (num.includes('.')) return num;
    
    // Add commas for thousands
    return Number(num).toLocaleString('en-US');
  };

  // Adjust font size based on length of number
  const getFontSize = () => {
    if (value.length > 10) return 'text-2xl';
    if (value.length > 8) return 'text-2xl';
    return 'text-3xl';
  };

  return (
    <div className="bg-gray-800 p-4 rounded-t-lg text-right">
      <div className="text-gray-400 h-6 text-sm mb-1 overflow-x-auto whitespace-nowrap">
        {expression || '\u00A0'}
      </div>
      <div className={`text-white ${getFontSize()} font-medium overflow-x-auto transition-all`}>
        {value ? formatNumber(value) : '0'}
      </div>
    </div>
  );
};

export default Display;
