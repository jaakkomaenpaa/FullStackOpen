import { useEffect, useRef } from 'react'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, addBlog, likeBlog, removeBlog } from './reducers/blogReducer'
import LoginForm from './components/LoginForm'
import { useField } from './hooks/index'
import { handleLogin, handleLogout } from './reducers/userReducer'
import blogService from './services/blogs'
import Menu from './components/Menu'

const App = () => {
  const username = useField('text')
  const password = useField('password')
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    if (user !== null) {
      blogService.setToken(JSON.parse(window.localStorage.getItem('loggedUser')).token)
    }
  }, [])

  const blogs = useSelector(state => {
    return state.blogs
  })
  const user = useSelector(state => {
    return state.user
  })

  const like = async (blog) => {
    dispatch(likeBlog(blog))
  }

  const remove = async (blog) => {
    dispatch(removeBlog(blog))
  }

  const submitBlog = (event) => {
    event.preventDefault()
    dispatch(addBlog(event, title, author, url, blogFormRef))
  }

  const login = (event) => {
    dispatch(handleLogin(event, username, password))
  }

  const logout = (event) => {
    window.localStorage.removeItem('loggedUser')
    dispatch(handleLogout(event))
  }
  
  //Login form
  if (user === null) {
    return (
      <div>
        <LoginForm 
          username={username} 
          password={password}
          handleLogin={login}
        />
      </div>
    )
  }

  //When logged in
  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>
        {user.name} logged in
        <button key={user.name} onClick={logout}>logout</button>
      </p>
      <Menu handleSubmit={submitBlog} author={author} title={title} url={url}
            blogs={blogs} likeBlog={like} removeBlog={remove} ref={blogFormRef} 
      />
    </div>
  )
}

export default App
