import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Testing the blog component to show that it', () => {
  test('renders content', () => {
    const blog = {
      title: 'Data Structures',
      author: 'Brad Travesy',
      url: 'https://travesymedia.com',
      likes: 5,
    }
    const user = {
      username: 'tito',
    }

    const component = render(
      <Blog blog={blog} user={user} handleDelete={() => {}} />
    )

    expect(component.container).toHaveTextContent('Data Structures')
    expect(component.container).toHaveTextContent('Brad Travesy')
    expect(component.container).not.toHaveTextContent(
      'https://travesymedia.com'
    )
    expect(component.container).not.toHaveTextContent('5')
  })

  test('fires event function onclicking of the button', () => {
    const blog = {
      title: 'Data Structures',
      author: 'Brad Travesy',
      url: 'https://travesymedia.com',
      likes: 5,
      user: {
        name: 'root',
      },
    }
    const user = {
      username: 'tito',
      name: 'root',
    }

    const component = render(
      <Blog blog={blog} user={user} handleDelete={() => {}} />
    )

    const button = component.getByText('expand')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent('https://travesymedia.com')
    expect(component.container).toHaveTextContent('5')
  })

  test('increases the likes when its clicked', () => {
    const blog = {
      title: 'Data Structures',
      author: 'Brad Travesy',
      url: 'https://travesymedia.com',
      likes: 5,
      user: {
        name: 'root',
      },
    }
    const user = {
      username: 'tito',
      name: 'root',
    }

    const mockHandler = jest.fn()

    const component = render(
      <Blog blog={blog} user={user} handleDelete={mockHandler} />
    )
    const expand = component.getByText('expand')
    fireEvent.click(expand)
    const button = component.getByText('delete')

    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
