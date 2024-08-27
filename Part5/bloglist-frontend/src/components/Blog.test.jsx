import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders blog title and author, but not URL or likes by default', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'testAuthor',
    url: 'testURL',
    likes: 4,
    user: 'testUser'
  }

  render(<Blog blog={blog} />)

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
    user: 'testUser'
  }

  const user = userEvent.setup()

  render(<Blog blog={blog} />)

  expect(screen.queryByText(/testURL/)).not.toBeInTheDocument()
  expect(screen.queryByText(/4/)).not.toBeInTheDocument()

  await user.click(screen.getByText('View'))

  expect(screen.getByText(/testURL/)).toBeInTheDocument()
  expect(screen.getByText(/4/)).toBeInTheDocument()
})

test('calls handleLike function twice when like button is clicked twice', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'testAuthor',
    url: 'testURL',
    likes: 4,
    user: 'testUser'
  }

  const handleLike = vi.fn()

  const user = userEvent.setup()

  render(<Blog blog={blog} handleLike={handleLike} />)

  expect(handleLike).not.toHaveBeenCalled()

  await user.click(screen.getByText('View'))

  await user.click(screen.getByText('Like'))
  await user.click(screen.getByText('Like'))

  expect(handleLike).toHaveBeenCalledTimes(2)
})
