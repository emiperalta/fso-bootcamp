const BlogDetails = props => {
  return (
    <>
      <div>{props.url}</div>
      <div>
        likes {props.likes} <button>like</button>
      </div>
    </>
  );
};

export default BlogDetails;
