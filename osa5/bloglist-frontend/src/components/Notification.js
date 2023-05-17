const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="notification">
      {message}
    </div>
  )
}

const ErrorMessage = ({ message }) => {
  if (message === null) {
    return null
  }
  return <div className="error">{message}</div>
}

export { Notification, ErrorMessage }
