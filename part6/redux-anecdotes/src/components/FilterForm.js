import { connect } from "react-redux"
import { setFilter } from "../reducers/filterReducer"

const FilterForm = (props) => {
  const handleChange = (event) => {
    const filter = event.target.value
    props.setFilter(filter)
  }

  const style = {
    marginBottom: "1rem",
    marginTop: "1rem",
  }

  return (
    <div style={style}>
      filter: <input name="filter" onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
  setFilter,
}

const connectedFilterForm = connect(null, mapDispatchToProps)(FilterForm)

export default connectedFilterForm
