describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset")
    const user = {
      username: "ajcarrillo",
      password: "secret",
      name: "Andrés Carrillo",
    }
    cy.request("POST", "http://localhost:3001/api/users/", user)
    cy.visit("http://localhost:3000")
  })

  it("Login form is shown", function () {
    cy.visit("http://localhost:3000")
    cy.contains("Blogs")
    cy.contains("Login")
  })

  describe("Login", function () {
    it("login fails with wrong password", function () {
      cy.visit("http://localhost:3000")
      cy.get("#username").type("ajcarrillo")
      cy.get("#password").type("wrong")
      cy.get("#login-button").click()
      cy.contains("Wrong username or password")
    })

    it("user can login", function () {
      cy.get("#username").type("ajcarrillo")
      cy.get("#password").type("secret")
      cy.get("#login-button").click()
      cy.contains("Andrés Carrillo logged in")
    })
  })

  describe("when logged in", function () {
    beforeEach(function () {
      cy.request("POST", "http://localhost:3001/api/login", {
        username: "ajcarrillo",
        password: "secret",
      }).then((response) => {
        localStorage.setItem("loggedBlogappUser", JSON.stringify(response.body))
        cy.visit("http://localhost:3000")
      })
    })

    it("a user can create a new blog", function () {
      cy.get("#show-form-button").click()
      cy.get("#title").type("Test blog")
      cy.get("#author").type("Test author")
      cy.get("#url").type("http://test.com")
      cy.get("#create-button").click()
      cy.contains("Test blog Test author")
    })

    it("a user can like a blog", function () {
      const token = JSON.parse(localStorage.getItem("loggedBlogappUser")).token

      cy.request({
        method: "POST",
        url: "http://localhost:3001/api/blogs",
        headers: {
          Authorization: `bearer ${token}`,
        },
        body: {
          title: "Test blog",
          author: "Test author",
          url: "http://test.com",
        },
      }).then((response) => {
        cy.visit("http://localhost:3000")
        cy.get("#btn-show-details").click()
        cy.get("#btn-like").click()
        cy.contains("1")
      })
    })

    it("a user can delete his own blog", function () {
      const token = JSON.parse(localStorage.getItem("loggedBlogappUser")).token

      cy.request({
        method: "POST",
        url: "http://localhost:3001/api/blogs",
        headers: {
          Authorization: `bearer ${token}`,
        },
        body: {
          title: "Test blog",
          author: "Test author",
          url: "http://test.com",
        },
      }).then((response) => {
        cy.visit("http://localhost:3000")
        cy.get("#btn-show-details").click()
        cy.get("#delete-button").click()
        cy.contains("Test blog Test author").should("not.exist")
      })
    })

    it("user cant delete other user's blog", function () {
      const token = JSON.parse(localStorage.getItem("loggedBlogappUser")).token

      cy.request({
        method: "POST",
        url: "http://localhost:3001/api/blogs",
        headers: {
          Authorization: `bearer ${token}`,
        },
        body: {
          title: "Test blog",
          author: "Test author",
          url: "http://test.com",
        },
      }).then((response) => {
        const user = {
          username: "jhondoe",
          password: "secret",
          name: "jhon doe",
        }
        cy.request("POST", "http://localhost:3001/api/users/", user).then(
          (response) => {
            cy.request("POST", "http://localhost:3001/api/login", {
              username: "jhondoe",
              password: "secret",
            }).then((response) => {
              localStorage.setItem(
                "loggedBlogappUser",
                JSON.stringify(response.body)
              )
              cy.visit("http://localhost:3000")
              cy.get("#btn-show-details").click()
              cy.get("#delete-button").click()
              cy.contains("You are not authorized to delete this blog")
            })
          }
        )
      })
    })

    it("blogs are sorted by likes", function () {
      const token = JSON.parse(localStorage.getItem("loggedBlogappUser")).token
      const blogsList = [
        {
          title: "Test blog",
          author: "Test author",
          url: "http://test.com",
          likes: 15,
        },
        {
          title: "Test blog 1",
          author: "Test author 1",
          url: "http://test.com",
          likes: 5,
        },
        {
          title: "Test blog 2",
          author: "Test author 2",
          url: "http://test.com",
          likes: 20,
        },
      ]
      blogsList.forEach((blog) => {
        cy.request({
          method: "POST",
          url: "http://localhost:3001/api/blogs",
          headers: {
            Authorization: `bearer ${token}`,
          },
          body: blog,
        })
      })
      cy.visit("http://localhost:3000")
      const blogsInOrder = []

      cy.get(".blog > span").each((el) => {
        cy.wrap(el)
          .invoke("text")
          .then((text) => {
            blogsInOrder.push(text)
          })
      })
      cy.request("GET", "http://localhost:3001/api/blogs").then((response) => {
        const blogs = response.body
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => {
            return `${blog.title} ${blog.author}`
          })
        expect(blogsInOrder).to.deep.equal(blogs)
      })
    })
  })
})
