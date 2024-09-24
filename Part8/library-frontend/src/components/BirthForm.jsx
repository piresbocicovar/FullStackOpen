import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
import Select from 'react-select'

const BirthForm = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [selectedAuthor, setSelectedAuthor] = useState(null)

  const [ changeBorn ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  const response = useQuery(ALL_AUTHORS)

  const submit = (event) => {
    event.preventDefault()

    if (selectedAuthor) {
      changeBorn({ variables: { name, born } })

      setName('')
      setBorn('')
    }
  }

  const authorsOptions = response.data?.allAuthors.map(author => ({
    value: author.name,
    label: author.name
  })) || []

  return (
    <div>
      <h2>set birthyear</h2>

      <form onSubmit={submit}>
        <div>
        <Select
            value={selectedAuthor}
            onChange={setSelectedAuthor}
            options={authorsOptions}
            placeholder="Select an author"
            isClearable
          />
        </div>
        <div>
          year <input
            value={born}
            onChange={({ target }) => setBorn(parseInt(target.value))}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default BirthForm