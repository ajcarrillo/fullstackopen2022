import { useDispatch, useSelector } from "react-redux"
import { removeLoggedUser } from "../features/users/usersSlice"
import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const UserInfo = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector((state) => state.user)

  const handleLogout = () => {
    dispatch(removeLoggedUser())
    navigate("/login")
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
