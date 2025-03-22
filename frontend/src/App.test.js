import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders the app and adds a relationship', () => {
  render(<App />);
  
  const nameInput = screen.getByPlaceholderText(/name/i);
  fireEvent.change(nameInput, { target: { value: 'Alice' } });

  const timeInput = screen.getByPlaceholderText(/time/i);
  fireEvent.change(timeInput, { target: { value: '8' } });

  const addButton = screen.getByText(/add relationship/i);
  fireEvent.click(addButton);

  expect(screen.getByText(/Alice/i)).toBeInTheDocument();
});
