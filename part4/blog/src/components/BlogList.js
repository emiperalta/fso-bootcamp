import BlogDetails from './BlogDetails';

const BlogList = ({ blogs, handleDelete, handleLike, user }) => {
  const blogListStyle = {
    padding: 5,
    marginBottom: 10,
    border: '2px black solid',
  };

  return (
    <>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog => (
          <div key={blog._id} style={blogListStyle}>
            {blog.title} {blog.author}
            <BlogDetails
              blog={blog}
              handleDelete={handleDelete}
              handleLike={handleLike}
              user={user}
            />
          </div>
        ))}
    </>
  );
};

export default BlogList;
