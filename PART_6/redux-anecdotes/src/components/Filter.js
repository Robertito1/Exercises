import React from 'react'
import { connect } from 'react-redux'
// import { useDispatch } from 'react-redux'
import { handlefilter } from "../reducers/filterReducer"


const Filter = (props) => {


    // const dispatch = useDispatch()

   const handleChange = (event) => {
    const value = event.target.value
    props.handlefilter(value)
  }
  const style = {
    marginBottom: 10
  }

  return ( 
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
  handlefilter
}

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)

export default ConnectedFilter