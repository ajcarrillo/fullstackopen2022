import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"

import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client"
import { setContext } from "@apollo/client/link/context"

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("book-user-token")
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  }
})

const httpLink = new HttpLink({ uri: "http://localhost:4000" })

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
})

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
)
