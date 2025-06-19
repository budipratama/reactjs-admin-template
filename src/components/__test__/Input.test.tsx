import { render, screen, fireEvent } from "@testing-library/react";
import Input from "../Input";

describe("Input", () => {
  it("renders with default props", () => {
    render(<Input id='test' name='test' />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("id", "test");
    expect(input).toHaveAttribute("name", "test");
    expect(input).toHaveAttribute("type", "text");
    expect(input).toHaveClass("form__input");
  });

  it("renders with custom type and className", () => {
    render(
      <Input id='email' name='email' type='email' className='custom-class' />
    );
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("type", "email");
    expect(input).toHaveClass("custom-class");
  });

  it("renders with value and calls onChange", () => {
    const handleChange = jest.fn();
    render(
      <Input
        id='username'
        name='username'
        value='user'
        onChange={handleChange}
      />
    );
    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("user");
    fireEvent.change(input, { target: { value: "newuser" } });
    expect(handleChange).toHaveBeenCalled();
  });

  it("passes additional props to input", () => {
    render(<Input id='pass' name='pass' placeholder='Password' required />);
    const input = screen.getByPlaceholderText("Password");
    expect(input).toBeRequired();
  });
});
