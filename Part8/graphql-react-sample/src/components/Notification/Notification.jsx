import "./Notification.css"

const Notification = ({ notification }) => {
  const { message, type } = notification

  if (!message) {
    return null
  }

  let className = "notification"
  className += type === "error" ? " error" : " success"

  return (
    <div className={className}>
      <p>{message}</p>
    </div>
  )
}

export default Notification
