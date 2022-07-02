import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
import BlogForm from "./BlogForm"

test("form wording is correct", () => {
  const createBlog = jest.fn()
  const component = render(<BlogForm createBlog={createBlog} />)
  const input = component.container.querySelector("#title")
  const input2 = component.container.querySelector("#author")
  const input3 = component.container.querySelector("#url")

  const button = component.container.querySelector("button")
  expect(button).toHaveTextContent("Submit")

  fireEvent.change(input, { target: { value: "test" } })
  fireEvent.change(input2, { target: { value: "test" } })
  fireEvent.change(input3, { target: { value: "test" } })
  fireEvent.click(button)
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: "test",
    author: "test",
    url: "test",
  })
})
