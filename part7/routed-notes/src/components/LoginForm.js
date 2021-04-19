import { useHistory } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

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
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control name='username' type='text' />
          <Form.Label>password:</Form.Label>
          <Form.Control name='password' type='password' />
        </Form.Group>
        <Button type='submit'>login</Button>
      </Form>
    </div>
  );
};

export default LoginForm;
