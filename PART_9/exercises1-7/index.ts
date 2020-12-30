import express from 'express';
import {calculateBmi} from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  if(!req.query.weight || !req.query.height){
    res.send('error')
    return
  }
  if(!isNaN(Number(req.query.weight)) && !isNaN(Number(req.query.height))){
  let result: string =  calculateBmi(Number(req.query.height), Number(req.query.weight))
  console.log(result)
  res.json({
    height: Number(req.query.height),
    weight: Number(req.query.weight),
    bmi: result
  })
  return
  } 
  res.send('error')
  });
const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});