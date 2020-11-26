import React from 'react'

const BlogForm = ({ createBlog }) => {

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value
    })
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
  }

  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={addBlog} id="form">
        <div>
          title: <input name="title"/>
        </div>
        <div>
          author: <input name="author"/>
        </div>
        <div>
            url: <input name="url"/>
        </div>
        <button type="submit" id="save">
          save
        </button>
      </form>
    </div>
  )
}

export default BlogForm
