import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'
import { Form, Button } from 'react-bootstrap'
import './BlogForm.css'

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
    <Form onSubmit={handleSubmit} className='blog-form'>
      <div className='form-group'>
        <Form.Label className='visually-hidden'>Title:</Form.Label>
        <Form.Control
          type='text'
          name='newTitle'
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder='Title'
        />
      </div>
      <div className='form-group'>
        <Form.Label className='visually-hidden'>Author:</Form.Label>
        <Form.Control
          type='text'
          name='newAuthor'
          value={newAuthor}
          onChange={(e) => setNewAuthor(e.target.value)}
          placeholder='Author'
        />
      </div>
      <div className='form-group'>
        <Form.Label className='visually-hidden'>URL:</Form.Label>
        <Form.Control
          type='text'
          name='newUrl'
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          placeholder='URL'
        />
      </div>
      <div className='form-buttons'>
        <Button variant='primary' type='submit'>
          Add
        </Button>
      </div>
    </Form>
  )
}

export default BlogForm