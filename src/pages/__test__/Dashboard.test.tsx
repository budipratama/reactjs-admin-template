import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from '../Dashboard';
import { JSX } from 'react';

describe('Dashboard Component', () => {
  const mockSetIsLoggedIn = jest.fn();

  // Helper function to render the component with routing
  const renderWithRouter = (ui: JSX.Element) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
  };

  it('renders the dashboard page', () => {
    renderWithRouter(<Dashboard setIsLoggedIn={mockSetIsLoggedIn} />);

    // Check if the heading is rendered
    expect(screen.getByRole('heading', { name: /dashboard/i })).toBeInTheDocument();

    // Check if the welcome message is rendered
    expect(screen.getByText(/selamat datang di halaman dashboard/i)).toBeInTheDocument();

    // Check if the logout button is rendered
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
  });

  it('calls setIsLoggedIn and navigates to login on logout', () => {
    const mockNavigate = jest.fn();
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => mockNavigate,
    }));

    renderWithRouter(<Dashboard setIsLoggedIn={mockSetIsLoggedIn} />);

    // Simulate clicking the logout button
    fireEvent.click(screen.getByRole('button', { name: /logout/i }));

    // Check if setIsLoggedIn is called with false
    expect(mockSetIsLoggedIn).toHaveBeenCalledWith(false);

    // Check if navigate is called with "/"
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
