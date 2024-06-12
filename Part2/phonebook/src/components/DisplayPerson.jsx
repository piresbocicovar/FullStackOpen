const DisplayPerson = ( {persons, personFilter, removePerson} ) => {
    return(
        persons.filter(person => person.name.toLowerCase().startsWith(personFilter.toLowerCase()))
               .map(filteredPerson => <li key={filteredPerson.id}>{filteredPerson.name} {filteredPerson.number} <button onClick={() => removePerson(filteredPerson)}>delete</button></li>)
    )
}

export default DisplayPerson