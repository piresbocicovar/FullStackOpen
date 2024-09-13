const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const Blog = require('../models/blog')
const User = require('../models/user')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

let authToken = null
let userId = null

describe('when there are blogs saved initially', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash(helper.initialUser.password, 10)
    const user = new User({
      username: helper.initialUser.username,
      name: helper.initialUser.name,
      passwordHash,
    })
    await user.save()
    userId = user._id

    const response = await api
      .post('/api/login')
      .send({
        username: helper.initialUser.username,
        password: helper.initialUser.password,
      })

    authToken = response.body.token

    for (let blog of helper.initialBlogs) {
      let blogObject = new Blog({ ...blog, user: userId })
      await blogObject.save()
    }
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('blogs have the \'id\' property, but not \'_id\'', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogs = response.body

    blogs.forEach((blog) => {
      assert(blog.id, 'Blog does not have an id property')
      assert.strictEqual(blog._id, undefined, 'Blog has an _id property')
    })
  })

  test('blogs are successfully created after a POST request', async () => {
    const newBlog = {
      title: 'POST test',
      author: 'whatsername',
      url: 'defaulturl.com',
      likes: 0,
      user: userId,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${authToken}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
    const titles = blogsAtEnd.map((n) => n.title)

    assert(titles.includes('POST test'))
  })

  test('blogs posted without likes get likes set to 0 by default', async () => {
    const newBlog = {
      title: '0 likes',
      author: 'whatshisface',
      url: 'defaulturl.com',
      user: userId,
    }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${authToken}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const createdBlog = response.body

    assert.strictEqual(
      createdBlog.likes,
      0,
      'Likes should default to 0 if not provided',
    )
  })

  test('blogs cannot be posted without title/author/url', async () => {
    const invalidBlogs = [
      {
        author: 'Author',
        url: 'http://example.com',
        user: userId,
      },
      {
        title: 'Title',
        url: 'http://example.com',
        user: userId,
      },
      {
        title: 'Title',
        author: 'Author',
        user: userId,
      },
    ]

    for (const blog of invalidBlogs) {
      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${authToken}`)
        .send(blog)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    }
  })

  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

      const titles = blogsAtEnd.map((r) => r.title)
      assert(!titles.includes(blogToDelete.title))
    })

    test('returns status code 204 but doesn\'t delete anything if id does not exist', async () => {
      const nonExistentId = new mongoose.Types.ObjectId().toString()

      await api
        .delete(`/api/blogs/${nonExistentId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })
  })

  describe('updating a blog', () => {
    test('succeeds with status code 200 and updates the blog if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      const updatedBlog = {
        title: 'Updated Title',
        author: 'Updated Author',
        url: 'updatedurl.com',
        likes: 10,
        user: userId.toString(),
      }

      const response = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const updatedBlogFromResponse = response.body
      updatedBlogFromResponse.user = updatedBlogFromResponse.user.toString()

      assert.deepStrictEqual(updatedBlogFromResponse, {
        id: blogToUpdate.id,
        ...updatedBlog,
      })

      const blogsAtEnd = await helper.blogsInDb()
      const transformedBlogsAtEnd = blogsAtEnd.map((blog) => ({
        ...blog,
        user: blog.user.toString(),
      }))

      const updatedBlogInDb = transformedBlogsAtEnd.find(
        (blog) => blog.id === blogToUpdate.id,
      )
      assert.deepStrictEqual(updatedBlogInDb, {
        id: blogToUpdate.id,
        ...updatedBlog,
      })
    })

    test('fails with status code 404 if id does not exist', async () => {
      const nonExistentId = new mongoose.Types.ObjectId().toString()
      const updatedBlog = {
        title: 'Updated Title',
        author: 'Updated Author',
        url: 'updatedurl.com',
        likes: 10,
        user: userId,
      }

      await api
        .put(`/api/blogs/${nonExistentId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updatedBlog)
        .expect(404)
    })
  })
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('creation fails if username is missing', async () => {
    const newUser = {
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
      .expect({ error: 'Username and password are required' })
  })

  test('creation fails if password is missing', async () => {
    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
      .expect({ error: 'Username and password are required' })
  })

  test('creation fails if username is too short', async () => {
    const newUser = {
      username: 'ml',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
      .expect({
        error: 'Username and password must be at least 3 characters long',
      })
  })

  test('creation fails if password is too short', async () => {
    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'sa',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
      .expect({
        error: 'Username and password must be at least 3 characters long',
      })
  })
})

after(async () => {
  await mongoose.connection.close()
})
