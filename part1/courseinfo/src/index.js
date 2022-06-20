import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.part} {props.exercises}</p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      {props.content.map(part => <Part
        key={part.part}
        part={part.part}
        exercises={part.exercises}
      />)}
    </div>
  )
}

const Total = (props) => {
  return (
    <p>Total number of exercises {props.exercises}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const courseContent = [
    { part: "Fundamentals of React", exercises: 10 },
    { part: "Using props to pass data", exercises: 7 },
    { part: "State of a component", exercises: 14 },
  ]

  return (
    <div>
      <Header course={course}/>
      <Content content={courseContent}/>
      <Total exercises={courseContent[0].exercises + courseContent[1].exercises + courseContent[2].exercises}/>
    </div>
  )
}


root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
)
