type Operation = 'multiply' | 'add' | 'divide';

type CalculatorFn = number;

const calculator = (a: number, b: number, op: Operation): CalculatorFn => {
  switch (op) {
    case 'multiply':
      return a * b;
    case 'add':
      return a + b;
    case 'divide':
      if (b === 0) throw new Error("Can't divide by 0!");
      return a / b;
    default:
      throw new Error('Operation is not multiply, add or divide.');
  }
};

try {
  console.log(calculator(2, 0, 'multiply'));
} catch (error) {
  console.log('error:', error.message);
}
