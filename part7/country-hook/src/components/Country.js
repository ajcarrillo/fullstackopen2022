function Country({ country }) {
  const { name, capital, population, languages, flags } = country

  return (
    <div style={{ marginBottom: "1rem" }}>
      <span>{name.common}</span>&nbsp;
      <div>
        <p>{`capital: ${capital}`}</p>
        <p>{`population: ${population}`}</p>
        <h2>Spoken languages</h2>
        <ul>
          {Object.keys(languages).map((key) => (
            <li key={key}>{languages[key]}</li>
          ))}
        </ul>
        <img src={flags.png} alt={`${name.common} flag`} />
      </div>
    </div>
  )
}

export default Country
