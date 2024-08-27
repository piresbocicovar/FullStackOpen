import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('calls onSubmit with the right details when a new blog is created', async () => {
  const onSubmit = vi.fn()

  render(<BlogForm onSubmit={onSubmit} />)

  const newTitle = 'Test Blog Title'
  const newAuthor = 'Test Author'
  const newUrl = 'http://testurl.com'

  await userEvent.type(screen.getByPlaceholderText('Enter blog title'), newTitle)
  await userEvent.type(screen.getByPlaceholderText('Enter author name'), newAuthor)
  await userEvent.type(screen.getByPlaceholderText('Enter blog URL'), newUrl)

  await userEvent.click(screen.getByText('add'))

  expect(onSubmit).toHaveBeenCalledWith({
    title: newTitle,
    author: newAuthor,
    url: newUrl
  })

  expect(screen.getByPlaceholderText('Enter blog title').value).toBe('')
  expect(screen.getByPlaceholderText('Enter author name').value).toBe('')
  expect(screen.getByPlaceholderText('Enter blog URL').value).toBe('')
})
