import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'
import './Notification.css'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  if (!notification.text || !notification.type) {
    return null
  }
  return (
    <div className='notification-wrapper'>
      {notification.type === 'error' ? (
        <Alert variant="danger" className='notification-alert'>
          {notification.text}
        </Alert>
      ) : (
        <Alert variant="success" className='notification-alert'>
          {notification.text}
        </Alert>
      )}
    </div>
  )
}

export default Notification