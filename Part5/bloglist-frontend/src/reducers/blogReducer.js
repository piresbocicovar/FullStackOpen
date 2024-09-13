import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = blogObject => {
  return async dispatch => {
    await blogService.create(blogObject)
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}


export const updateLikes = blog => {
  return async dispatch => {
    await blogService.update(blog.id, blog)
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const deleteBlog = id => {
  return async dispatch => {
    await blogService.remove(id)
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return(action.payload)
    }
  }
})

export const { setBlogs } = blogSlice.actions
export default blogSlice.reducer
