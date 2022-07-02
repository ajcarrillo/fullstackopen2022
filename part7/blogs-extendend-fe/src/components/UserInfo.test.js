import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
import UserInfo from "./UserInfo"

test("renders user info", () => {
  const user = {
    name: "John Doe",
  }
  const handleLogout = jest.fn()

  const component = render(<UserInfo user={user} handleLogout={handleLogout} />)
  const button = component.container.querySelector("#btn-logout")

  fireEvent.click(button)

  expect(handleLogout.mock.calls).toHaveLength(1)
  expect(component.getByText(`${user.name} logged in`)).toBeInTheDocument()
})
