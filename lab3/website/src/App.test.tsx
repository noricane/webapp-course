import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import NotFound from './pages/Home';


/**
 * @jest-environment jsdom
 */
test('renders learn react link', () => {
  render(<NotFound />);
  const linkElement = screen.getByText(/404/i);
  expect(linkElement).toBeInTheDocument();
});
