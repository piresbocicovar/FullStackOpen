import PropTypes from "prop-types"

const Notification = ({ notification }) => (
  <p>{notification}</p>
)

Notification.propTypes = {
  notification: PropTypes.string.isRequired
}

export default Notification