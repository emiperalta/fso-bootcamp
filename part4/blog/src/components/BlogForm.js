import { useRef, useState } from 'react';

import Toggable from './Toggable';

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const blogFormRef = useRef();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      title && url && (await createBlog({ author, title, url }));
    } catch (err) {
      console.error(err);
    }
    title && url && blogFormRef.current.toggleVisible();
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  const handleTitleChange = e => setTitle(e.target.value);
  const handleAuthorChange = e => setAuthor(e.target.value);
  const handleUrlChange = e => setUrl(e.target.value);

  return (
    <Toggable buttonLabel='new note' ref={blogFormRef}>
      <form onSubmit={handleSubmit}>
        <div>
          title
          <input
            name='title'
            type='text'
            value={title}
            onChange={handleTitleChange}
            placeholder='Title'
          />
        </div>
        <div>
          author
          <input
            name=''
            type='text'
            value={author}
            onChange={handleAuthorChange}
            placeholder='Author'
          />
        </div>
        <div>
          url
          <input
            name=''
            type='text'
            value={url}
            onChange={handleUrlChange}
            placeholder='URL'
          />
        </div>
        <button>create</button>
      </form>
    </Toggable>
  );
};

export default BlogForm;
