import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  const average = (good - bad) / total || 0
  const positive = good / total * 100 || 0

  if (total === 0) {
    return (
      <div>No feedback given</div>
    )
  }

  return (
    <div>
      <table>
        <tbody>
          <Statistic
            text="Good"
            value={good}
          ></Statistic>
          <Statistic
            text="Neutral"
            value={neutral}
          ></Statistic>
          <Statistic
            text="Bad"
            value={bad}
          ></Statistic>
          <Statistic
            text="All"
            value={total}
          ></Statistic>
          <Statistic
            text="Average"
            value={average}
          ></Statistic>
          <Statistic
            text="Positive"
            value={`${positive}%`}
          ></Statistic>
        </tbody>
      </table>

    </div>
  )

}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button
        handleClick={() => setGood(good + 1)}
        text="good"
      />
      <Button
        handleClick={() => setNeutral(neutral + 1)}
        text="neutral"
      />
      <Button
        handleClick={() => setBad(bad + 1)}
        text="bad"
      />
      <hr/>
      <div>
        <h2>Statistics</h2>
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
        />
      </div>
    </div>
  )
}


root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
)


