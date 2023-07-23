
export const calculateBmi = (height: number, weight: number) => {
  const bmi =  weight / (Math.pow(height / 100, 2));
  if (bmi < 18.5) {
    return 'Underweight ';
  } else if (bmi >= 25 && bmi < 30) {
    return 'Overweight';
  } else if (bmi >= 30) {
    return 'Obese';
  } else {
    return 'Normal (healthy weight)';
  }
};

console.log(process.argv);
const height = Number(process.argv[2]);
const weight = Number(process.argv[3]);

console.log(calculateBmi(height, weight));
