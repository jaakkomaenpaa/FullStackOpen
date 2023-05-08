const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    'title': 'Cats are fun',
    'author': 'jaakko',
    'url': 'https://www.blogspot.com',
    'likes': 42,
  },
  {
    'title': 'Catching your first pokemon',
    'author': 'Ash',
    'url': 'https://pokemon.com',
    'likes': 5,
  }
]

const initialUsers = [
  {
    'username': 'jaakkom',
    'name': 'jaakko',
    'password': 'test'
  },
  {
    'username': 'mrtiger',
    'name': 'tiiker',
    'password': '1234'
  }
]


describe('with initially saved blogs', () => {

  beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('returns the right amount of blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
  })

  describe('viewing a specific blog', () => {

    test('identification field is defined', async () => {
      const response = await api.get('/api/blogs')
      expect(response.body[0].id).toBeDefined()
    })

  })

  describe('adding a new blog', () => {

    test('blog can be added successfully', async () => {
      const blogToBeAdded = {
        title: 'the return of kummeli',
        author: 'Steve',
        url: 'https://kummeliblog.fi',
        likes: 55
      }

      const postResponse = await api
        .post('/api/blogs')
        .send(blogToBeAdded)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      expect(postResponse.body.title).toEqual('the return of kummeli')

      const getResponse = await api.get('/api/blogs')
      expect(getResponse.body).toHaveLength(initialBlogs.length + 1)
    })

    test('blog with no like data gets number of likes set to 0', async () => {
      const testBlog = {
        title: 'this has no like data :(',
        author: 'someone',
        url: 'does not have one'
      }

      const response = await api.post('/api/blogs').send(testBlog)
      expect(response.body.likes).toBe(0)

    })

    test('returns status 400 if trying to add a blog with no title or url', async () => {

      const blogWithNoUrl = {
        title: 'no url',
        author: 'someone really special',
        likes: 3
      }

      const blogWithNoTitle = {
        author: 'someone also special but not as special',
        url: 'tinder.com',
        likes: 10
      }

      await api
        .post('/api/blogs')
        .send(blogWithNoUrl)
        .expect(400)

      await api
        .post('/api/blogs')
        .send(blogWithNoTitle)
        .expect(400)
    })

  })

  describe('deleting a blog', () => {

    test('a blog can be deleted successfully', async () => {

      const blogsAtStart = await api.get('/api/blogs')
      const blogToDelete = blogsAtStart.body[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await api.get('/api/blogs')
      expect(blogsAtEnd.body).toHaveLength(blogsAtStart.body.length - 1)

    })

  })

  describe('updating a blog', () => {

    test('updating likes on a blog', async () => {

      const blogsAtStart = await api.get('/api/blogs')
      const blogToUpdate = blogsAtStart.body[0]

      const body = {
        likes: 62
      }

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(body)
        .expect(200)

      const blogsAtEnd = await api.get('/api/blogs')
      expect(blogsAtEnd.body[0].likes).toBe(62)


    })

  })

})

describe('with initially saved users', () => {

  /**
  beforeEach(async () => {
    await User.deleteMany({})
    let userObject = new User(initialUsers[0])
    await userObject.save()
    userObject = new User(initialUsers[1])
    await userObject.save()
  })
  */

  test('succesfully adding a new user', async () => {
    const usersAtStart = await api.get('/api/users')
    const newUser = {
      'username': 'testi1',
      'name': 'testi2',
      'password': 'enkerro'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await api.get('/api/users')
    expect(usersAtEnd.body).toHaveLength(usersAtStart.body.length + 1)

  })

  test('return status 400 when trying to add a user with no username', async () => {

    const usersAtStart = api.get('/api/users')

    const invalidUser = {
      'name': 'kimmo',
      'password': 'www'
    }

    await api
      .post('/api/users')
      .send(invalidUser)
      .expect(400)

    const usersAtEnd = api.get('/api/users')
    expect(usersAtEnd.body).toHaveLength(usersAtStart.body.length)
  })

  test('return status 400 when password is too short', async () => {

    const usersAtStart = api.get('/api/users')
    const invalidUser = {
      'username': 'breakingbad',
      'name': 'break',
      'password': 'neil'
    }

    await api
      .post('/api/users')
      .send(invalidUser)
      .expect(403)

    const usersAtEnd = api.get('/api/users')
    expect(usersAtEnd.body).toHaveLength(usersAtStart.body.length)
  })


})

afterAll(async () => {
  await mongoose.connection.close()
})

