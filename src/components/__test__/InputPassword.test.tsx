import { render, screen, fireEvent } from "@testing-library/react";
import InputPassword from "../InputPassword";

describe("InputPassword", () => {
  it("renders label, input, and toggle button", () => {
    render(<InputPassword label='My Password' id='pw' name='pw' />);
    expect(screen.getByLabelText("My Password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /toggle password/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText("My Password")).toHaveAttribute(
      "type",
      "password"
    );
  });

  it("toggles password visibility when button is clicked", () => {
    render(<InputPassword label='Password' id='pw' name='pw' value='secret' />);
    const toggleBtn = screen.getByRole("button", { name: /toggle password/i });
    const input = screen.getByLabelText("Password");
    expect(input).toHaveAttribute("type", "password");
    fireEvent.click(toggleBtn);
    expect(input).toHaveAttribute("type", "text");
    fireEvent.click(toggleBtn);
    expect(input).toHaveAttribute("type", "password");
  });

  it("shows error message and error class", () => {
    render(
      <InputPassword label='Password' id='pw' name='pw' errorMessage='Error!' />
    );
    expect(screen.getByText("Error!")).toBeInTheDocument();
    const container =
      screen.getByLabelText("Password").parentElement?.parentElement;
    expect(container).toHaveClass("has-error");
  });

  it("shows required indicator when required", () => {
    render(<InputPassword label='Password' id='pw' name='pw' required />);
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("shows password strength if value is present", () => {
    render(
      <InputPassword
        label='Password'
        id='pw'
        name='pw'
        value='strongpass'
        passwordStrength='Strong Password'
      />
    );
    expect(screen.getByText("Strong Password")).toBeInTheDocument();
    expect(screen.getByText("Strong Password")).toHaveClass(
      "form__password-strength"
    );
  });

  it("shows weak password class if not strong", () => {
    render(
      <InputPassword
        label='Password'
        id='pw'
        name='pw'
        value='123'
        passwordStrength='Weak Password'
      />
    );
    expect(screen.getByText("Weak Password")).toHaveClass(
      "form__password-weak"
    );
  });

  it("calls onChange when input value changes", () => {
    const handleChange = jest.fn();
    render(
      <InputPassword
        label='Password'
        id='pw'
        name='pw'
        onChange={handleChange}
      />
    );
    const input = screen.getByLabelText("Password");
    fireEvent.change(input, { target: { value: "newpass" } });
    expect(handleChange).toHaveBeenCalled();
  });
});
