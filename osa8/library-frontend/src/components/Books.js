import { useQuery, useApolloClient } from '@apollo/client'
import { ALL_BOOKS, ALL_GENRES } from '../queries'
import { useState, useEffect } from 'react'

const Books = (props) => {

  const [selectedGenre, setSelectedGenre] = useState('all')
  const [books, setBooks] = useState([])
  const client = useApolloClient()

  useEffect(() => {
    fetchData()
  }, [selectedGenre])

  const fetchData = async () => {
    try {
      const { data } = await client.query({
        query: ALL_BOOKS,
        variables: { genre: selectedGenre }
      })
      console.log('data', data)
      setBooks(data.allBooks)
    } catch (error) {
      console.error(error)
    }
  }
  
  const { data, loading } = useQuery(ALL_BOOKS, {
    variables: {genre: selectedGenre}
  })

  const genreData = useQuery(ALL_GENRES)
  const genres = genreData?.data?.allGenres
  
  const handleSelection = (event) => {
    event.preventDefault()
    setSelectedGenre(event.target.value)
  }

  if (!props.show) {
    return null
  }

  if (loading) {
    return (
      <div>loading...</div>
    )
  }
  
  return (
    <div>
      <h2>books</h2>
      {selectedGenre && selectedGenre !== 'all' 
        ? <p>in genre <strong>{selectedGenre}</strong></p> 
        : null
      }
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {books ? <select value={selectedGenre} 
      onChange={handleSelection}>
        <option value='all'>All genres</option>
        {genres.map(genre => (
          <option key={genre} value={genre}>{genre}</option> 
        ))}
      </select> : null}
    </div>
  )
}

export default Books
