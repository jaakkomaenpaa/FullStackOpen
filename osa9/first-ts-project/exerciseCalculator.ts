interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

export const calculateExercises = (target: number, trainingData: number[]) => {

  const trainingDays = trainingData.reduce((current, next) => current + (next !== 0 ? 1 : 0), 0);
  const average = trainingData.reduce((current, next) => current + next, 0) / trainingData.length;
  const rating = average >= target ? 3 : average + 0.5 >= target ? 2 : 1;
  const descriptions = {
    3: 'you reached your target',
    2: 'not too bad but could be better',
    1: 'bad'   
  };

  const result: Result = {
    periodLength: trainingData.length,
    trainingDays: trainingDays,
    success: average >= target,
    rating: rating,
    ratingDescription: descriptions[rating],
    target: target,
    average: average
  };

  return result;
};

const target = Number(process.argv[2]);
const trainingData = process.argv.slice(3).map(Number);
console.log(calculateExercises(target, trainingData));