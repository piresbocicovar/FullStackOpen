const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

// eslint-disable-next-line no-unused-vars
blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

// eslint-disable-next-line no-unused-vars
blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)

  const user = await User.findById(blog.user)

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body
  const blogUpdates = { title, author, url, likes }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blogUpdates, { new: true })

  if (updatedBlog) {
    response.json(updatedBlog)
  } else {
    response.status(404).end()
  }
})

module.exports = blogsRouter