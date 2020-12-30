import express from 'express';
import {calculateBmi} from './bmiCalculator';
import { calculateExercise} from './exerciseCalculator'
const app = express();

app.use(express.json())

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  if(!req.query.weight || !req.query.height){
    res.json({
      error: 'Please input the right parameters'
    })
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
  res.json({
    error: 'something went wrong'
  })
  });

  app.post('/exercises', (req, res) => {
    let body = req.body
    if(!body.dailyExercise || !body.target){
      res.json({
        error: 'Missing parameters'
      })
    return
    }
    if(!Array.isArray(body.dailyExercise) || body.dailyExercise.length ===  0 || body.dailyExercise.find((e: number) => isNaN(e)) || typeof body.target !== 'number' ){
      res.json({
        error: 'Malformated parameters'
      })
    return
    }
    res.json(calculateExercise(body.dailyExercise, body.target))
  })
const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});