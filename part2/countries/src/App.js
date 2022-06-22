import './App.css'
import axios from 'axios'
import { useState } from 'react'
import Filter from './components/Filter'
import Countries from './components/Countries'

function App() {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const fetchCountries = () => {
    axios.get(`https://restcountries.com/v3.1/name/${searchTerm}`)
      .then(response => {
        setCountries(response.data)
      })
  }

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value)
    if (searchTerm !== '' && searchTerm.length >= 2) {
      setTimeout(fetchCountries, 500)
    }
  }

  return (
    <div>
      <Filter
        filter={searchTerm}
        onChange={handleSearchTermChange}
      />
      <br/>
      <Countries countries={countries}/>
    </div>
  )
}

export default App
