import anecdoteService from '../services/anecdotes'


const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE': 
      const votedAnecdote = action.data
      return state.map(e => e.id !== votedAnecdote.id ? e : {...e, votes: votedAnecdote.votes } )
    case 'CREATE_NEW':
      return [...state, action.data]
      case 'INIT_ANECDOTES':
      return action.data
    default: return state
  }
}

export const createAnecdote =(anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
      dispatch({ type: 'CREATE_NEW',
     data : newAnecdote,
    })
  }
}

export const addVoteTo = (anecdote) =>{
  return async dispatch => {
    const votedAnecdote = await anecdoteService.voteAnecdote(anecdote)
    dispatch({type: 'VOTE',
    data: votedAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({type: 'INIT_ANECDOTES',
    data: anecdotes,
    })
  }
}

export default reducer