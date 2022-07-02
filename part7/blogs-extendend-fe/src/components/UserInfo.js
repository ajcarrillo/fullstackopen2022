import { useDispatch, useSelector } from "react-redux"
import { removeLoggedUser } from "../features/users/usersSlice"

const UserInfo = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  const handleLogout = () => {
    dispatch(removeLoggedUser())
  }

  return (
    <div>
      <span>{user.user.name} logged in</span>{" "}
      <button id="btn-logout" onClick={handleLogout}>
        logout
      </button>
    </div>
  )
}

export default UserInfo
