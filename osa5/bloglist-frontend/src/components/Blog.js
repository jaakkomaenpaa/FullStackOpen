import { useState } from 'react'

const Contents = ({ blog, visible, likeBlog, removeBlog }) => {

  const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'))
  let showWhenLogged = { display : 'none' }
  if (loggedUser) {
    showWhenLogged = { display : loggedUser.name === blog.user.name ? '' : 'none' }
  }

  if (!visible) {
    return null
  } else {
    return (
      <div>
        <div>
          {blog.url}
        </div>
        <div>
          likes {blog.likes}
          <button id='like-button' onClick={(() => likeBlog(blog))}>like</button>
        </div>
        <div>
          {blog.user.name}
        </div>
        <div style={showWhenLogged}>
          <button onClick={(() => removeBlog(blog))}>remove</button>
        </div>
      </div>

    )
  }

}

const Blog = ({ blog, likeBlog, removeBlog }) => {

  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className='blog' >
      {blog.title} {blog.author}
      <button id='view-button' onClick={(() => setVisible(!visible))}>
        {visible ? 'hide' : 'view'}
      </button>
      <div>
        <Contents
          blog={blog}
          visible={visible}
          likeBlog={likeBlog}
          removeBlog={removeBlog}
        />
      </div>
    </div>
  )

}

export default Blog