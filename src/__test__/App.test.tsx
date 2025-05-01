import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import { JSX } from 'react';

describe('App Component', () => {
  const renderWithRouter = (ui: JSX.Element) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
  };

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('redirects to login page if not logged in', () => {
    renderWithRouter(<App />);

    // Check if the Login component is rendered
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
  });

  it('redirects to dashboard if logged in', () => {
    // Simulate a logged-in user
    localStorage.setItem('isLoggedIn', 'true');

    renderWithRouter(<App />);

    // Check if the Dashboard component is rendered
    expect(screen.getByRole('heading', { name: /dashboard/i })).toBeInTheDocument();
  });

  it('navigates to login page after logout', () => {
    // Simulate a logged-in user
    localStorage.setItem('isLoggedIn', 'true');

    renderWithRouter(<App />);

    // Simulate logout by clearing localStorage
    localStorage.removeItem('isLoggedIn');

    // Re-render the component
    renderWithRouter(<App />);

    // Check if the Login component is rendered
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
  });
});
