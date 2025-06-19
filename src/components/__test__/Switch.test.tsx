import { render, screen, fireEvent } from "@testing-library/react";
import Switch from "../Switch";

describe("Switch", () => {
  it("renders with default labels and checked state", () => {
    render(<Switch checked={true} onChange={() => {}} />);
    expect(screen.getByText("On")).toBeInTheDocument();
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true");
  });

  it("renders with custom labels and unchecked state", () => {
    render(
      <Switch checked={false} onChange={() => {}} labelOn='Yes' labelOff='No' />
    );
    expect(screen.getByText("No")).toBeInTheDocument();
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "false");
  });

  it("calls onChange when clicked (mouse)", () => {
    const handleChange = jest.fn();
    render(<Switch checked={false} onChange={handleChange} />);
    const button = screen.getByRole("button");
    fireEvent.mouseUp(button);
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it("calls onChange when toggled with keyboard (Enter/Space)", () => {
    const handleChange = jest.fn();
    render(<Switch checked={false} onChange={handleChange} />);
    const slider = screen.getByRole("switch");
    fireEvent.keyDown(slider, { key: "Enter" });
    fireEvent.keyDown(slider, { key: " " });
    expect(handleChange).toHaveBeenCalledTimes(2);
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it("does not call onChange if disabled (mouse/keyboard)", () => {
    const handleChange = jest.fn();
    render(<Switch checked={false} onChange={handleChange} disabled />);
    const button = screen.getByRole("button");
    const slider = screen.getByRole("switch");
    fireEvent.mouseUp(button);
    fireEvent.keyDown(slider, { key: "Enter" });
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("renders with custom name, id, and className", () => {
    render(
      <Switch
        checked={false}
        onChange={() => {}}
        name='mySwitch'
        id='switch1'
        className='custom-class'
        containerClassName='custom-container'
      />
    );
    const input = screen.getByRole("checkbox");
    expect(input).toHaveAttribute("name", "mySwitch");
    expect(input).toHaveAttribute("id", "switch1");
    expect(screen.getByRole("button").className).toContain("custom-class");
    expect(screen.getByText("Bko").parentElement).toHaveClass(
      "custom-container"
    );
  });
});
