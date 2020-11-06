import React from 'react'
import { connect } from 'react-redux'
import {addVoteTo} from "../reducers/anecdoteReducer"
import {notificationSet} from '../reducers/notificationReducer'
//  import { useDispatch } from 'react-redux'

const AnecdoteList = (props) => {
 
 const anecdotesToShow = props.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(props.filter))
  .sort((a,b) => a.votes -b.votes)
  .reverse()
//  const dispatch = useDispatch()

 const vote = (id) => {
  const anecdote = props.anecdotes.find(e => e.id === id)
    props.addVoteTo(anecdote)
    props.notificationSet(`you voted '${anecdote.content}'`, 5)
  }

    return ( <div>
  <h2>Anecdotes</h2>
      {anecdotesToShow.map(anecdote =>
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

const mapStateToProps = (state) => {
 return { 
   filter: state.filter,
   anecdotes:state.anecdotes
  }
}

const mapDispatchToProps = {
  addVoteTo,
  notificationSet
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdoteList
