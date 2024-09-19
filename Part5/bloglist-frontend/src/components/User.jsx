import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { initializeUsers } from '../reducers/usersReducer'
import { Link } from 'react-router-dom'
import './User.css'

const User = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const users = useSelector(state => state.users)

  const user = users.find(user => user.id === id)

  useEffect(() => {
    if (users.length === 0) {
      dispatch(initializeUsers())
    }
  }, [dispatch, users.length])

  if (!user) {
    return <p>Loading user...</p>
  }

  return (
    <div className='user-info'>
      <div className='header-container'>
        <h1 className='header-title'>Username: {user.name}</h1>
      </div>
      {user.blogs.length === 0 ?
        <h2>No blogs added</h2> :
        <>
          <h2>Blogs added:</h2><div className='user-blogs-container'>
            <ul className='blog-list'>
              {user.blogs.map(blog => (
                <li className='blog' key={blog.id}>
                  <Link className='blog-title' to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      }
    </div>
  )
}

export default User
