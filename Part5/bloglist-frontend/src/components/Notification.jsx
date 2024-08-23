const Notification = ({ text, type }) => {
  if (text === null) {
    return null
  }
  switch (type) {
  case 'error':
    return (
      <div className='errorMessage'>
        {text}
      </div>
    )
  case 'success':
    return (
      <div className='successMessage'>
        {text}
      </div>
    )
  }
}

export default Notification