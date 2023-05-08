const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')



blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1, id: 1 })

  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {

  const body = request.body
  const user = request.user

  if (!request.token) {
    return response.status(401).json({ error: 'authorization token missing' })
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  if (!body.title || !body.url) {
    return response.status(400).json('missing title or url')
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  if (!blog.likes) {
    blog.likes = 0
  }

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)

})

blogsRouter.delete('/:id', async (request, response) => {

  const user = request.user

  if (!request.token) {
    response.status(401).json({ error: 'authorization token missing' })
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    response.status(401).json({ error: 'token invalid' })
  }

  const blogToDelete = await Blog.findById(request.params.id)
  if (blogToDelete.user.toString() === user.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
  } else {
    response.status(401).json({ error: 'cannot delete blogs added by other users' })
  }

  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {

  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new : true })
  response.json(updatedBlog)

})

module.exports = blogsRouter
