import { JSX } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pages/_dashboard.scss";
interface DashboardProps {
  setIsLoggedIn: (value: boolean) => void;
}

const Dashboard = ({ setIsLoggedIn }: DashboardProps): JSX.Element => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/");
  };
  return (
    <h1>Welcome</h1>

    // <div style={{ textAlign: "center", marginTop: "50px" }}>
    //   <h1>Dashboard</h1>
    //   <p>Selamat datang di halaman dashboard!</p>
    //   <button onClick={handleLogout}>Logout</button>
    // </div>
  );
};

export default Dashboard;
