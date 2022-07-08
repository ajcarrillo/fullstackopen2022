const LogoutButton = ({ logout, token, setPage }) => {
  if (!token) {
    return <button onClick={() => setPage("login")}>login</button>
  }
  return (
    <>
      <button onClick={() => setPage("addBook")}>add book</button>
      <button onClick={logout}>logout</button>
    </>
  )
}

export default LogoutButton
