import React from "react"
import { createAnecdote } from "../reducers/anecdoteReducer"
import {notificationSet, notificationClear} from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'




const AnecdoteForm = () => {


const dispatch = useDispatch()


const addAnecdote = (e) =>{
    e.preventDefault()
    const anecdote = e.target.newAnecdote.value
    e.target.newAnecdote.value = ''
    dispatch(createAnecdote(anecdote))
    dispatch(notificationSet(`you created a new anecdote '${anecdote}'`))
    setTimeout(()=> dispatch(notificationClear()), 5000)
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