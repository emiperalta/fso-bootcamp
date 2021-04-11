import { useState } from 'react';
import PropTypes from 'prop-types';

const BlogDetails = ({ blog, handleDelete, handleLike, user }) => {
  const [visible, setVisible] = useState(false);

  const handleClick = () => setVisible(!visible);

  return (
    <>
      <button onClick={handleClick}>{visible ? 'hide' : 'show'}</button>
      {visible && (
        <>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}{' '}
            <button onClick={() => handleLike(blog._id)}>like</button>
          </div>
          <div>{blog.user.name}</div>
          {user.name === blog.user.name && (
            <button onClick={() => handleDelete(blog._id)}>remove</button>
          )}
        </>
      )}
    </>
  );
};

BlogDetails.propTypes = {
  blog: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleLike: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default BlogDetails;
