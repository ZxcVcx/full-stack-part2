const Filter = ({ filter, setFilter }) => {
  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <label htmlFor='input_filter'>filter shows with</label>
      <input id='input_filter'
        value={filter}
        onChange={handleFilter}
      />
    </div>
  )
}

export default Filter