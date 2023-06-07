import PropTypes from 'prop-types'

const BlogForm = ({
  handleSubmit,
  title,
  author,
  url
}) => {


  BlogForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    title: PropTypes.object.isRequired,
    author: PropTypes.object.isRequired,
    url: PropTypes.object.isRequired
  }

  return (
    <div>
      <h2>
        create new
      </h2>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input
            id='title'
            type={title.type}
            value={title.value}
            name='Title'
            onChange={title.onChange}
          />
        </div>
        <div>
          author:
          <input
            id='author'
            type={author.type}
            value={author.value}
            name='Author'
            onChange={author.onChange}
          />
        </div>
        <div>
          url:
          <input
            id='url'
            type={url.type}
            value={url.value}
            name='Url'
            onChange={url.onChange}
          />
        </div>
        <button id='create-button' type='submit'>create</button>
      </form>
    </div>
  )

}

export default BlogForm