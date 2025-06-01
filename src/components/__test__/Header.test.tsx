import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../Header";
import { ModalProvider } from "../../context/ModalContext";
import { AuthProvider } from "../../context/AuthContext";
import { BrowserRouter } from "react-router-dom";

const renderHeader = (props = {}) =>
  render(
    <AuthProvider>
      <BrowserRouter>
        <ModalProvider>
          <Header {...props} />
        </ModalProvider>
      </BrowserRouter>
    </AuthProvider>
  );

test("click profile button opens modal", () => {
  renderHeader();
  const btn = screen.getByRole("button", { name: /profileimg/i });
  fireEvent.click(btn);
  // Use getAllByText to avoid error when multiple elements match
  const profileTexts = screen.getAllByText(/profile/i);
  expect(profileTexts.length).toBeGreaterThan(0);
});

test("click search button opens modal", () => {
  const { container } = renderHeader();
  // Use querySelector for button with no accessible name
  const btn = container.querySelector(".header__search");
  expect(btn).not.toBeNull();
  if (btn) {
    fireEvent.click(btn);
    expect(screen.getByText(/quick page links/i)).toBeInTheDocument();
  }
});

// Tambahkan test untuk sidebarCollapsed, sidebarHovered, handleLogout, dsb.
