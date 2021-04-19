import { useHistory } from 'react-router-dom';

import { useField } from '../hooks';

const CreateNew = props => {
  const history = useHistory();
  const content = useField('text');
  const author = useField('text');
  const info = useField('text');

  const handleSubmit = e => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    history.push('/');
  };

  const handleReset = () => {
    content.onReset();
    author.onReset();
    info.onReset();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
        <button type='reset'>reset</button>
      </form>
    </div>
  );
};

export default CreateNew;
