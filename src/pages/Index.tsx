
import Calculator from '@/components/Calculator/Calculator';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Simple Calculator</h1>
      <Calculator />
      <p className="mt-8 text-sm text-gray-500">Perform basic calculations with ease</p>
    </div>
  );
};

export default Index;
