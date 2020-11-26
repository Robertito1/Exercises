import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('The Form component calls onSubmit with the correct input values', () => {
  const createBlog = jest.fn()

  const component = render(<BlogForm createBlog={createBlog} />)

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'Data Structures' },
  })
  fireEvent.change(author, {
    target: { value: 'Brad Travesy' },
  })
  fireEvent.change(url, {
    target: { value: 'https://travesymedia.com' },
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Data Structures')
  expect(createBlog.mock.calls[0][0].author).toBe('Brad Travesy')
  expect(createBlog.mock.calls[0][0].url).toBe('https://travesymedia.com')
})
