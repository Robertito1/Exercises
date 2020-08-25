import React from 'react'



const Header = ({ title }) => {
    return (
        <h1>{title}</h1>
    )
}


const Content = ({ parts }) => {
    return (
        <div>
            {
                parts.map(part => <div key={part.id}>{part.name} {part.exercises}</div>)
            }
        </div>
    )
}



const Total = ({ parts }) => {
    let initial = 0
    const total =
        parts.reduce((s, p) => s + p.exercises, initial)
    return (
        <b>total of {total} exercises</b>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header title={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>

    );
}

export default Course;