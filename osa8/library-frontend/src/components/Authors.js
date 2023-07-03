import { useQuery, useMutation} from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
import { useState } from 'react'


const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [selected, setSelected] = useState(null)

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  const result = useQuery(ALL_AUTHORS)
  const authors = result.data?.allAuthors

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return (
      <div>loading...</div>
    )
  }

  const submit = (event) => {
    event.preventDefault()
    const birthYear = parseInt(born, 10)
    const result = editAuthor({ variables: { name, birthYear } })
    setName('')
    setBorn('')
  }

  return (
    <div> 
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {props.token ?
      <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <select value={name} onChange={({ target }) => setName(target.value)}>
            <option value=''>Select an author</option>
            {authors.map(a => (
              <option key={a.name} value={a.name}>{a.name}</option>
            ))}
          </select>
        </div>
        <div>
          born
          <input value={born} onChange={({ target }) => setBorn(target.value)} />
        </div>
        <button type='submit'>update author</button>
      </form>
      </div>
      :
      null}
    </div>
  )
}

export default Authors
