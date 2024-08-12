import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [message, setMessage] = useState({text: '', type: ''})

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }
  
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
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
        blogService.create(BlogObject)
                     .then(returnedBlog => {
                        setBlogs(blogs.concat(returnedBlog))
                        setMessage({text:`'${returnedBlog.title}' was added to the blog list`, type: 'success'})
                        setTimeout(() => {
                          setMessage({text:'', type:''})
                        }, 3000)
                        setNewTitle('')
                        setNewAuthor('')
                        setNewUrl('')
                      })
                      .catch(error => {
                        setMessage({
                          text: `${error.response.data.error}`,
                          type: 'error'
                        }
                        )
                        setTimeout(() => {
                          setMessage({text:'', type:''})
                        }, 3000)
                      })
      }
    }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username: 
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password: 
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const blogForm = () => (
      <form onSubmit={addBlog}>
            <div>
              title: <input value={newTitle} onChange={handleTitleChange}/>
            </div>
            <div>
              author: <input value={newAuthor} onChange={handleAuthorChange}/>
            </div>
            <div>
              url: <input value={newUrl} onChange={handleUrlChange}/>
            </div>
            <div>
              <button type='submit'>add</button>
            </div>
        </form>
  )

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
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
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedInBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage({
        text: 'Login successful',
        type: 'success'
      })
      setTimeout(() => {
        setMessage({text: '', type: ''})
      }, 3000)
    } catch (exception) {
      setMessage({
        text: 'Wrong username or password',
        type: 'error'
      })
      setTimeout(() => {
        setMessage({text: '', type: ''})
      }, 3000)
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
      setMessage({
        text: 'Logout successful',
        type: 'success'
      })
      setTimeout(() => {
        setMessage({text: '', type: ''})
      }, 3000)
    } catch (exception) {
      setMessage({
        text: `${exception}`,
        type: 'error'
      })
      setTimeout(() => {
        setMessage({text: '', type: ''})
      }, 3000)
    }
  }

  return (
    <div>

      <Notification text={message.text} type={message.type}/>

      {user === null ?
        loginForm() :
        <div>
          <p>user: {user.name} <button onClick={handleLogout}>logout</button></p>
          {blogForm()}
          <h2>blogs</h2>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
        </div>
      }
    </div>
  )
}

export default App