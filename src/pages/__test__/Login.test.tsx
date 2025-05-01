import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Login from '../Login';
import { JSX } from 'react';

describe('Login Component', () => {
  const mockSetIsLoggedIn = jest.fn();

  const renderWithRouter = (ui: JSX.Element) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
  };

  it('renders the login form', () => {
    renderWithRouter(<Login setIsLoggedIn={mockSetIsLoggedIn} />);
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('shows an alert when username or password is incorrect', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    renderWithRouter(<Login setIsLoggedIn={mockSetIsLoggedIn} />);

    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: 'wrongUser' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'wrongPass' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(window.alert).toHaveBeenCalledWith('Username atau password salah!');
  });

  it('calls setIsLoggedIn and navigates to dashboard on successful login', () => {
    renderWithRouter(<Login setIsLoggedIn={mockSetIsLoggedIn} />);

    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: 'admin' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'password' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(mockSetIsLoggedIn).toHaveBeenCalledWith(true);
  });
});
