import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import Blog from '../components/Blog';

describe('<Blog />', () => {
  beforeEach(() => {});

  test("render blog's title and author, but does not render its url or likes by default", () => {
    const blog = {
      title: 'Harry Potter',
      author: 'J. K. Rowling',
      url: 'www.harrypotter.com',
      likes: 20,
      user: { name: 'test' },
    };
    // required props because prop-types
    const handleDelete = jest.fn();
    const handleLike = jest.fn();
    const user = { name: 'test' };

    const component = render(
      <Blog
        blog={blog}
        handleDelete={handleDelete}
        handleLike={handleLike}
        user={user}
      />
    );

    expect(component.container).toHaveTextContent(blog.title);
    expect(component.container).toHaveTextContent(blog.author);
    expect(component.container).not.toHaveTextContent(blog.url);
    expect(component.container).not.toHaveTextContent(blog.likes);
  });

  test("blog's url and likes are shown when 'show' button has been clicked", () => {
    const blog = {
      title: 'Harry Potter',
      author: 'J. K. Rowling',
      url: 'www.harrypotter.com',
      likes: 20,
      user: { name: 'test' },
    };
    // required props because prop-types
    const handleDelete = jest.fn();
    const handleLike = jest.fn();
    const user = { name: 'test' };

    const component = render(
      <Blog
        blog={blog}
        handleDelete={handleDelete}
        handleLike={handleLike}
        user={user}
      />
    );

    const button = component.getByText('show');
    fireEvent.click(button);

    expect(component.container).toHaveTextContent(blog.url);
    expect(component.container).toHaveTextContent(blog.likes);
  });

  test('if the like button is clicked twice, the event handler is called twice', () => {
    const blog = {
      title: 'Harry Potter',
      author: 'J. K. Rowling',
      url: 'www.harrypotter.com',
      likes: 20,
      user: { name: 'test' },
    };
    // required props because prop-types
    const handleDelete = jest.fn();
    const handleLike = jest.fn();
    const user = { name: 'test' };

    const component = render(
      <Blog
        blog={blog}
        handleDelete={handleDelete}
        handleLike={handleLike}
        user={user}
      />
    );

    const showButton = component.getByText('show');
    fireEvent.click(showButton);

    const likeButton = component.getByText('like');
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    expect(handleLike.mock.calls).toHaveLength(2);
  });
});
