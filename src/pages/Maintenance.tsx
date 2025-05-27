import { useEffect } from "react";

const Maintenance = () => {
  useEffect(() => {
    document.title = "Maintenance | Admin";
  }, []);
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <h1 style={{ fontSize: 32, marginBottom: 16 }}>Maintenance</h1>
      <p style={{ fontSize: 18 }}>
        Halaman ini sedang dalam perbaikan. Silakan kembali lagi nanti.
      </p>
    </div>
  );
};

export default Maintenance;
