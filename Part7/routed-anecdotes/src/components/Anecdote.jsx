import PropTypes from "prop-types"

const Anecdote = ({ anecdote }) => {

  return (
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <p>has {anecdote.votes}</p>
      <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
    </div>
  )
}

Anecdote.propTypes = {
  anecdote: PropTypes.object
}

export default Anecdote