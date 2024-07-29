import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import PersonFilter from './components/PersonFilter'
import DisplayPerson from './components/DisplayPerson'
import PersonService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [personFilter, setPersonFilter] = useState('');
  const [message, setMessage] = useState({text: '', type: ''});
  
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleFilterChange = (event) => {
    setPersonFilter(event.target.value);
  }

  const removePerson = personToRemove => {
    if (window.confirm(`delete ${personToRemove.name}?`)) {
      PersonService.remove(personToRemove.id)
                   .then(() => {
                      setPersons(persons.filter(person => person !== personToRemove));
                      setMessage({text:`'${personToRemove.name}' was removed from the phonebook`, type: 'success'});
                      setTimeout(() => {
                        setMessage({text:'', type:''})
                      }, 3000);
                    })
                    .catch(() => {
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
                          setMessage({text: `${returnedPerson.name}'s number was changed to ${returnedPerson.number}`, type:'success'});
                          setTimeout(() => {
                            setMessage({text:'', type:''})
                          }, 3000);
                        })
                       .catch(() => {
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
                      .catch(error => {
                        setMessage({
                          text: `${error.response.data.error}`,
                          type: 'error'
                        }
                        );
                        setTimeout(() => {
                          setMessage({text:'', type:''})
                        }, 3000);
                          setPersons(persons.filter(person => person.name !== newName));
                      });
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