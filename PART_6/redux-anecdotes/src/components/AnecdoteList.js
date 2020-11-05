import React from 'react'
import {addVoteTo} from "../reducers/anecdoteReducer"
import {notificationSet} from '../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {
 const filter = useSelector(state => state.filter)
 const anecdotes = useSelector(state => state.anecdotes)
    .filter(anecdote => anecdote.content.toLowerCase().includes(filter))
    .sort((a,b) => a.votes -b.votes)
    .reverse()
 const dispatch = useDispatch()

 const vote = (id) => {
  const anecdote = anecdotes.find(e => e.id === id)
    dispatch(addVoteTo(anecdote))
    dispatch(notificationSet(`you voted '${anecdote.content}'`, 5))
  }

    return ( <div>
  <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={()=>vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div> );
}
 
export default AnecdoteList;
