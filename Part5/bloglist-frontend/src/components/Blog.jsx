import { useState } from 'react'
import './Blog.css'
import { useDispatch } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import { initializeBlogs, updateLikes, deleteBlog } from '../reducers/blogReducer'

const Blog = ({ blog, username }) => {
  const [showInfo, setShowInfo] = useState(false)
  const dispatch = useDispatch()

  const toggleInfo = () => setShowInfo(prev => !prev)

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
    if (window.confirm(`delete '${blog.title}'?`)) {
      try {
        dispatch(deleteBlog(blog.id))
        dispatch(initializeBlogs())
        dispatch(notify(`Successfully removed '${blog.title}'`, 'success'))
      } catch (exception) {
        dispatch(notify(`${exception}`, 'error'))
      }
    }
  }

  return (
    <div className="blog">
      {showInfo ? (
        <>
          <h2 className="blog-title">{blog.title}</h2>
          <button className="toggle-button" onClick={toggleInfo}>
            Hide
          </button>
          <p>
            <strong>Author:</strong> {blog.author}
          </p>
          <p>
            <strong>Likes:</strong> {blog.likes}
          </p>
          <p>
            <strong>URL:</strong> {blog.url}
          </p>
          <p>
            <strong>Posted by:</strong> {blog.user ? blog.user.name : ''}
          </p>
          <button
            className="action-button"
            onClick={handleLike}
          >
            Like
          </button>
          {blog.user && username === blog.user.username && (
            <button
              className="action-button"
              onClick={handleDelete}
            >
              Delete
            </button>
          )}
        </>
      ) : (
        <>
          <h2 className="blog-title">{blog.title}</h2>
          <p>by {blog.author}</p>
          <button className="toggle-button" onClick={toggleInfo}>
            View
          </button>
        </>
      )}
    </div>
  )
}

export default Blog
