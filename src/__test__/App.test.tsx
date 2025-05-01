import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

describe('App Component', () => {
  it('redirects to login page if not logged in', () => {
    // Render App langsung tanpa membungkus dengan <BrowserRouter>
    render(<App />);

    // Periksa apakah halaman login dirender
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
  });

  it('redirects to dashboard if logged in', () => {
    // Simulasikan pengguna yang sudah login
    localStorage.setItem('isLoggedIn', 'true');

    render(<App />);

    // Periksa apakah halaman dashboard dirender
    expect(screen.getByRole('heading', { name: /dashboard/i })).toBeInTheDocument();
  });

  it('navigates to login page after logout', () => {
    // Simulasikan pengguna yang sudah login
    localStorage.setItem('isLoggedIn', 'true');

    render(<App />);

    // Simulasikan logout
    localStorage.removeItem('isLoggedIn');

    // Render ulang App
    render(<App />);

    // Periksa apakah halaman login dirender
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
  });
});
