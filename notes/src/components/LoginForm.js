import PropTypes from 'prop-types';

import Toggable from './Toggable';

const LoginForm = ({
  handleLogin,
  handlePasswordChange,
  handleUsernameChange,
  password,
  username,
}) => {
  return (
    <Toggable buttonLabel='log in'>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id='username'
            onChange={handleUsernameChange}
            placeholder='Username'
            type='text'
            value={username}
          />
        </div>
        <div>
          password
          <input
            id='password'
            onChange={handlePasswordChange}
            placeholder='Password'
            type='password'
            value={password}
          />
        </div>
        <button id='login-button'>login</button>
      </form>
    </Toggable>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default LoginForm;
