import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";
import { ModalProvider } from "../context/ModalContext";

describe("App Component", () => {
  const renderWithProviders = (ui: React.ReactElement) =>
    render(<ModalProvider>{ui}</ModalProvider>);

  it("redirects to login page if not logged in", () => {
    renderWithProviders(<App />);

    // Periksa apakah halaman login dirender
    expect(
      screen.getByRole("heading", { name: /welcome!/i })
    ).toBeInTheDocument();
  });

  it("redirects to profile if logged in", () => {
    // Simulasikan pengguna yang sudah login
    localStorage.setItem("isLoggedIn", "true");

    renderWithProviders(<App />);

    // Periksa apakah halaman dashboard dirender
    expect(
      screen.getByRole("heading", { name: /budi pratama/i })
    ).toBeInTheDocument();
  });

  it("navigates to login page after logout", () => {
    // Simulasikan pengguna yang sudah login
    localStorage.setItem("isLoggedIn", "true");

    renderWithProviders(<App />);

    // Simulasikan logout
    localStorage.removeItem("isLoggedIn");

    // Render ulang App
    renderWithProviders(<App />);

    // Periksa apakah halaman login dirender
    expect(
      screen.getByRole("heading", { name: /welcome!/i })
    ).toBeInTheDocument();
  });
});
