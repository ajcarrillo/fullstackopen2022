import React from "react"
import ReactDOM from "react-dom/client"
import { createStore } from "redux"
import reducer from "./reducer"
import Button from "./components/Button"
import Statistics from "./components/Statistics"

const store = createStore(reducer)

const App = () => {
  const handleClick = (action) => () => {
    store.dispatch({
      type: action,
    })
  }

  return (
    <div>
      <Button handleClick={handleClick("GOOD")} text="good"></Button>
      <Button handleClick={handleClick("OK")} text="ok"></Button>
      <Button handleClick={handleClick("BAD")} text="bad"></Button>
      <div>
        <h2>Statistics</h2>
        <Statistics
          good={store.getState().good}
          neutral={store.getState().ok}
          bad={store.getState().bad}
        />
      </div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"))
const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
