import { useLazyQuery, useQuery } from '@apollo/client';
import { useEffect } from 'react';

import { GET_BOOKS } from '../utils/queries';

const Filters = ({ setBooks, setFilter }) => {
  const { data } = useQuery(GET_BOOKS); //to get all the genres of the books
  const [getBooks, result] = useLazyQuery(GET_BOOKS); //for filtered books

  useEffect(() => {
    if (result.data) {
      const filteredBooks = result.data.allBooks;
      setBooks(filteredBooks);
    }
  }, [result.data]); //eslint-disable-line

  const handleClick = g => {
    setFilter(g);
    getBooks({ variables: { genre: g } });
  };

  // function to get uniques genres
  function getUniqueValues() {
    return [].concat.apply([], arguments).filter(function (elem, index, self) {
      return self.indexOf(elem) === index;
    });
  }

  const allGenres = data.allBooks.map(book => book.genres);
  const genresToShow = getUniqueValues(...allGenres);

  return (
    <div>
      {genresToShow.map(g => (
        <button key={g} onClick={() => handleClick(g)}>
          {g}
        </button>
      ))}
    </div>
  );
};

export default Filters;
