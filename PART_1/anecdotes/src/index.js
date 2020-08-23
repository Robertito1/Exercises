import React, { useState } from 'react'
import ReactDOM from 'react-dom'


// const Votes = (props) => {

//  

//   const updatePoints = () => {
//     setCurrentAnecdotePoint(currentAnecdotePoint + 1)
//     console.log(points)
//   }
//   return (
//     <div>
//       <p>has {currentAnecdotePoint} votes</p>
//       <button onClick={updatePoints}>upvote</button>
//     </div>

//   )
// }


const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(points)

  const pickAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))

  }

  const updatePoints = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
    console.log(votes)
  }
  const highestCount = (Math.max(...votes))
  const mostVoted = votes.indexOf(Math.max(...votes))

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} vote(s)</p>
      <button onClick={updatePoints}>upvote</button>
      <button onClick={pickAnecdote}>next anecdote</button>
      <h1>Anecdote With the highest vote</h1>
      <p>{anecdotes[mostVoted]}</p>
      <p>has {highestCount} vote(s)</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const points = new Array(anecdotes.length).fill(0)

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)





