import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState({ text: '', type: '' })

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInBlogappUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedInBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage({ text: 'Login successful', type: 'success' })
      setTimeout(() => setMessage({ text: '', type: '' }), 3000)
    } catch (exception) {
      setMessage({ text: 'Wrong username or password', type: 'error' })
      setTimeout(() => setMessage({ text: '', type: '' }), 3000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedInBlogappUser')
      blogService.setToken()
      setUser(null)
      setUsername('')
      setPassword('')
      setMessage({ text: 'Logout successful', type: 'success' })
      setTimeout(() => setMessage({ text: '', type: '' }), 3000)
    } catch (exception) {
      setMessage({ text: `${exception}`, type: 'error' })
      setTimeout(() => setMessage({ text: '', type: '' }), 3000)
    }
  }

  const handleLike = async (event, blog) => {
    event.preventDefault()
    const { likes, ...rest } = blog
    const updatedBlog = { ...rest, likes: likes + 1 }
    try {
      blogService.update(blog.id, updatedBlog)
      const updatedBlogs = await blogService.getAll()
      setBlogs(updatedBlogs)
      setMessage({ text: `Liked '${blog.title}'`, type: 'success' })
      setTimeout(() => setMessage({ text: '', type: '' }), 3000)
    } catch (exception) {
      setMessage({ text: `${exception}`, type: 'error' })
      setTimeout(() => setMessage({ text: '', type: '' }), 3000)
    }
  }

  const handleDelete = async (event, blog) => {
    event.preventDefault()
    try {
      await blogService.remove(blog.id)
      const updatedBlogs = await blogService.getAll()
      setBlogs(updatedBlogs)
      setMessage({ text: `Successfully removed '${blog.title}'`, type: 'success' })
      setTimeout(() => setMessage({ text: '', type: '' }), 3000)
    } catch (exception) {
      setMessage({ text: `${exception}`, type: 'error' })
      setTimeout(() => setMessage({ text: '', type: '' }), 3000)
    }
  }

  const handleCreateBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      const updatedBlogs = await blogService.getAll()
      setBlogs(updatedBlogs)
      setMessage({ text: `'${returnedBlog.title}' was added to the blog list`, type: 'success' })
      setTimeout(() => setMessage({ text: '', type: '' }), 3000)
      blogFormRef.current.toggleVisibility()
    } catch (error) {
      setMessage({ text: `${error.response.data.error}`, type: 'error' })
      setTimeout(() => setMessage({ text: '', type: '' }), 3000)
    }
  }

  return (
    <div>
      <Notification text={message.text} type={message.type} />

      {user === null ?
        <LoginForm password={password} username={username} setPassword={setPassword}
          setUsername={setUsername} handleLogin={handleLogin} /> :
        <div>
          <p>user: {user.name} <button onClick={handleLogout}>logout</button></p>
          <Togglable buttonLabel={'New Blog'} ref={blogFormRef}>
            <BlogForm onSubmit={handleCreateBlog} />
          </Togglable>
          <h2>blogs</h2>
          {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
            <Blog key={blog.id} blog={blog} handleLike={handleLike}
              handleDelete={handleDelete} username={user.username} />
          )}
        </div>
      }
    </div>
  )
}

export default App