import personsService from '../services/Persons'

const PersonForm = ({ nameState, phoneState, personsState, messageState, messageTypeState }) => {
  const [newName, setNewName] = nameState
  const [newPhone, setNewPhone] = phoneState
  const [persons, setPersons] = personsState
  const [, setMessage] = messageState
  const [, setMessageType] = messageTypeState

  const showNotification = (message, type) => {
    setMessage(message)
    setMessageType(type)
    setTimeout(() => {
      setMessage(null)
      setMessageType(null)
    }, 5000);
  }

  const addNewPerson = (event) => {
    event.preventDefault()
    // let added = persons.reduce((accumulator, currentPerson) => accumulator || currentPerson.name === newName, false)
    if (persons.find(p => p.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`)) {
        const id = persons.find(p => p.name === newName).id
        personsService
          .update(id, { name: newName, number: newPhone })
          .then(returnedPerson => {
            showNotification(`Updated ${returnedPerson.name}`, 'success')
            setPersons(persons.map(p => p.name !== newName ? p : returnedPerson))
          })
          .catch(error => {
            showNotification(`Information of ${newName} has already been removed from server.`, 'error')
            setPersons(persons.filter(p => p.name !== newName))
          })
      }
    } else {
      personsService
        .create({ name: newName, number: newPhone })
        .then(returnedPerson => {
          showNotification(`Added ${returnedPerson.name}`, 'success')
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewPhone('')
        })
        .catch(error => {
          showNotification(`Information of ${newName} has already been added to server.`)
        })
    }
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  return (
    <div>
      <form onSubmit={addNewPerson}>
        <div>
          <label htmlFor="input_name">name: </label>
          <input
            id="input_name"
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <label htmlFor="input_phone">phone: </label>
          <input
            id="input_phone"
            value={newPhone}
            onChange={handlePhoneChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm