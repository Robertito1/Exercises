import React, { useState, useEffect} from 'react'
import { useLazyQuery, useQuery} from '@apollo/client'
import {RECOMMENDED, USER} from '../queries'

const Books = (props) => {

    const [user, setUser] = useState({})

    const result = useQuery(USER)
    const [getRecommended, {loading,data}] = useLazyQuery(RECOMMENDED)

    useEffect(()=>{
        if(!result.loading){
          setUser({...result.data.me})
          getRecommended(
            {variables: { genre: user.favoriteGenre}}
          )
        }
    },[setUser, result, getRecommended, user.favoriteGenre])

  if (!props.show) {
    return null
  }

  if (loading)  {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>books</h2>  
      <p>
          books in your favourite genre: <span>
             <b>{user.favoriteGenre}</b> 
          </span>
        </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {data.allBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books