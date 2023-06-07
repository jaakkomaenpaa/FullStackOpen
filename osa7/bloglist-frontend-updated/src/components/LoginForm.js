import Notification from './Notification'

const LoginForm = ({handleLogin, username, password}) => {
  return (
    <div>
      <h2>log in to application</h2>
      <Notification />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id='username'
            value={username.value}
            type={username.type}
            name='Username'
            onChange={username.onChange}
          />
        </div>
        <div>
          password
          <input
            id='password'
            type={password.type}
            value={password.value}
            name='Password'
            onChange={password.onChange}
          />
        </div>
        <button id='login-button' type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm