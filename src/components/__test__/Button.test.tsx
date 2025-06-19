import { render, fireEvent, screen } from "@testing-library/react";
import Button from "../Button";
import React from "react";

describe("Button", () => {
  it("renders with default props and children", () => {
    render(<Button>Click Me</Button>);
    const btn = screen.getByRole("button");
    expect(btn).toHaveClass("btn", "btn--primary", "btn--md");
    expect(btn).toHaveTextContent("Click Me");
  });

  it("renders with different variants and sizes", () => {
    render(
      <>
        <Button variant='secondary'>Secondary</Button>
        <Button variant='danger' size='lg'>
          Danger
        </Button>
        <Button variant='success' size='sm'>
          Success
        </Button>
      </>
    );
    expect(screen.getByText("Secondary")).toHaveClass("btn--secondary");
    expect(screen.getByText("Danger")).toHaveClass("btn--danger", "btn--lg");
    expect(screen.getByText("Success")).toHaveClass("btn--success", "btn--sm");
  });

  it("shows loading spinner and disables button when loading", () => {
    render(<Button loading>Loading</Button>);
    const btn = screen.getByRole("button");
    expect(btn).toBeDisabled();
    expect(btn.querySelector(".btn__spinner")).toBeInTheDocument();
    expect(btn).not.toHaveTextContent("Loading"); // spinner replaces icon/children
  });

  it("shows icon when provided and not loading", () => {
    render(
      <Button icon={<span data-testid='icon'>icon</span>}>With Icon</Button>
    );
    expect(screen.getByTestId("icon")).toBeInTheDocument();
    expect(screen.getByText("With Icon")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalled();
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("passes additional props to button element", () => {
    render(
      <Button type='submit' aria-label='submit-btn'>
        Submit
      </Button>
    );
    const btn = screen.getByRole("button");
    expect(btn).toHaveAttribute("type", "submit");
    expect(btn).toHaveAttribute("aria-label", "submit-btn");
  });
});
