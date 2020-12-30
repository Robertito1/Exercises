interface BmiValues {
  value1: number;
  value2: number;
}
let parseArguments = (args: Array<string>): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

let calculateBmi = (height: number, weight: number) : string => {
  let bmi =   weight / Math.pow((height / 100),(2))
  if(bmi < 18.5){
    return 'Abnormal (under weight)'
  }else if(bmi >= 18.5 && bmi <= 24.9){
    return 'Normal (healthy weight)'
  }else if(bmi >= 25 && bmi <= 29.9){
    return 'Abnormal (over weight)'
  }else{
    return 'Abnormal (obese)'
  }
}

try {
  const { value1, value2 } = parseArguments(process.argv);
  console.log(calculateBmi(value1, value2));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}