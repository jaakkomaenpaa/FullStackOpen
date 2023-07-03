import { useQuery, useMutation} from '@apollo/client'
import { LOGIN } from '../queries'
import { useState, useEffect } from 'react'

const Login = (props) => {
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    }
  })


  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      props.setToken(token)
      localStorage.setItem('loggedUser', token)
    }
  }, [result.data])

  if (!props.show) {
    return null
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    login({ variables: { username, password }})
    console.log('logged in')
  }


  return (
    <div>
      <form onSubmit={handleLogin}>
        name <input 
          type='text'
          value={username} 
          onChange={({ target }) => setUsername(target.value)}
        /> <br/>
        password <input 
          type='password' 
          value={password} 
          onChange={({ target }) => setPassword(target.value)}
        /> <br/>
        <button type='submit'>login</button> 
      </form>
    </div>
  )
}

export default Login