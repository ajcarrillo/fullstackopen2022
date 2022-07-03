import { useDispatch, useSelector } from "react-redux"
import { removeLoggedUser } from "../features/users/usersSlice"
import { Button } from "react-bootstrap"

const UserInfo = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  const handleLogout = () => {
    dispatch(removeLoggedUser())
  }

  return (
    <div>
      <span>{user.user.name} logged in</span>{" "}
      <Button variant="success" id="btn-logout" onClick={handleLogout}>
        logout
      </Button>
    </div>
  )
}

export default UserInfo
