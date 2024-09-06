import { createAnecdote } from "../requests"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNotificationDispatch } from "../NotificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      notificationDispatch({ type: 'NEW', payload: data.content })
      setTimeout(() => { notificationDispatch({ type: 'CLEAR' }) }, 5000)
    },
    onError: (error) => {
      const errorMessage = error.response.data.error || 'An error occurred'
      notificationDispatch({ type: 'ERROR', payload: errorMessage })
      setTimeout(() => { notificationDispatch({ type: 'CLEAR' }) }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm