import { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ setBlogs, blogs, setMessage, toggleVisibility }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    if (newTitle === '') {
      alert('Field "Title" can\'t be empty')
    } else if (newAuthor === '') {
      alert('Field "Author" can\'t be empty')
    } else if (newUrl === '') {
      alert('Field "Url" can\'t be empty')
    } else {
      const BlogObject = {
        title: newTitle,
        author: newAuthor,
        url: newUrl
      }
      try {
        const returnedBlog = await blogService.create(BlogObject)
        const updatedBlogs = await blogService.getAll()
        setBlogs(updatedBlogs)
        setMessage({ text: `'${returnedBlog.title}' was added to the blog list`, type: 'success' })
        setTimeout(() => {
          setMessage({ text: '', type: '' })
        }, 3000)
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
        toggleVisibility()
      } catch (error) {
        console.log(error)
        setMessage({
          text: `${error.response.data.error}`,
          type: 'error'
        })
        setTimeout(() => {
          setMessage({ text: '', type: '' })
        }, 3000)
      }
    }
  }


  return(
    <>
      <h2>New Blog</h2>
      <form onSubmit={addBlog}>
        <div>
            title: <input value={newTitle} onChange={({ target }) => setNewTitle(target.value)}/>
        </div>
        <div>
            author: <input value={newAuthor} onChange={({ target }) => setNewAuthor(target.value)}/>
        </div>
        <div>
            url: <input value={newUrl} onChange={({ target }) => setNewUrl(target.value)}/>
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
    </>
  )
}

export default BlogForm