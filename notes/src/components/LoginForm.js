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
          onChange={handleUsernameChange}
          placeholder='Username'
          type='text'
          value={username}
        />
      </div>
      <div>
        password
        <input
          onChange={handlePasswordChange}
          placeholder='Password'
          type='password'
          value={password}
        />
      </div>
      <button>login</button>
    </form>
  );
};

export default LoginForm;
