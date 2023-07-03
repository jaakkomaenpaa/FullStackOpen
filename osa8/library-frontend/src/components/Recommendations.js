import { ME, ALL_BOOKS } from '../queries'
import { useQuery } from '@apollo/client'

const Recommendations = (props) => {

  const genreResult = useQuery(ME)
  const favoriteGenre = genreResult?.data?.me.favoriteGenre
  const bookResult = useQuery(ALL_BOOKS)
  const books = bookResult?.data?.allBooks.filter(book => book.genres.includes(favoriteGenre))

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>
      books in your favorite genre <strong>{favoriteGenre}</strong>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map(book => (
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