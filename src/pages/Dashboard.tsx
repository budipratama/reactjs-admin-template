import { JSX } from "react";
import { useNavigate } from "react-router-dom";
import { useSeo } from "../utils/seo";
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

  useSeo({
    title: "Dashboard - Admin",
    description: "Halaman dashboard admin",
    keywords: "dashboard, admin, react",
  });

  return <h1>Welcome</h1>;
};

export default Dashboard;
