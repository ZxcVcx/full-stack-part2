import personService from "../services/Persons"

const Persons = ({ filter, personsState }) => {
  const [persons, setPersons] = personsState

  const personsToShow = persons.filter(person => person.name.toLowerCase().match(filter.toLowerCase()))

  const deletePerson = person => {
    if (window.confirm(`Delete ${person.name}?`)) {
      const id = person.id
      personService
      .delPerson(id)
      .catch(error => {
        alert(`the person '${personsToShow.find(p => p.id === id).name}' was already deleted from server`)
      })
      .finally(() => {
        setPersons(persons.filter(p => p.id !== id))
      })
    }
  }

  return (
    <div>
      {personsToShow.map(person =>
        <div key={person.id}>
          {person.name} {person.number} <button onClick={() => deletePerson(person)}>delete</button>
        </div>
      )}
    </div>
  )
}

export default Persons