import { Link } from "react-router-dom"
import { Navbar, Container, Nav } from "react-bootstrap"
import { useSelector } from "react-redux"
import UserInfo from "./UserInfo"

const Navigation = () => {
  const navigation = [
    { name: "Blogs", path: "/blogs", current: true },
    { name: "Users", path: "/users", current: false },
    { name: "Create new blog", path: "/blogs/create", current: false },
    { name: "Login", path: "/login", current: false },
  ]

  const user = useSelector((state) => state.user)
  const currentUser = user.user || null

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>Blogs</Navbar.Brand>
          <Navbar.Collapse>
            <Nav className="me-auto">
              {navigation.map((item) => (
                <Link className="px-2" key={item.name} to={item.path}>
                  {item.name}
                </Link>
              ))}
            </Nav>
          </Navbar.Collapse>
          <Navbar.Brand>{currentUser.token && <UserInfo />}</Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  )
}

export default Navigation
