import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BlogListView from './components/BlogListView'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import UserList from './components/UserList'
import Menu from './components/Menu'
import User from './components/User'
import Blog from './components/Blog'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInBlogappUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <Notification />
      {user === null ? (
        <LoginForm />
      ) : (
        <div>
          <Menu />
          <Routes>
            <Route path="/" element={<BlogListView blogs={sortedBlogs} user={user} />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/:id" element={<User />} />
            <Route path="/blogs/:id" element={<Blog />} />
          </Routes>
        </div>
      )}
    </div>
  )
}

export default App