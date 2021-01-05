import React from "react";
import ReactDOM from "react-dom";



interface contentProps {
  courses: {
    name: string;
    exerciseCount: number;
  }[];
}
const Header: React.FC<{ name: string }> =({name}) =><h1>{name}</h1>

const Content: React.FC<contentProps> =(props) =>{
 return props.courses.map(e => <p key={e.name}>{e.name} {e.exerciseCount}</p>) as unknown as JSX.Element
}
const Total: React.FC<{ total: number }> =({total}) =><h1>{total}</h1>

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];
  const total = courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)
  return (
    <div>
     <Header name={courseName}/>
     <Content courses={courseParts}/>
     <Total total={total} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
