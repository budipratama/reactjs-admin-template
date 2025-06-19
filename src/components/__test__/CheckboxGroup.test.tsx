import { render, fireEvent, screen } from "@testing-library/react";
import CheckboxGroup from "../CheckboxGroup";

describe("CheckboxGroup", () => {
  const options = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
  ];

  it("renders all options and legend", () => {
    render(
      <CheckboxGroup
        name='test'
        options={options}
        values={[]}
        onChange={() => {}}
        legend='Test Legend'
      />
    );
    expect(screen.getByText("Test Legend")).toBeInTheDocument();
    options.forEach((opt) => {
      expect(screen.getByText(opt.label)).toBeInTheDocument();
    });
  });

  it("checks and unchecks checkboxes", () => {
    const handleChange = jest.fn();
    render(
      <CheckboxGroup
        name='test'
        options={options}
        values={[]}
        onChange={handleChange}
      />
    );
    const checkbox = screen.getByLabelText("Option 1");
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledWith(["1"]);
    // Simulate checked state
    render(
      <CheckboxGroup
        name='test'
        options={options}
        values={["1"]}
        onChange={handleChange}
      />
    );
    const checkedBox = screen.getByLabelText("Option 1");
    fireEvent.click(checkedBox);
    expect(handleChange).toHaveBeenCalledWith([]);
  });

  it("shows error message if provided", () => {
    render(
      <CheckboxGroup
        name='test'
        options={options}
        values={[]}
        onChange={() => {}}
        errorMessage='Error!'
      />
    );
    expect(screen.getByText("Error!")).toBeInTheDocument();
  });

  it("shows required indicator in legend", () => {
    render(
      <CheckboxGroup
        name='test'
        options={options}
        values={[]}
        onChange={() => {}}
        legend='Test Legend'
        required
      />
    );
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("renders with no options", () => {
    render(
      <CheckboxGroup name='test' options={[]} values={[]} onChange={() => {}} />
    );
    expect(screen.queryAllByRole("checkbox")).toHaveLength(0);
  });
});
