import React, { useState }from 'react'
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries'  
import { useQuery, useMutation } from '@apollo/client';
import Select from "react-select";


const Authors = ({show, token}) => {

  const [selectedOption, setSelectedOption] = useState(null);
  const [year, setYear] = useState('')
  const authors = useQuery(ALL_AUTHORS)
  const [ updateAge ] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })
  if (!show) {
    return null
  }
  
  if (authors.loading)  {
    return <div>loading...</div>
  }
  const options = authors.data.allAuthors.map(e => ({value: e.name, label: e.name}))

  const handleUpdate = async (event) => {
    event.preventDefault()
   await updateAge({  variables: { name: selectedOption.value, setBornTo: year } })
   setYear('')
  }
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
     
      {token?
       <div>
      <h3>Set Birth Year</h3>
          <form onSubmit={handleUpdate}>
              <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
            />
            <div>
            born
            <input 
            type='number'
            value={year} 
            onChange={({ target }) => setYear(parseInt(target.value, 10))}
            />
            </div>
            <button type='submit'>update author</button>
          </form>  
      </div> : null}
      
    </div>
  )
}

export default Authors
