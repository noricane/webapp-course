import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import NotFound from './pages/Home';

test('renders learn react link', () => {
  render(

      <Router>
      <NotFound />
      </Router>

  );
  const linkElement = screen.getByText(/Sneakers/i);
  expect(linkElement).toBeInTheDocument();
});