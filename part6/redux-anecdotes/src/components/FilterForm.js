import { useDispatch } from "react-redux"
import { setFilter } from "../reducers/filterReducer"

function FilterForm() {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    const filter = event.target.value
    dispatch(setFilter(filter))
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

export default FilterForm
