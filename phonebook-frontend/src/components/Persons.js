import personService from "../services/Persons"

const Persons = ({ filter, personsState }) => {
  const [persons, setPersons] = personsState

  const personsToShow = persons.filter(person => person.name.toLowerCase().match(filter.toLowerCase()))

  const deletePerson = name => {
    if (window.confirm(`Delete ${name}?`)) {
      const id = persons.find(p => p.name === name).id
      personService
      .delPerson(id)
      .catch(error => {
        alert(`the person '${personsToShow.find(p => p.id === id).name}' was already deleted from server`)
      })
      .finally(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }

  return (
    <div>
      {personsToShow.map(person =>
        <div key={person.name}>
          {person.name} {person.number} <button onClick={() => deletePerson(person.name)}>delete</button>
        </div>
      )}
    </div>
  )
}

export default Persons