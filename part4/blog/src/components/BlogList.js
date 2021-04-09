const BlogList = ({ blogs }) => {
  return (
    <>
      {blogs.map(blog => (
        <section key={blog._id}>
          {blog.title} {blog.author}
        </section>
      ))}
    </>
  );
};

export default BlogList;
