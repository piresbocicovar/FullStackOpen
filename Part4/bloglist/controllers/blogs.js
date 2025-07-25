const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : undefined,
    user: user.id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response) => {
    const blog = await Blog.findById(request.params.id)

    if (!blog) {
      return response.status(204).end()
    }

    if (blog.user.toString() !== request.user.id.toString()) {
      return response
        .status(403)
        .json({
          error: 'forbidden: you do not have permission to delete this blog',
        })
    }

    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  },
)

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body
  const blogUpdates = { title, author, url, likes }

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    blogUpdates,
    { new: true },
  )

  if (updatedBlog) {
    response.json(updatedBlog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const { id } = request.params
  const { content } = request.body

  const blog = await Blog.findById(id)
  if (!blog) {
    return response.status(404).json({ error: 'Blog not found' })
  }

  const newComment = {
    content,
  }

  blog.comments = blog.comments.concat(newComment)
  await blog.save()

  response.status(201).json(newComment)
})

blogsRouter.get('/:id/comments', async (request, response) => {
  const { id } = request.params

  const blog = await Blog.findById(id)
  if (!blog) {
    return response.status(404).json({ error: 'Blog not found' })
  }

  response.json(blog.comments)
})

module.exports = blogsRouter