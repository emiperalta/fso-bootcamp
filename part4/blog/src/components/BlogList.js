import BlogDetails from './BlogDetails';
import Toggable from './Toggable';

const BlogList = ({ blogs }) => {
  const blogListStyle = {
    padding: 5,
    marginBottom: 10,
    border: '2px black solid',
  };

  return (
    <>
      {blogs.map(blog => (
        <div key={blog._id} style={blogListStyle}>
          {blog.title} {blog.author}
          <Toggable buttonLabel='view'>
            <BlogDetails likes={blog.likes} url={blog.url} />
          </Toggable>
        </div>
      ))}
    </>
  );
};

export default BlogList;
