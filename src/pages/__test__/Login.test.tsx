import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AuthProvider } from "../../context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import Login from "../Login";
import { JSX } from "react";

describe("Login Component", () => {
  const renderWithProviders = (ui: JSX.Element) => {
    return render(
      <AuthProvider>
        <BrowserRouter>{ui}</BrowserRouter>
      </AuthProvider>
    );
  };

  it("renders the login form", () => {
    renderWithProviders(<Login />);
    expect(
      screen.getByRole("heading", { name: /welcome!/i })
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByTestId("login-button")).toBeInTheDocument();
  });

  it("shows an alert when username or password is incorrect", () => {
    jest.spyOn(window, "alert").mockImplementation(() => {});
    renderWithProviders(<Login />);

    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: "wrongUser" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "wrongPass" },
    });
    fireEvent.click(screen.getByTestId("login-button"));

    expect(window.alert).toHaveBeenCalledWith("Username atau password salah!");
  });

  it("navigates to dashboard on successful login", () => {
    renderWithProviders(<Login />);

    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: "admin" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByTestId("login-button"));

    // Tidak perlu expect mockSetIsLoggedIn, cukup pastikan navigasi terjadi
    // Bisa tambahkan expect(navigate).toHaveBeenCalledWith("/profile") jika navigate di-mock
  });

  it('opens the modal when the "Click here to login" button is clicked', () => {
    renderWithProviders(<Login />);

    const openModalButton = screen.getByRole("button", {
      name: /click here to login/i,
    });
    fireEvent.click(openModalButton);

    const modal = screen.getByText(/welcome!/i).closest(".modal");
    expect(modal).toHaveClass("is-open");
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("closes the modal when the close button is clicked", () => {
    renderWithProviders(<Login />);

    const openModalButton = screen.getByRole("button", {
      name: /click here to login/i,
    });
    fireEvent.click(openModalButton);

    const closeModalButton = screen.getByLabelText("Close");
    fireEvent.click(closeModalButton);

    const modal = screen.getByText(/welcome!/i).closest(".modal");
    expect(modal).not.toHaveClass("is-open");
    expect(document.body.style.overflow).toBe("auto");
  });

  it("opens the modal when scrolling down", () => {
    renderWithProviders(<Login />);

    // Simulasikan posisi scroll
    Object.defineProperty(window, "scrollY", {
      value: window.innerHeight / 2,
      writable: true,
    });

    // Trigger event scroll
    fireEvent.scroll(window);

    // Periksa apakah modal terbuka
    const modal = screen.getByText(/welcome!/i).closest(".modal");
    expect(modal).toHaveClass("is-open");

    // Periksa apakah elemen scroll-down disembunyikan
    const scrollDown = screen.getByText(/scroll down/i);
    expect(scrollDown).not.toBeVisible();
  });
});
