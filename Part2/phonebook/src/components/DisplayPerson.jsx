const DisplayPerson = ( {persons, personFilter} ) => {
    if (personFilter === ''){
        return(
            persons.map(person => <li key={person.id}>{person.name} {person.number} <button>delete</button></li>)
        )
    } else {
        return(
            persons.filter((person) => person.name.toLowerCase().startsWith(personFilter.toLowerCase()))
               .map(person => {<li key={person.id}>{person.name} {person.number} <button>delete</button></li>})
        )
    }
}

export default DisplayPerson