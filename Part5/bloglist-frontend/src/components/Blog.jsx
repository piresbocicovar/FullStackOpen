import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { initializeBlogs, updateLikes, deleteBlog } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import Comments from './Comments'
import './blog.css'

const Blog = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const blog = blogs.find(blog => blog.id === id)

  useEffect(() => {
    if (blogs.length === 0) {
      dispatch(initializeBlogs())
    }
  }, [dispatch, blogs.length])

  if (!blog) {
    return <p>Loading blog...</p>
  }

  const handleLike = async (event) => {
    event.preventDefault()
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    try {
      dispatch(updateLikes(updatedBlog))
      dispatch(notify(`Liked '${blog.title}'`, 'success'))
    } catch (exception) {
      dispatch(notify(`${exception}`, 'error'))
    }
  }

  const handleDelete = async (event) => {
    event.preventDefault()
    if (window.confirm(`Delete '${blog.title}'?`)) {
      try {
        dispatch(deleteBlog(blog.id))
        dispatch(notify(`Successfully removed '${blog.title}'`, 'success'))
      } catch (exception) {
        dispatch(notify(`${exception}`, 'error'))
      }
    }
  }

  return (
    <div className='blog-container'>
      <div className='blog-header'>
        <h1 className='blog-title'>Blog {blog.title}</h1>
        {blog.user && user.username === blog.user.username && (
          <Button
            variant='danger'
            className="action-button"
            onClick={handleDelete}
          >
          Delete blog
          </Button>
        )}
      </div>
      <a className='blog-url' href={`https://${blog.url}`} target="_blank" rel="noopener noreferrer">
        {blog.url}
      </a>
      <div className="blog-meta">
        <p><strong>Author:</strong> {blog.author}</p>
        <p><strong>Posted by: </strong><Link to={`/users/${blog.user.id}`}>{blog.user.name}</Link></p>
      </div>
      <div className="like-meta">
        <Button
          className="action-button"
          onClick={handleLike}
        >
    Like
        </Button>
        <p><strong>Likes:</strong> {blog.likes}</p>
      </div>
      <Comments blogId={blog.id} />
    </div>
  )
}

export default Blog