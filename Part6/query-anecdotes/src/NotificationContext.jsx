import React, { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "NEW":
      return `added '${action.payload}'`
    case "VOTE":
      return `voted '${action.payload}'`
    case "ERROR":
      return `error: '${action.payload}'`
    case "CLEAR":
      return ''
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const [notification] = useContext(NotificationContext)
  return notification
}

export const useNotificationDispatch = () => {
  const [, notificationDispatch] = useContext(NotificationContext)
  return notificationDispatch
}

export default NotificationContext