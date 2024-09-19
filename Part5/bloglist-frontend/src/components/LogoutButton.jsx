import React from 'react'
import { useDispatch } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import { clearUser } from '../reducers/userReducer'
import blogService from '../services/blogs'
import { Button } from 'react-bootstrap'
import './LogoutButton.css'

const LogoutButton = () => {
  const dispatch = useDispatch()

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedInBlogappUser')
      blogService.setToken()
      dispatch(clearUser())
      dispatch(notify('Logout successful', 'success'))
    } catch (exception) {
      dispatch(notify(`${exception}`, 'error'))
    }
  }

  return (
    <Button className='logout-button-custom' variant='primary' onClick={handleLogout}>
      Logout
    </Button>
  )
}

export default LogoutButton