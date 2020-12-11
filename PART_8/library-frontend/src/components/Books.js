import React, { useState} from 'react'
import {useQuery} from '@apollo/client'
import {ALL_BOOKS} from '../queries'

const Books = (props) => {

  const [genre, setGenre] = useState('all genres')
  const books = useQuery(ALL_BOOKS)
   

  if (!props.show) {
    return null
  }

  if (books.loading)  {
    return <div>loading...</div>
  }
  const allBooks = books.data.allBooks

  const booksByGenre = (genre) =>{
          if(genre === 'all genres'){
            console.log(allBooks)
            return allBooks
          }
          console.log(allBooks)
         return allBooks.filter(book => book.genres.includes(genre))
        }
  return (
    <div>
      <h2>books</h2>  
        <p>
          In genre: <span>
             <b> {genre}</b>
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
          {booksByGenre(genre).map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div> 
        <button onClick={() => setGenre('refactoring')}>refactoring</button>
        <button onClick={() => setGenre('agile')}>agile</button>
        <button onClick={() => setGenre('patterns')}>patterns</button>
        <button onClick={() => setGenre('design')}>design</button>
        <button onClick={() => setGenre('crime')}>crime</button>
        <button onClick={() => setGenre('classic')}>classic</button>
        <button onClick={() => setGenre('all genres')}>all genres</button>
      </div>
    </div>
  )
}

export default Books