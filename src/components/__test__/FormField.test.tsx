import { render, screen, fireEvent } from "@testing-library/react";
import FormField from "../FormField";

describe("FormField", () => {
  it("renders label and input with correct props", () => {
    render(<FormField label='Username' id='username' name='username' />);
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveAttribute("id", "username");
    expect(screen.getByRole("textbox")).toHaveAttribute("name", "username");
  });

  it("applies custom class names", () => {
    render(
      <FormField
        label='Email'
        id='email'
        className='custom-input'
        containerClassName='custom-container'
      />
    );
    expect(screen.getByRole("textbox")).toHaveClass("custom-input");
    expect(screen.getByLabelText("Email").parentElement).toHaveClass(
      "custom-container"
    );
  });

  it("passes additional input props", () => {
    render(
      <FormField
        label='Password'
        id='password'
        type='password'
        placeholder='Enter password'
        required
      />
    );
    const input = screen.getByLabelText("Password");
    expect(input).toHaveAttribute("type", "password");
    expect(input).toHaveAttribute("placeholder", "Enter password");
    expect(input).toBeRequired();
  });

  it("calls onChange when input value changes", () => {
    const handleChange = jest.fn();
    render(<FormField label='Name' id='name' onChange={handleChange} />);
    const input = screen.getByLabelText("Name");
    fireEvent.change(input, { target: { value: "John" } });
    expect(handleChange).toHaveBeenCalled();
  });
});
