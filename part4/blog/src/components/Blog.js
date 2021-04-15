import { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, handleDelete, handleLike, user }) => {
  const [visible, setVisible] = useState(false);

  const handleClick = () => setVisible(!visible);

  return (
    <>
      {blog.title} - {blog.author}
      <button onClick={handleClick}>{visible ? 'hide' : 'show'}</button>
      {visible && (
        <div className='optionalContent'>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}{' '}
            <button onClick={() => handleLike(blog._id)}>like</button>
          </div>
          {user.id === blog.user._id && (
            <button onClick={() => handleDelete(blog._id)}>remove</button>
          )}
        </div>
      )}
    </>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleLike: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default Blog;
