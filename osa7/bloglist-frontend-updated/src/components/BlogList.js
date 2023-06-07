import Blog from './Blog'

const BlogList = ({blogs, likeBlog, removeBlog}) => {
  return (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog}
          likeBlog={(() => likeBlog(blog))} removeBlog={(() => removeBlog(blog))} />
      )}
    </div>
  )
}

export default BlogList