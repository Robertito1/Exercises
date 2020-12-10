import React, {useState, useEffect} from 'react'
import {useQuery} from '@apollo/client'
import {ALL_BOOKS} from '../queries'

const Books = (props) => {

  const [genre, setGenre] = useState('all')
  const [booksToShow, setBooksToShow] = useState([])
  const books = useQuery(ALL_BOOKS)



      // useEffect(()=>{
      //   const booksByGenre = (genre) =>{
      //     const allBooks = books.data? books.data.allBooks : null
      //       if(genre === 'all'){
      //         console.log(allBooks)
      //         return allBooks
      //       }
      //       console.log(allBooks)
      //      return allBooks.filter(book => book.genres.includes(genre))
      //     }
      // setBooksToShow(booksToShow.concat(booksByGenre(genre)))
      // }, [booksToShow, books.data, genre])

  if (!props.show) {
    return null
  }

  if (books.loading)  {
    return <div>loading...</div>
  }
  return (
    <div>
      <h2>books</h2>
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
          {booksToShow.map(a =>
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
        <button onClick={() => setGenre('all')}>all genres</button>
      </div>
    </div>
  )
}

export default Books