const filterReducer = (state = '', action) => {
    switch (action.type) {
      case 'FILTER_ANECDOTES':
        return state = action.search.toLowerCase()
      default:
        return state
    }
  }
  
  export const handlefilter = (value) => {
    return {
      type: 'FILTER_ANECDOTES',
      search:  value
    }
  }
  

  export default filterReducer