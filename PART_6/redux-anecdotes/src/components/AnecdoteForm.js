import React from "react"
import { createAnecdote } from "../reducers/anecdoteReducer"
import {notificationSet} from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'




const AnecdoteForm = () => {

const dispatch = useDispatch()

const addAnecdote = async (e) =>{
    e.preventDefault()
    const anecdote = e.target.newAnecdote.value
    e.target.newAnecdote.value = ''
    dispatch(createAnecdote(anecdote))
    dispatch(notificationSet(`you created a new anecdote '${anecdote}'` , 5))
   }


    return ( <div>
         <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <input name="newAnecdote"/>
        <button type="submit">create</button>
      </form>
    </div> );
}
 
export default AnecdoteForm;