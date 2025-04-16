
import React from 'react';
import Button from './Button';

interface KeypadProps {
  onButtonClick: (value: string) => void;
}

const Keypad: React.FC<KeypadProps> = ({ onButtonClick }) => {
  return (
    <div className="grid grid-cols-4 gap-2 p-3 bg-gray-900 rounded-b-lg">
      {/* Row 1 */}
      <Button value="C" onClick={onButtonClick} variant="secondary" />
      <Button value="±" onClick={onButtonClick} variant="secondary" />
      <Button value="%" onClick={onButtonClick} variant="secondary" />
      <Button value="÷" onClick={onButtonClick} variant="operator" />
      
      {/* Row 2 */}
      <Button value="7" onClick={onButtonClick} />
      <Button value="8" onClick={onButtonClick} />
      <Button value="9" onClick={onButtonClick} />
      <Button value="×" onClick={onButtonClick} variant="operator" />
      
      {/* Row 3 */}
      <Button value="4" onClick={onButtonClick} />
      <Button value="5" onClick={onButtonClick} />
      <Button value="6" onClick={onButtonClick} />
      <Button value="-" onClick={onButtonClick} variant="operator" />
      
      {/* Row 4 */}
      <Button value="1" onClick={onButtonClick} />
      <Button value="2" onClick={onButtonClick} />
      <Button value="3" onClick={onButtonClick} />
      <Button value="+" onClick={onButtonClick} variant="operator" />
      
      {/* Row 5 */}
      <Button value="0" onClick={onButtonClick} doubleWidth />
      <Button value="." onClick={onButtonClick} />
      <Button value="=" onClick={onButtonClick} variant="equals" />
    </div>
  );
};

export default Keypad;
