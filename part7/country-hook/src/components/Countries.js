import Country from "./Country"

function Countries({ countries }) {
  return (
    <div>
      {countries && (
        <div>
          {countries.map((country) => (
            <Country key={country.cca3} country={country} />
          ))}
        </div>
      )}
      {!countries && <p>No countries found</p>}
    </div>
  )
}

export default Countries
