import { useNavigate } from "react-router-dom"
import PropTypes from "prop-types"
import { useField } from "../hooks"

const CreateNew = (props) => {
  const content = useField('text')
  const author  = useField('text')
  const info = useField('text')

  const navigate = useNavigate()

  // eslint-disable-next-line no-unused-vars
  const filterProps = ({ clear, ...rest }) => rest

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    navigate('/')
  }

  const handleReset = (e) => {
    e.preventDefault()
    content.clear()
    author.clear()
    info.clear()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' {...filterProps(content)} />
        </div>
        <div>
          author
          <input name='author' {...filterProps(author)} />
        </div>
        <div>
          url for more info
          <input name='info' {...filterProps(info)} />
        </div>
        <button>create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  )

}

CreateNew.propTypes = {
  addNew: PropTypes.func.isRequired
}

export default CreateNew