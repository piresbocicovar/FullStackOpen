const Course = ({ course }) => {
    return (
      <div>
        <Header course={course.name}/>
        <Content parts={course.parts}/>
        <Total exercises={course.parts.map((part => part.exercises))}/>
      </div>
    )
  }
  
  const Header = ({ course }) => {
    return (
      <h1>{course}</h1>
    )
  }
  
  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises}/>)}
      </div>
    )
  }
  
  const Part = ({ name, exercises }) => {
    return (
      <p>{name} {exercises}</p>
    )
  }
  
  const Total = ({ exercises }) => {
    return (
      <p><b>total of {exercises.reduce((accumulator, currentValue) => accumulator + currentValue)} exercises</b></p>
    )
  }

  export default Course