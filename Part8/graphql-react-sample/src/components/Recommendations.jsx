import { useQuery, useLazyQuery } from "@apollo/client"
import { ME } from "../queries/loginQueries"
import { ALL_BOOKS } from "../queries/bookQueries"
import { useEffect } from "react"

const Recommendations = () => {
  const me = useQuery(ME)
  const [allBooks, { called, loading, data }] = useLazyQuery(ALL_BOOKS, {
    fetchPolicy: "cache-and-network",
  })

  useEffect(() => {
    if (me.data) {
      allBooks({ variables: { genre: me.data.me.favoriteGenre } })
    }
  }, [me.data])

  if (me.loading || loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <p>books in your favorite genre {me.data.me.favoriteGenre}</p>
      <table>
        <thead>
          <tr>
            <td></td>
            <td>author</td>
            <td>published</td>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.allBooks.map((book) => (
              <tr key={book.title}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations
