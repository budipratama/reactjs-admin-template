import { JSX } from 'react';
import { useNavigate } from 'react-router-dom';

interface DashboardProps {
  setIsLoggedIn: (value: boolean) => void;
}

const Dashboard = ({ setIsLoggedIn }: DashboardProps): JSX.Element => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); // Hapus status login
    setIsLoggedIn(false); // Perbarui state login
    navigate('/'); // Arahkan kembali ke halaman login
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Dashboard</h1>
      <p>Selamat datang di halaman dashboard!</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
