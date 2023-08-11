import { render, screen } from '@testing-library/react';
import App from './App';

test('renders onetrust', () => {
  render(<App />);
  const linkElement = screen.getByText(/OneTrust/i);
  expect(linkElement).toBeInTheDocument();
});
