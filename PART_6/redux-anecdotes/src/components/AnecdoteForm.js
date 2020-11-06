import React from "react"
import { connect } from 'react-redux'
import { createAnecdote } from "../reducers/anecdoteReducer"
import {notificationSet} from '../reducers/notificationReducer'
// import { useDispatch } from 'react-redux'


const AnecdoteForm = (props) => {

// const dispatch = useDispatch()

const addAnecdote = async (e) =>{
    e.preventDefault()
    const anecdote = e.target.newAnecdote.value
    e.target.newAnecdote.value = ''
    props.createAnecdote(anecdote)
    props.notificationSet(`you created a new anecdote '${anecdote}'` , 5)
   }


    return ( <div>
         <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <input name="newAnecdote"/>
        <button type="submit">create</button>
      </form>
    </div> );
}
const mapDispatchToProps ={
  createAnecdote,
  notificationSet
}

 const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm;