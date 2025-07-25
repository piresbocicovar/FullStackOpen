import { useState } from 'react'
import CreateNew from './components/CreateNew'
import Menu from './components/Menu'
import AnecdoteList from './components/AnecdoteList'
import Footer from './components/Footer'
import Anecdote from './components/Anecdote'
import Notification from './components/Notification'
import About from './components/About'
import {
  Routes, Route, useMatch
} from 'react-router-dom'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`anecdote '${anecdote.content}' created`)
    setTimeout(() => setNotification(''), 5000)
  }

  const match = useMatch('/:id')
  const anecdote = match
  ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id))
  : null

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification notification={notification} setNotification={setNotification} />
      <Routes>
        <Route path="/:id" element={<Anecdote anecdote={anecdote} />} />
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/create" element={<CreateNew addNew={addNew} />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
