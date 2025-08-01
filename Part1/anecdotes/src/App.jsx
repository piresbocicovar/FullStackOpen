import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
);

const randAnecdote = () => {
  return Math.round(Math.random() * 7);
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];

  const initialVotes = [0, 0, 0, 0, 0, 0, 0, 0];
  const [selected, setSelected] = useState(randAnecdote);
  const [votes, setVotes] = useState(initialVotes);
  const [mostVoted, setMostVoted] = useState(selected);
  const addVote = () => {
    const nextVotes = [...votes];
    nextVotes[selected] += 1;
    setVotes(nextVotes);
    setMostVoted(nextVotes.indexOf(Math.max(...nextVotes)));
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <Button text='next anecdote' handleClick={() => setSelected(randAnecdote)}/>
      <Button text='vote' handleClick={addVote}/>
      <h1>Anecdote with the most votes</h1>
      <p>{anecdotes[mostVoted]}</p>
    </div>
    
  )
};

export default App