const _ = require('lodash')

const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {

  const reducer = (current, next) => {
    return current + next.likes
  }

  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

const favoriteBlog = blogs => {

  const favorite = _.maxBy(blogs, blog => blog.likes)

  return blogs.length === 0 ? {} : { title: favorite.title, author: favorite.author, likes: favorite.likes }
}

const mostBlogs = blogs => {

  const blogsByAuthor = _.countBy(blogs, 'author')
  const bestAuthor = _.maxBy(_.toPairs(blogsByAuthor), pair => pair[1])

  return blogs.length === 0 ? {} : { author: bestAuthor[0], blogs: bestAuthor[1] }
}

const mostLikes = blogs => {

  const blogsByAuthor = _.groupBy(blogs, 'author')
  const likesByAuthor = _.mapValues(blogsByAuthor, blogs => blogs.reduce((a, b) => {return a + b.likes}, 0))
  const bestAuthor = _.maxBy(_.toPairs(likesByAuthor), pair => pair[1])

  return blogs.length === 0 ? {} : { author: bestAuthor[0], likes: bestAuthor[1] }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

const favorite = favoriteBlog(blogs)

