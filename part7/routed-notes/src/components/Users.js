import { useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  });

  return (
    <div>
      <h3>Users</h3>
      <ListGroup>
        {users.map(user => (
          <ListGroup.Item>{user.username}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default Users;
