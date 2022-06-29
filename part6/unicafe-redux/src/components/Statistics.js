import Statistic from "./Statistic"

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  const average = (good - bad) / total || 0
  const positive = (good / total) * 100 || 0

  if (total === 0) {
    return <div>No feedback given</div>
  }

  return (
    <div>
      <table>
        <tbody>
          <Statistic text="Good" value={good}></Statistic>
          <Statistic text="Neutral" value={neutral}></Statistic>
          <Statistic text="Bad" value={bad}></Statistic>
          <Statistic text="All" value={total}></Statistic>
          <Statistic text="Average" value={average}></Statistic>
          <Statistic text="Positive" value={`${positive}%`}></Statistic>
        </tbody>
      </table>
    </div>
  )
}

export default Statistics
