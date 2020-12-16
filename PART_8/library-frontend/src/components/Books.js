import React, { useState} from 'react'
import {useQuery, useSubscription} from '@apollo/client'
import {ALL_BOOKS, BOOK_ADDED} from '../queries'
import {useApolloClient} from '@apollo/client'

const Books = (props) => {

  const [genre, setGenre] = useState('all genres')
  const books = useQuery(ALL_BOOKS, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    },
    update: (store, response) => {
      const dataInStore = store.readQuery({ query: ALL_BOOKS })
      store.writeQuery({
        query: ALL_BOOKS,
        data: {
          ...dataInStore,
          allBooks: [ ...dataInStore.allBooks]
        }
      })
    }
  })
  

  const client = useApolloClient()


  const updateCacheWith = (addedBook) => {
    console.log('called')
    const includedIn = (set, object) => 
      set.map(book => book.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allPersons : dataInStore.allBooks.concat(addedBook) }
      })
    }   
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    }
  })

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