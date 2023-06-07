import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'
import { forwardRef } from 'react'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    updateBlog(state, action) {
      const id = action.payload.id
      const changedBlog = action.payload
      return state.map(
        blog => blog.id === id ? changedBlog : blog
      )
    },
    deleteBlog(state, action) {
      const id = action.payload.id
      return state.filter(blog => blog.id !== id)
    }

  }
})

export const { appendBlog, setBlogs, updateBlog, deleteBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const addBlog = (event, title, author, url, blogFormRef) => {
  return async dispatch => {
    event.preventDefault()
    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value,
    }
    try {
      console.log(0)
      const request = await blogService.create(newBlog)
      dispatch(appendBlog(newBlog))
      dispatch(setBlogs(request.sort((a,b) => b.likes - a.likes)))
      dispatch(setNotification(`a new blog ${title.value} by ${author.value} added`))
      title.reset()
      author.reset()
      url.reset()
      blogFormRef.current.toggleVisibility()
    } catch (exception) {
      console.log(exception)
      dispatch(setNotification('required fields missing'))
    }
  }
}

export const likeBlog = (likedBlog) => {
  return async dispatch => {
    const updatedBlog = { ...likedBlog, likes: likedBlog.likes + 1 }
    dispatch(updateBlog(updatedBlog))
    await blogService.update(updatedBlog)
  }
}

export const removeBlog = (blogToRemove) => {
  return async dispatch => {
    if (window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)) {
      await blogService.remove(blogToRemove)
      dispatch(deleteBlog(blogToRemove))
    }
  }
}

export default blogSlice.reducer