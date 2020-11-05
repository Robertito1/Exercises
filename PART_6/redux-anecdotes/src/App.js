import React, {useEffect} from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import {initializeAnecdotes} from './reducers/anecdoteReducer'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
   dispatch(initializeAnecdotes())
  }, [dispatch])

  return (
    <div>
    <Filter />
    <Notification/>
    <AnecdoteList/>
    <AnecdoteForm/>
    </div>
  )
}

export default App