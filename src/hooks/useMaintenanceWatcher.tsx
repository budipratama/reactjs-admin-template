import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useModal } from "../context/ModalContext";

// Konfigurasi waktu maintenance dan notifikasi
export function useMaintenanceWatcher() {
  const maintenanceTime = new Date("2025-05-28T09:00:00+07:00").getTime(); // ganti sesuai kebutuhan
  const warningMinutes = 10; // menit sebelum maintenance muncul notifikasi
  const warnedRef = useRef(false);
  const navigate = useNavigate();
  const { openModal } = useModal();
  const location = useLocation();

  useEffect(() => {
    // Jangan tampilkan notifikasi/redirect di halaman maintenance
    if (location.pathname === "/maintenance") return;
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
            <b>{`Maintenance akan dimulai dalam kurang dari ${warningMinutes} menit.`}</b>
            <br />
            <span>Silakan simpan pekerjaan Anda.</span>
          </div>,
          { title: "Pemberitahuan Maintenance" }
        );
        warnedRef.current = true;
      }
    };
    checkMaintenance();
    const interval = setInterval(checkMaintenance, 10000);
    return () => clearInterval(interval);
  }, [navigate, openModal, location.pathname]);
}
