import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import PersonFilter from './components/PersonFilter'
import DisplayPerson from './components/DisplayPerson'
import PersonService from './services/persons.js'
import Notification from './components/Notification.jsx'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [personFilter, setPersonFilter] = useState('');
  const [message, setMessage] = useState({text: '', type: ''});
  
  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value);
    setPersonFilter(event.target.value);
  }

  const removePerson = personToRemove => {
    if (window.confirm(`delete ${personToRemove.name}?`)) {
      PersonService.remove(personToRemove.id)
                   .then(returnedPerson => {
                      setPersons(persons.filter(person => person !== personToRemove));
                      setMessage({text:`'${returnedPerson.name}' was removed from the phonebook`, type: 'success'});
                      setTimeout(() => {
                        setMessage({text:'', type:''})
                      }, 3000);
                    })
                    .catch(error => {
                      setMessage({
                        text: `'${personToRemove.name}' was already removed from the server`,
                        type: 'error'
                      }
                      );
                      setTimeout(() => {
                        setMessage({text:'', type:''})
                      }, 3000);
                        setPersons(persons.filter(person => person.id !== personToRemove.id));
                    });
    }
  }
  
  useEffect(() => {
    PersonService.getAll()
        .then(returnedPersons => {
          setPersons(returnedPersons)
        })
      }, [])

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    if (newName === '') {
      alert('Field "name" can\'t be empty')
    } else if (newNumber === '') {
      alert('Field "number" can\'t be empty')
    } else {
      if(!persons.every(person => person.name !== newName) && persons.every(person => person.number !== newNumber)) {
        if (window.confirm(`${newName} is already registered, replace existing number?`)) {
          const PersonObject = {
            name: newName,
            number: newNumber,
          }
          PersonService.update(persons.find(person => person.name === newName).id, PersonObject)
                       .then(returnedPerson => {
                          setPersons(persons.map(person => person.name !== newName ? person : returnedPerson))
                          setNewName('');
                          setNewNumber('');
                          setMessage({text: `${returnedPerson}'s number was changed to ${returnedPerson.number}`, type:'success'});
                          setTimeout(() => {
                            setMessage({text:'', type:''})
                          }, 3000);
                        })
                       .catch(error => {
                          setMessage({
                            text: `'${newName}' was already removed from the server`,
                            type: 'error'
                          }
                          );
                          setTimeout(() => {
                            setMessage({text:'', type:''})
                          }, 3000);
                            setPersons(persons.filter(person => person.name !== newName));
                        });
        }
      } else if (!persons.every(person => (person.number !== newNumber))) {
        alert(`phone number ${newNumber} is already registered to ${persons.find(person => person.number === newNumber).name}`);
        setNewName('');
        setNewNumber('');
      } else {
        const PersonObject = {
          name: newName,
          number: newNumber,
        }
        PersonService.create(PersonObject)
                     .then(returnedPerson => {
                        setPersons(persons.concat(returnedPerson));
                        setMessage({text:`'${returnedPerson.name}' was added to the phonebook`, type: 'success'});
                        setTimeout(() => {
                          setMessage({text:'', type:''})
                        }, 3000);
                        setNewName('');
                        setNewNumber('');
                      })
      }
    }
  }

  return (
    <div>
      <Notification text={message.text} type={message.type}/>
      <h2>Phonebook</h2>
      <PersonForm addPerson={addPerson} 
                  newName={newName} 
                  newNumber={newNumber} 
                  handleNameChange={handleNameChange}
                  handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <PersonFilter personFilter={personFilter} handleFilterChange={handleFilterChange}/>
      <ul>
        <DisplayPerson persons={persons} personFilter={personFilter} removePerson={removePerson}/>
      </ul>
    </div>
  )
}

export default App