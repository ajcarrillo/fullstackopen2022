import PropTypes from "prop-types"

const UserInfo = ({ user, handleLogout }) => {
  return (
    <div>
      <span>{user.name} logged in</span>{" "}
      <button id="btn-logout" onClick={handleLogout}>
        logout
      </button>
    </div>
  )
}

UserInfo.propTypes = {
  user: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired,
}

export default UserInfo
