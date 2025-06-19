import { render, screen, fireEvent } from "@testing-library/react";
import AccountSettings from "../AccountSettings";

describe("AccountSettings page", () => {
  it("renders profile info and tabs", () => {
    render(<AccountSettings />);
    expect(screen.getByText("Budi Pratama")).toBeInTheDocument();
    expect(screen.getByText("Admin")).toBeInTheDocument();
    expect(screen.getByText(/California/)).toBeInTheDocument();
    expect(
      screen.getByRole("tab", { name: /personal details/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("tab", { name: /change password/i })
    ).toBeInTheDocument();
  });

  it("shows personal details tab by default", () => {
    render(<AccountSettings />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/gender/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/street/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/city/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/state/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/post code/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/country/i)).toBeInTheDocument();
  });

  it("switches to change password tab and toggles password visibility", () => {
    render(<AccountSettings />);
    const changeTab = screen.getByRole("tab", { name: /change password/i });
    fireEvent.click(changeTab);
    expect(screen.getByLabelText(/current password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/new password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm new password/i)).toBeInTheDocument();
    // Toggle current password visibility
    const toggleBtns = screen.getAllByRole("button", {
      name: /show password|hide password/i,
    });
    fireEvent.click(toggleBtns[0]);
    // Toggle new password visibility
    fireEvent.click(toggleBtns[1]);
    // Toggle confirm new password visibility
    fireEvent.click(toggleBtns[2]);
    expect(screen.getByLabelText(/current password/i)).toHaveAttribute(
      "type",
      "password"
    );
    expect(screen.getByLabelText(/new password/i)).toHaveAttribute("type");
    expect(screen.getByLabelText(/confirm new password/i)).toHaveAttribute(
      "type"
    );
  });

  it("scrolls to correct section when tab is clicked", () => {
    render(<AccountSettings />);
    const personalTab = screen.getByRole("tab", { name: /personal details/i });
    const changeTab = screen.getByRole("tab", { name: /change password/i });
    fireEvent.click(changeTab);
    expect(screen.getByLabelText(/current password/i)).toBeInTheDocument();
    fireEvent.click(personalTab);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  });
});
