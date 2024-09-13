import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

vi.mock('../services/blogs', () => ({
  create: vi.fn(),
  getAll: vi.fn(),
}))

test('calls blogService.create and updates the blog list when a new blog is created', async () => {
  const create = require('../services/blogs').create
  const getAll = require('../services/blogs').getAll
  const setBlogs = vi.fn()
  const setMessage = vi.fn()
  const blogFormRef = { current: { toggleVisibility: vi.fn() } }

  create.mockResolvedValue({ title: 'Test Blog Title' })
  getAll.mockResolvedValue([])

  render(<BlogForm setBlogs={setBlogs} blogFormRef={blogFormRef} setMessage={setMessage} />)

  const newTitle = 'Test Blog Title'
  const newAuthor = 'Test Author'
  const newUrl = 'http://testurl.com'

  await userEvent.type(
    screen.getByPlaceholderText('Enter blog title'),
    newTitle,
  )
  await userEvent.type(
    screen.getByPlaceholderText('Enter author name'),
    newAuthor,
  )
  await userEvent.type(screen.getByPlaceholderText('Enter blog URL'), newUrl)

  await userEvent.click(screen.getByText('add'))

  expect(create).toHaveBeenCalledWith({
    title: newTitle,
    author: newAuthor,
    url: newUrl,
  })

  expect(getAll).toHaveBeenCalled()
  expect(setBlogs).toHaveBeenCalledWith([])

  expect(setMessage).toHaveBeenCalledWith({ text: `'${newTitle}' was added to the blog list`, type: 'success' })

  expect(blogFormRef.current.toggleVisibility).toHaveBeenCalled()

  expect(screen.getByPlaceholderText('Enter blog title').value).toBe('')
  expect(screen.getByPlaceholderText('Enter author name').value).toBe('')
  expect(screen.getByPlaceholderText('Enter blog URL').value).toBe('')
})
