
// Basic math operations for calculator

// Add two numbers
export const add = (a: number, b: number): number => {
  return a + b;
};

// Subtract b from a
export const subtract = (a: number, b: number): number => {
  return a - b;
};

// Multiply two numbers
export const multiply = (a: number, b: number): number => {
  return a * b;
};

// Divide a by b
export const divide = (a: number, b: number): number => {
  if (b === 0) {
    return Infinity; // Handle division by zero
  }
  return a / b;
};

// Calculate percentage
export const percentage = (value: number): number => {
  return value / 100;
};
