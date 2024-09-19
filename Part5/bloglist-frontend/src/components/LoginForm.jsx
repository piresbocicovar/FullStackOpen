import React, { useState } from 'react'
import loginService from '../services/login'
import { notify } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import blogService from '../services/blogs'
import { Form, Button } from 'react-bootstrap'
import './LoginForm.css'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedInBlogappUser', JSON.stringify(user))
      dispatch(setUser(user))
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      dispatch(notify('Login successful', 'success'))
    } catch (exception) {
      setUsername('')
      setPassword('')
      dispatch(notify('Wrong username or password', 'error'))
    }
  }

  return (
    <div className='login-form-container'>
      <Form className='login-form' onSubmit={handleLogin}>
        <Form.Group className='login-form-group'>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </Form.Group>
        <Form.Group className='login-form-group'>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Group>
        <div className='button-wrapper'>
          <Button className='login-form-button' variant='primary' type="submit">
            Login
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default LoginForm