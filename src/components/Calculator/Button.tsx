
import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps {
  value: string;
  onClick: (value: string) => void;
  variant?: 'primary' | 'secondary' | 'operator' | 'equals';
  className?: string;
  doubleWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  value, 
  onClick, 
  variant = 'primary',
  className,
  doubleWidth = false
}) => {
  const baseStyle = "font-medium h-14 rounded-md transition-all duration-100 active:scale-95 flex items-center justify-center";
  
  const variantStyles = {
    primary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    secondary: "bg-gray-700 hover:bg-gray-600 text-white",
    operator: "bg-blue-500 hover:bg-blue-600 text-white",
    equals: "bg-orange-500 hover:bg-orange-600 text-white"
  };
  
  const handleClick = () => {
    onClick(value);
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        baseStyle,
        variantStyles[variant],
        doubleWidth ? "col-span-2" : "",
        className
      )}
    >
      {value}
    </button>
  );
};

export default Button;
