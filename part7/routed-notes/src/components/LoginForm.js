import { useHistory } from 'react-router-dom';

const LoginForm = props => {
  const history = useHistory();

  const handleSubmit = e => {
    e.preventDefault();
    props.handleLogin('emidev');
    history.push('/');
  };

  return (
    <div>
      <h3>login</h3>
      <form onSubmit={handleSubmit}>
        <div>
          username: <input name='username' type='text' />
        </div>
        <div>
          password: <input name='password' type='password' />
        </div>
        <button>login</button>
      </form>
    </div>
  );
};

export default LoginForm;
