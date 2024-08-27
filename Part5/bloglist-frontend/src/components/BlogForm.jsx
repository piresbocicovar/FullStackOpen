import { useState } from 'react'

const BlogForm = ({ onSubmit }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (newTitle === '' || newAuthor === '' || newUrl === '') {
      alert('All fields are required')
    } else {
      const BlogObject = {
        title: newTitle,
        author: newAuthor,
        url: newUrl
      }
      onSubmit(BlogObject)
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
    }
  }

  return (
    <>
      <h2>New Blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title: <input
            value={newTitle}
            onChange={({ target }) => setNewTitle(target.value)}
            placeholder="Enter blog title"
          />
        </div>
        <div>
          author: <input
            value={newAuthor}
            onChange={({ target }) => setNewAuthor(target.value)}
            placeholder="Enter author name"
          />
        </div>
        <div>
          url: <input
            value={newUrl}
            onChange={({ target }) => setNewUrl(target.value)}
            placeholder="Enter blog URL"
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