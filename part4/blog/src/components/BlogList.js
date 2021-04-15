import Blog from './Blog';

const BlogList = ({ blogs, handleDelete, handleLike, user }) => {
  return (
    <div className='blogList'>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog => (
          <div key={blog._id} className='blog'>
            <Blog
              blog={blog}
              handleDelete={handleDelete}
              handleLike={handleLike}
              user={user}
            />
          </div>
        ))}
    </div>
  );
};

export default BlogList;
