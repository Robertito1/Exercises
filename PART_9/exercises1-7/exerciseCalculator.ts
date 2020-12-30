   export {};

   interface ExerciseValues {
       days: Array<number>;
       target: number
   }
   interface Result  {
     totalDays: number;
     trainingDays: number;
     targetAverage: number;
     achievedAverage: number;
     success: boolean;
     rating: number;
     ratingDescription: string;
  }
    class ResultObject {
        totalDays: number;
        trainingDays: number;
        targetAverage: number;
        achievedAverage: number;
        success: boolean;
        rating: number;
        ratingDescription: string;
        
         calcRating =  (ave: number, target: number): number =>{
            if(ave >= target){
                return 3;
            } else if ((ave/target)* 100 >= 75){
                return 2;
            }else {
                return 1;
            } 
        }

         getFeedback = (rating: number): string =>{
           let output: string = ''
            switch(rating){
               case 1: 
               output = 'Try harder next week';
               case 2:
               output = 'Good job, there is room for improvement';
               case 3:
               output = 'Excellent job! keep it up.';
               return output
            }  
            return output
        }
        constructor(data: Array<number>, target: number){
           this.totalDays = data.length;
           this.trainingDays = data.filter(e => e !== 0).length;
           this.targetAverage = target;
           this.achievedAverage = data.reduce((a, c ) => a + c) / this.totalDays;
           this.success = this.achievedAverage >= target ? true : false;
           this.rating = this.calcRating(this.achievedAverage, target);
           this.ratingDescription = this.getFeedback(this.rating);
        }     
    }

    let parseArguments = (args: Array<string>): ExerciseValues => {
        if (args.length < 4) throw new Error('Not enough arguments');
      
        if (args.slice(2).find(e => isNaN(Number(e)))) {
         throw new Error('Provided values were not all numbers!');
        } else {
            return {
                days: args.slice(2, args.length - 1).map(e => Number(e)),
                target: Number(args[args.length - 1])
              }
        }
      }

  let calculateExercise = (data: Array<number>, target: number) : Result => {
   let output =  new ResultObject(data,target)
     const {calcRating, getFeedback, ...rest} = output
     return rest
  }
  try {
    const { days, target } = parseArguments(process.argv);
    console.log(calculateExercise(days, target));
  } catch (e) {
    console.log('Error, something bad happened, message: ', e.message);
  }