import axios from 'axios'
import { useEffect, useState } from 'react'

const baseUrl = '/api/users'

const User = ({user}) => {

  const style = {
    textAlign: 'center'
  }

  return (
    <tr>
      <td>{user.name}</td>
      <td style={style}>{user.blogs.length}</td>
    </tr>
  )
}


const UserList = ({}) => {

  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      const request = await axios.get(baseUrl)
      setUsers(request.data)
    }
    getUsers()
  }, [])

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <td></td>
            <td><strong>blogs created</strong></td>
          </tr>
          {users.map(user =>
          <User key={user.id} user={user}/>)}
        </tbody>
      </table>
    </div>
  )
}

export default UserList