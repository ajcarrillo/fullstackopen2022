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
          key={part.name}
          part={part.name}
          exercises={part.exercises}
        />)}
    </div>
  )
}

const Total = (props) => {
  return (
    <p>
      Total number of exercises {props.exercises.reduce((acc, curr) => acc + curr.exercises, 0)}
    </p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name}/>
      <Content content={course.parts}/>
      <Total exercises={course.parts}/>
    </div>
  )
}


root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
)
