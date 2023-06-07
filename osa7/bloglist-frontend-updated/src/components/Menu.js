import { 
  BrowserRouter as Router,
  Routes, Route, Link,
} from 'react-router-dom'
import Togglable from './Togglable'
import BlogList from './BlogList'
import BlogForm from './BlogForm'
import UserList from './UserList'
import { forwardRef } from 'react'

const BlogView = forwardRef(({handleSubmit, author, title, url, blogs, likeBlog, removeBlog}, ref) => {

  return (
    <div>
      <Togglable buttonLabel='create new blog' ref={ref} >
        <BlogForm handleSubmit={handleSubmit} author={author} title={title} url={url} />
      </Togglable>
      <BlogList blogs={blogs} likeBlog={likeBlog} removeBlog={removeBlog} />
    </div>
  )
})

const Menu = forwardRef(({handleSubmit, author, title, url, blogs, likeBlog, removeBlog}, ref) => {
  const padding = {
    paddingRight: 5
  }
  
  return (
    <Router>
      <div>
        <Link style={padding} to='/blogs'>blogs</Link>
        <Link style={padding} to='/users'>users</Link>
      </div>
      <Routes>
        <Route path='/blogs' element={<BlogView handleSubmit={handleSubmit} author={author} title={title} url={url}
            blogs={blogs} likeBlog={likeBlog} removeBlog={removeBlog} ref={ref}/>} />
        <Route path='/' element={<BlogView handleSubmit={handleSubmit} author={author} title={title} url={url}
            blogs={blogs} likeBlog={likeBlog} removeBlog={removeBlog} ref={ref}/>} />
        <Route path='/users' element={<UserList/>} />
      </Routes>
    </Router>
  )
})

export default Menu