import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

const Button = ({ handleClick }) => {
  return (
    <button onClick={handleClick}>Next anecdote</button>
  )
}

const VoteButton = ({ handleClick }) => {
  return (
    <button onClick={handleClick}>Vote</button>
  )
}

const Anecdote = ({ anecdote, votes }) => {
  return (
    <div>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </div>
  )
}

const App = ({ anecdotes }) => {
  const total = anecdotes.length || 0
  const points = new Array(total + 1).join('0').split('').map(parseFloat)

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(points)

  const getRandomInt = (min, max) => () => {
    const random = Math.floor(Math.random() * (max - min + 1)) + min
    setSelected(random)
  }

  const vote = (selected) => () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  const anecdoteMax = Math.max(...votes)
  const anecdoteMaxIndex = votes.indexOf(anecdoteMax)

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote
        anecdote={anecdotes[selected]}
        votes={votes[selected]}
      ></Anecdote>
      <VoteButton handleClick={vote(selected)}></VoteButton>
      <Button handleClick={getRandomInt(0, total - 1)}/>
      {anecdoteMax > 0 &&
        <div>
          <h2>Anecdote with most votes</h2>
          <Anecdote
            anecdote={anecdotes[anecdoteMaxIndex]}
            votes={anecdoteMax}
          ></Anecdote>
        </div>
      }
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

root.render(
  <React.StrictMode>
    <App anecdotes={anecdotes}/>
  </React.StrictMode>
)
