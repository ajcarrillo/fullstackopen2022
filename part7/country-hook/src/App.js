import "./App.css"
import { useState } from "react"
import Filter from "./components/Filter"
import Countries from "./components/Countries"
import { useField, useCountry } from "./hooks"

function App() {
  const nameInput = useField("text")
  const [name, setName] = useState("")
  const country = useCountry(name)

  const handleSearchTermChange = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <Filter
        filter={nameInput}
        handleSearchTermChange={handleSearchTermChange}
      />
      <br />
      <Countries countries={country} />
    </div>
  )
}

export default App
