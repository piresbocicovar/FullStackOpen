import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const commentsSlice = createSlice({
  name: 'comments',
  initialState: [],
  reducers: {
    setComments(state, action) {
      return action.payload
    },
    addComment(state, action) {
      return [...state, action.payload]
    }
  }
})

export const { setComments, addComment } = commentsSlice.actions

export const initializeComments = (blogId) => {
  return async dispatch => {
    const comments = await blogService.getComments(blogId)
    dispatch(setComments(comments))
  }
}

export const createComment = (blogId, content) => {
  return async dispatch => {
    const newComment = await blogService.addComment(blogId, content)
    dispatch(addComment(newComment))
  }
}

export default commentsSlice.reducer