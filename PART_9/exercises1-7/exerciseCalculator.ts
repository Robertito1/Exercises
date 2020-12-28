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
            switch(rating){
               case 1: 
               return 'Try harder next week';
               case 2:
               return 'Good job, there is room for improvement';
               case 3:
               return 'Excellent job! keep it up.';
            }   
        }
        constructor(data: Array<number>, target: number){
           this.totalDays = data.length;
           this.trainingDays = data.filter(e => e !== 0).length;
           this.targetAverage = target;
           this.achievedAverage = data.reduce((a, c ) => a + c) / 7;
           this.success = this.achievedAverage >= target ? true : false;
           this.rating = this.calcRating(this.achievedAverage, target);
           this.ratingDescription = this.getFeedback(this.rating);
        }     
    }

  let calculateExercise = (data: Array<number>, target: number) : Result => {
   let output =  new ResultObject(data,target)
     const {calcRating, getFeedback, ...rest} = output
     return rest
  }
  console.log(calculateExercise([1,0,2.5,4,0.4,3.1,2], 2))