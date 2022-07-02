import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
import Blog from "./Blog"

describe("<Blog/>", () => {
  let component
  let blog

  beforeEach(() => {
    blog = {
      title: "New entry 2",
      author: "Andrés Carrillo",
      url: "some-url-2",
      user: {
        id: "5a422aa71b54a676234d17f8",
        name: "Andrés Carrillo",
        username: "andrescarrillo",
      },
      likes: 4,
      id: "62b93d515d50a30819b74121",
    }

    component = render(
      <Blog blog={blog}>
        <div className="testDiv"></div>
      </Blog>
    )
  })

  test("renders title and author", () => {
    expect(component.container).toHaveTextContent("New entry 2 Andrés Carrillo")
  })

  test("no renders url nor likes", () => {
    expect(component.container).not.toHaveTextContent("some-url-2")
    expect(component.container).not.toHaveTextContent("4")
    expect(component.container).not.toHaveTextContent("0")
  })

  test("renders url and likes when click on view", () => {
    const button = component.container.querySelector("#btn-show-details")
    fireEvent.click(button)

    const div = component.container.querySelector(".togglableBlogDetails")
    expect(div).not.toHaveStyle("display: none")
  })
})
