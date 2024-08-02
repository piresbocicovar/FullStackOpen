const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('Blogs', () => {
  test('are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('have the \'id\' property, but not \'_id\'', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogs = response.body

    blogs.forEach(blog => {
      assert(blog.id, 'Blog does not have an id property')
      assert.strictEqual(blog._id, undefined, 'Blog has an _id property')
    })
  })

  test('are succesfully created after a POST request', async () => {
    const newBlog = {
      title: 'POST test',
      author: 'whatsername',
      url: 'defaulturl.com',
      likes: 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
    const titles = blogsAtEnd.map(n => n.title)

    assert(titles.includes('POST test'))
  })

  test('likes are set to 0 if missing from POST request', async () => {
    const newBlog = {
      title: '0 likes',
      author: 'whatshisface',
      url: 'defaulturl.com'
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const createdBlog = response.body

    assert.strictEqual(createdBlog.likes, 0, 'Likes should default to 0 if not provided')
  })

  test('cannot be posted without title/author/url', async () => {
    const invalidBlogs = [
      {
        author: 'Author',
        url: 'http://example.com'
      },
      {
        title: 'Title',
        url: 'http://example.com'
      },
      {
        title: 'Title',
        author: 'Author'
      }
    ]

    for (const blog of invalidBlogs) {
      await api
        .post('/api/blogs')
        .send(blog)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    }
  })
})

after(async () => {
  await mongoose.connection.close()
})