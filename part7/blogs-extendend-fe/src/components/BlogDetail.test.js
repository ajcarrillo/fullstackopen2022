import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
import BlogDetail from "./BlogDetail"

describe("<BlogDetail/>", () => {
  test("two clicks on like button calls the event handler twice", () => {
    const blog = {
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

    const handleLike = jest.fn()
    const handleDeleteBlog = jest.fn()
    const { container } = render(
      <BlogDetail blog={blog} like={handleLike} deleteBlog={handleDeleteBlog} />
    )

    const button = container.querySelector("#btn-like")
    fireEvent.click(button)
    expect(handleLike).toHaveBeenCalledTimes(1)
    fireEvent.click(button)
    expect(handleLike).toHaveBeenCalledTimes(1)
  })
})
