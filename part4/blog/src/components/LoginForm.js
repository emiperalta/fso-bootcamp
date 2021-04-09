const LoginForm = props => {
  return (
    <form onSubmit={props.handleLogin}>
      <div>
        username
        <input
          name='username'
          onChange={props.handleUsernameChange}
          placeholder='Username'
          type='text'
          value={props.username}
        />
      </div>
      <div>
        password
        <input
          name='password'
          onChange={props.handlePasswordChange}
          placeholder='Password'
          type='password'
          value={props.password}
        />
      </div>
      <button>login</button>
    </form>
  );
};

export default LoginForm;
