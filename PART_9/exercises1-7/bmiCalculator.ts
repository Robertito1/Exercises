

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

console.log(calculateBmi(180, 74))