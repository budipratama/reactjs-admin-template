import { render, screen, fireEvent } from "@testing-library/react";
import TextAreaLabel from "../TextAreaLabel";

describe("TextAreaLabel", () => {
  it("renders label and textarea with correct props", () => {
    render(<TextAreaLabel label='Description' id='desc' name='desc' />);
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
    expect(screen.getByLabelText("Description")).toHaveAttribute("id", "desc");
    expect(screen.getByLabelText("Description")).toHaveAttribute(
      "name",
      "desc"
    );
  });

  it("applies containerClassName and error class", () => {
    render(
      <TextAreaLabel
        label='Notes'
        id='notes'
        name='notes'
        containerClassName='custom-container'
        errorMessage='Error!'
      />
    );
    const container =
      screen.getByLabelText("Notes").parentElement?.parentElement;
    expect(container).toHaveClass("custom-container");
    expect(container).toHaveClass("has-error");
    expect(screen.getByText("Error!")).toBeInTheDocument();
  });

  it("shows required indicator when required", () => {
    render(
      <TextAreaLabel label='Comment' id='comment' name='comment' required />
    );
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("passes additional props to textarea", () => {
    render(
      <TextAreaLabel
        label='Bio'
        id='bio'
        name='bio'
        placeholder='Enter bio'
        value='My bio'
      />
    );
    const textarea = screen.getByPlaceholderText("Enter bio");
    expect(textarea).toHaveValue("My bio");
  });

  it("calls onChange when textarea value changes", () => {
    const handleChange = jest.fn();
    render(
      <TextAreaLabel
        label='Message'
        id='msg'
        name='msg'
        onChange={handleChange}
      />
    );
    const textarea = screen.getByLabelText("Message");
    fireEvent.change(textarea, { target: { value: "Hello" } });
    expect(handleChange).toHaveBeenCalled();
  });
});
