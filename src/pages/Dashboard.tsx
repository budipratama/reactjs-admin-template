import { JSX, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSeo } from "../utils/seo";
import "../styles/pages/_dashboard.scss";
import { useModal } from "../context/ModalContext";

interface DashboardProps {
  setIsLoggedIn: (value: boolean) => void;
}

const Dashboard = ({ setIsLoggedIn }: DashboardProps): JSX.Element => {
  const navigate = useNavigate();
  const { openModal } = useModal();
  // Konfigurasi waktu maintenance
  const maintenanceTime = new Date("2025-05-28T09:00:00+07:00").getTime(); // ganti sesuai kebutuhan
  const warningMinutes = 10; // menit sebelum maintenance muncul notifikasi
  const warnedRef = useRef(false);

  useEffect(() => {
    const checkMaintenance = () => {
      const now = Date.now();
      if (now >= maintenanceTime) {
        navigate("/maintenance", { replace: true });
      } else if (
        maintenanceTime - now <= warningMinutes * 60 * 1000 &&
        !warnedRef.current
      ) {
        openModal(
          <div>
            <b>
              Maintenance akan dimulai dalam kurang dari {warningMinutes} menit.
            </b>
            <br />
            Silakan simpan pekerjaan Anda.
          </div>,
          { title: "Pemberitahuan Maintenance" }
        );
        warnedRef.current = true;
      }
    };
    checkMaintenance();
    const interval = setInterval(checkMaintenance, 10000); // cek tiap 10 detik
    return () => clearInterval(interval);
  }, [navigate, openModal]);

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
