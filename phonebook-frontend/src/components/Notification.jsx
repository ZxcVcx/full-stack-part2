import './Notification.css'

const Notification = ({ message, type }) => { // destruct props
  if (message === null || message === '') {
    return null
  }

  return (
    <div className={type}>
      {message}
    </div>
  )
}

export default Notification