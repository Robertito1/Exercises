import React from "react";
import ReactDOM from "react-dom";


interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescriptionBase extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartDescriptionBase {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartDescriptionBase {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartDescriptionBase {
  name: "The fourth course";
}


type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

const assertNever = (value: never): never => {
  throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};
const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  switch (part.name) {
      case "Fundamentals":
          return (<p>{part.name} {part.description} {part.exerciseCount}</p>);
      case "Using props to pass data":
          return (<p>{part.name} {part.exerciseCount} {part.groupProjectCount}</p>);
      case "Deeper type usage":
          return (<p>{part.name} {part.description} {part.exerciseCount} {part.exerciseSubmissionLink}</p>);
      case "The fourth course":
          return (<p>{part.name} {part.description} {part.exerciseCount}</p>);
      default:
          return assertNever(part);
  }
};

const Header: React.FC<{ name: string }> =({name}) =><h1>{name}</h1>

const Content: React.FC<{courseParts: CoursePart[]} > =({courseParts}) =>{
  return (
    <div>
        {courseParts.map((value: CoursePart) => <Part part={value} key={value.name} />)}
    </div>
);
   }
const Total: React.FC<{ total: number }> =({total}) =><h1>{total}</h1>

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "The fourth course",
      exerciseCount: 11,
      description: "Decisive description"
    }
  ];
  const total = courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)
  return (
    <div>
     <Header name={courseName}/>
     <Content courseParts={courseParts}/>
     <Total total={total} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
