import { Link } from 'react-router-dom';

const Menu = ({ user }) => {
  const padding = { padding: 5 };
  return (
    <div>
      <Link style={padding} to='/'>
        home
      </Link>
      <Link style={padding} to='/notes'>
        notes
      </Link>
      <Link style={padding} to='/users'>
        users
      </Link>
      {user ? (
        <em>{user} logged in</em>
      ) : (
        <Link style={padding} to='/login'>
          log in
        </Link>
      )}
    </div>
  );
};

export default Menu;
