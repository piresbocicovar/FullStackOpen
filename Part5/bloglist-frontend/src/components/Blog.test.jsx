import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

vi.mock('../services/blogs', () => ({
  default: {
    update: vi.fn(),
    remove: vi.fn(),
  },
}))

test('renders blog title and author, but not URL or likes by default', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'testAuthor',
    url: 'testURL',
    likes: 4,
    user: { username: 'testUser' },
  }

  render(<Blog blog={blog} username="testUser" setMessage={() => {}} />)

  expect(screen.getByText('Component testing is done with react-testing-library')).toBeInTheDocument()
  expect(screen.getByText(/testAuthor/)).toBeInTheDocument()

  expect(screen.queryByText(/testURL/)).not.toBeInTheDocument()
  expect(screen.queryByText(/4/)).not.toBeInTheDocument()
})

test('shows URL and number of likes when the view button is clicked', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'testAuthor',
    url: 'testURL',
    likes: 4,
    user: { username: 'testUser' },
  }

  const user = userEvent.setup()

  render(<Blog blog={blog} username="testUser" setMessage={() => {}} />)

  expect(screen.queryByText(/testURL/)).not.toBeInTheDocument()
  expect(screen.queryByText(/4/)).not.toBeInTheDocument()

  await user.click(screen.getByText('View'))

  expect(screen.getByText(/testURL/)).toBeInTheDocument()
  expect(screen.getByText(/4/)).toBeInTheDocument()
})

test('calls blogService.update twice when like button is clicked twice', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'testAuthor',
    url: 'testURL',
    likes: 4,
    user: { username: 'testUser' },
  }

  const { default: blogService } = await import('../services/blogs')
  blogService.update.mockClear()

  const user = userEvent.setup()

  render(<Blog blog={blog} username="testUser" setMessage={() => {}} />)

  await user.click(screen.getByText('View'))

  await user.click(screen.getByText('Like'))
  await user.click(screen.getByText('Like'))

  expect(blogService.update).toHaveBeenCalledTimes(2)
})

test('calls blogService.remove when delete button is clicked', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'testAuthor',
    url: 'testURL',
    likes: 4,
    user: { username: 'testUser' },
  }

  global.confirm = vi.fn(() => true)

  const { default: blogService } = await import('../services/blogs')
  blogService.remove.mockClear()

  const user = userEvent.setup()

  render(<Blog blog={blog} username="testUser" setMessage={() => {}} />)

  await user.click(screen.getByText('View'))

  await user.click(screen.getByText('Delete'))

  expect(blogService.remove).toHaveBeenCalledTimes(1)
})
