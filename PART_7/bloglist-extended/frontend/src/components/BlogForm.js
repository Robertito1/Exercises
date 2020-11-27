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
      <form onSubmit={addBlog} id="form" className='ml-3'>
        <div>
          title: <input name="title" className='mb-2'/>
        </div>
        <div>
          author: <input name="author" className='mb-2'/>
        </div>
        <div>
            url: <input name="url" className='mb-2'/>
        </div>
        <button type="submit" id="save" className='btn btn-success mb-3'>
          save
        </button>
      </form>
    </div>
  )
}

export default BlogForm
