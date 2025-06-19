import { render, screen, fireEvent } from "@testing-library/react";
import InputLabel from "../InputLabel";

describe("InputLabel", () => {
  it("renders label and input with correct props", () => {
    render(<InputLabel label='Full Name' id='fullname' name='fullname' />);
    expect(screen.getByLabelText("Full Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Full Name")).toHaveAttribute(
      "id",
      "fullname"
    );
    expect(screen.getByLabelText("Full Name")).toHaveAttribute(
      "name",
      "fullname"
    );
  });

  it("applies containerClassName and error class", () => {
    render(
      <InputLabel
        label='Email'
        id='email'
        name='email'
        containerClassName='custom-container'
        errorMessage='Error!'
      />
    );
    const container =
      screen.getByLabelText("Email").parentElement?.parentElement;
    expect(container).toHaveClass("custom-container");
    expect(container).toHaveClass("has-error");
    expect(screen.getByText("Error!")).toBeInTheDocument();
  });

  it("shows required indicator when required", () => {
    render(<InputLabel label='Password' id='pass' name='pass' required />);
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("passes additional props to input", () => {
    render(
      <InputLabel
        label='Username'
        id='username'
        name='username'
        type='text'
        placeholder='Enter username'
        value='user'
      />
    );
    const input = screen.getByPlaceholderText("Enter username");
    expect(input).toHaveValue("user");
  });

  it("calls onChange when input value changes", () => {
    const handleChange = jest.fn();
    render(
      <InputLabel label='Name' id='name' name='name' onChange={handleChange} />
    );
    const input = screen.getByLabelText("Name");
    fireEvent.change(input, { target: { value: "John" } });
    expect(handleChange).toHaveBeenCalled();
  });
});
