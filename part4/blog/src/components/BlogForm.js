const BlogForm = props => {
  return (
    <form onSubmit={props.handleCreate}>
      <div>
        title
        <input
          name='title'
          type='text'
          value={props.title}
          onChange={props.handleTitleChange}
          placeholder='Title'
        />
      </div>
      <div>
        author
        <input
          name=''
          type='text'
          value={props.author}
          onChange={props.handleAuthorChange}
          placeholder='Author'
        />
      </div>
      <div>
        url
        <input
          name=''
          type='text'
          value={props.url}
          onChange={props.handleUrlChange}
          placeholder='URL'
        />
      </div>
      <button>create</button>
    </form>
  );
};

export default BlogForm;
