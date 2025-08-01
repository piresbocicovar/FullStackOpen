import { createSlice } from '@reduxjs/toolkit'

export const notify = (message, timeoutInSeconds = 3) => {
  return dispatch => {
    dispatch(setNotification(message))
    const timeout = timeoutInSeconds * 1000
    setTimeout(() => {
      dispatch(clearNotification())
    }, timeout)
  }
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return ''
    }
  }
})

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer
