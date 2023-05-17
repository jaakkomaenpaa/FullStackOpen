import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import { Notification, ErrorMessage } from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    async function getBlogs() {
      const data = await blogService.getAll()
      data.sort((a, b) => b.likes - a.likes)
      setBlogs(data)
    }
    getBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
      addNotification('error', 'wrong username or password')
    }
  }

  const handleLogout = async () => {
    setUser(null)
    window.localStorage.removeItem('loggedUser')
  }

  const addNewBlog = async event => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url,
    }
    try {
      const request = await blogService.create(newBlog)
      setBlogs(request.sort((a,b) => b.likes - a.likes))
      addNotification('notif', `a new blog ${title} by ${author} added`)
      setTitle('')
      setAuthor('')
      setUrl('')
      blogFormRef.current.toggleVisibility()
    } catch (exception) {
      console.log(exception)
      addNotification('error', 'required fields missing')
    }

  }

  const addNotification = (type, message) => {
    if (type === 'error') {
      setErrorMessage(message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 4000)
    } else {
      setNotification(message)
      setTimeout(() => {
        setNotification(null)
      }, 4000)
    }

  }

  const likeBlog = async (likedBlog) => {
    setBlogs(blogs.map(blog =>
      blog.id === likedBlog.id ? { ...blog, likes: blog.likes + 1 } : blog
    ))

    const updatedBlog = { ...likedBlog }
    updatedBlog.user = likedBlog.user.id
    updatedBlog.likes = likedBlog.likes + 1
    await blogService.update(updatedBlog)
  }

  const removeBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog)
      setBlogs(blogs.filter(item => item.id !== blog.id))
    }
  }


  const blogForm = () => {

    return (
      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <BlogForm
          handleSubmit={addNewBlog}
          title={title}
          author={author}
          url={url}
          handleTitleChange={({ target }) => setTitle(target.value)}
          handleAuthorChange={({ target }) => setAuthor(target.value)}
          handleUrlChange={({ target }) => setUrl(target.value)}
        />
      </Togglable>
    )
  }

  //Login form
  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <ErrorMessage message={errorMessage}/>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password'
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="login-button" type="submit">login</button>
        </form>
      </div>
    )
  }


  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification}/>
      <p>
        {user.name} logged in
        <button key={user.name} onClick={handleLogout}>logout</button>
      </p>
      {blogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog}
          likeBlog={likeBlog} removeBlog={removeBlog} />
      )}
    </div>
  )
}

export default App