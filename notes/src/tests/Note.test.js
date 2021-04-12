import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import Note from '../components/Note';

describe('<Note />', () => {
  test('renders content', () => {
    const note = {
      content: 'testing',
      importante: true,
    };

    const component = render(<Note note={note} />);

    expect(component.container).toHaveTextContent('testing');
  });

  test('clicking the button calls event handler once', () => {
    const note = {
      content: 'testing',
      important: false,
    };

    const mockHandler = jest.fn();

    const component = render(<Note note={note} toggleImportance={mockHandler} />);
    const button = component.getByText('make important');
    fireEvent.click(button);

    expect(mockHandler.mock.calls).toHaveLength(1);
  });

  test('importance of a note can be changed correctly', () => {
    const note = {
      content: 'testing',
      important: true,
    };
    const toggleImportance = jest.fn();
    const component = render(
      <Note note={note} toggleImportance={toggleImportance} />
    );
    const button = component.container.querySelector('button');
    fireEvent.click(button);
    fireEvent.click(button);
    expect(toggleImportance.mock.calls).toHaveLength(2);
    expect(button).toHaveTextContent('make not important');
  });
});
