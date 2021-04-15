import Toggable from './Toggable';

const LoginForm = props => {
  return (
    <Toggable buttonLabel='log in'>
      <form onSubmit={props.handleLogin}>
        <div>
          username
          <input
            id='username'
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
            id='password'
            name='password'
            onChange={props.handlePasswordChange}
            placeholder='Password'
            type='password'
            value={props.password}
          />
        </div>
        <button>login</button>
      </form>
    </Toggable>
  );
};

export default LoginForm;
