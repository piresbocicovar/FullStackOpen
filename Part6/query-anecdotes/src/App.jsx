import React from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import DisplayAnecdotes from './components/DisplayAnecdotes'

const App = () => {
  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
      <DisplayAnecdotes />
    </div>
  )
}

export default App
