import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import NoteForm from '../components/NoteForm';

describe('<NoteForm />', () => {
  test('updates parent state and calls onSubmit', () => {
    const createNote = jest.fn();

    const component = render(<NoteForm createNote={createNote} />);

    const input = component.container.querySelector('input');
    const form = component.container.querySelector('form');

    fireEvent.change(input, {
      target: { value: 'testing' },
    });
    fireEvent.submit(form);

    expect(createNote.mock.calls).toHaveLength(1);
    expect(createNote.mock.calls[0][0].content).toBe('testing');
  });
});
