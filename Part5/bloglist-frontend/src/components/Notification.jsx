import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  if (notification.text === null) {
    return null
  }
  switch (notification.type) {
  case 'error':
    return <div className="errorMessage">{notification.text}</div>
  case 'success':
    return <div className="successMessage">{notification.text}</div>
  }
}

export default Notification