import { Alert } from 'react-bootstrap';

const Notificacion = ({ message }) => {
  if (!message) return null;

  return (
    <div className='container'>
      <Alert variant='success'>{message}</Alert>
    </div>
  );
};

export default Notificacion;
