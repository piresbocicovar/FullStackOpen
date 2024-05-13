import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Header = (props) => (
  <h1>
    {props.text}
  </h1>
)

const StatLine = (props) => (
  <tr>
    <td>{props.text}</td> 
    <td>{props.value}</td>
  </tr>
)

const DisplayStats = (props) => {
  if (props.good + props.neutral + props.bad > 0) {
    return(
      <table>
        <StatLine text='good:' value={props.good} />
        <StatLine text='neutral:' value={props.neutral} />
        <StatLine text='bad:' value={props.bad} />
        <StatLine text='total:' value={props.good + props.neutral + props.bad} />
        <StatLine text='average:' value={(props.good - props.bad) / (props.good + props.neutral + props.bad)} />
        <StatLine text='positive:' value={props.good / (props.good + props.neutral + props.bad)} />
      </table>
    )
  }
  else {
    return(
      <p>
      No feedback given
      </p>
    )
  }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text='give feedback' />
      <Button text='good' handleClick={() => setGood(good + 1)}/>
      <Button text='neutral' handleClick={() => setNeutral(neutral + 1)}/>
      <Button text='bad' handleClick={() => setBad(bad + 1)}/>

      <Header text='statistics' />
      <DisplayStats good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App