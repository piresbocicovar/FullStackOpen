import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import { notify } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'

const App = () => {
  const [user, setUser] = useState(null)
  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInBlogappUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedInBlogappUser')
      blogService.setToken()
      setUser(null)
      dispatch(notify('Logout successful', 'success'))
    } catch (exception) {
      dispatch(notify(`${exception}`, 'error'))
    }
  }

  return (
    <div>
      <Notification />

      {user === null ? (
        <LoginForm setUser={setUser} />
      ) : (
        <div>
          <p>
            user: {user.name} <button onClick={handleLogout}>logout</button>
          </p>
          <Togglable buttonLabel={'New Blog'} ref={blogFormRef}>
            <BlogForm blogFormRef={blogFormRef} />
          </Togglable>
          <h1>blogs</h1>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map(blog => (
              <Blog
                key={blog.id}
                blog={blog}
                username={user.username}
              />
            ))}
        </div>
      )}
    </div>
  )
}

export default App