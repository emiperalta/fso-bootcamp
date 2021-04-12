import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, waitFor } from '@testing-library/react';
import BlogForm from '../components/BlogForm';

describe('<BlogForm />', () => {
  test('blog form updates parent state and call the event handler received as props', async () => {
    const createBlog = jest.fn();

    const component = render(<BlogForm createBlog={createBlog} />);

    const form = component.container.querySelector('form');
    const title = component.getByPlaceholderText('Title');
    const author = component.getByPlaceholderText('Author');
    const url = component.getByPlaceholderText('URL');

    fireEvent.change(title, { target: { value: 'test title' } });
    fireEvent.change(author, { target: { value: 'test author' } });
    fireEvent.change(url, { target: { value: 'test url' } });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(createBlog.mock.calls).toHaveLength(1);
    });
  });
});
