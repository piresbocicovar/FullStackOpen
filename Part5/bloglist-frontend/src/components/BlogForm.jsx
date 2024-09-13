import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = ({ blogFormRef }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    if (newTitle === '' || newAuthor === '' || newUrl === '') {
      alert('All fields are required')
    } else {
      const blogObject = {
        title: newTitle,
        author: newAuthor,
        url: newUrl,
      }
      dispatch(createBlog(blogObject))
      dispatch(notify(`'${newTitle}' was added to the blog list`, 'success'))
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
      blogFormRef.current.toggleVisibility()
    }
  }

  return (
    <>
      <h2>New Blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input
            value={newTitle}
            onChange={({ target }) => setNewTitle(target.value)}
            placeholder='Enter blog title'
          />
        </div>
        <div>
          author:
          <input
            value={newAuthor}
            onChange={({ target }) => setNewAuthor(target.value)}
            placeholder='Enter author name'
          />
        </div>
        <div>
          url:
          <input
            value={newUrl}
            onChange={({ target }) => setNewUrl(target.value)}
            placeholder='Enter blog URL'
          />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
    </>
  )
}

export default BlogForm