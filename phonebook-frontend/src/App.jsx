import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

import personsService from './services/Persons'


const App = () => {
  const [persons, setPersons] = useState(null)
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')

  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('success')


  const hook = () => {
    console.log('fetch persons')
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
    // axios
    //   .get("http://localhost:3001/persons") // return a promise
    //   .then(response => {
    //     console.log(response.data)
    //     setPersons(response.data)
    //   })  // the paramter is a handle
  }

  // By default, effects run after every completed render, 
  // but you can choose to fire it only when certain values have changed.
  useEffect(hook, [])

  if (!persons)
    return null

  return (

    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={messageType} />
      <Filter filter={filter} setFilter={setFilter} />

      <h2>Add a new</h2>
      <PersonForm
        nameState={[newName, setNewName]}
        phoneState={[newPhone, setNewPhone]}
        personsState={[persons, setPersons]}
        messageState={[message, setMessage]}
        messageTypeState={[messageType, setMessageType]}
      />

      <h2>Numbers</h2>
      <Persons filter={filter} personsState={[persons, setPersons]} />

    </div>
  )
}

export default App