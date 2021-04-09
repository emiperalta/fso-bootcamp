const LoginForm = ({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          name='username'
          onChange={handleUsernameChange}
          placeholder='Username'
          type='text'
          value={username}
        />
      </div>
      <div>
        password
        <input
          name='password'
          onChange={handlePasswordChange}
          placeholder='Password'
          type='password'
          value={password}
        />
      </div>
      <button>Login</button>
    </form>
  );
};

export default LoginForm;
