import { render, fireEvent, screen } from "@testing-library/react";
import BasicSelect from "../BasicSelect";

describe("BasicSelect", () => {
  const options = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
  ];

  it("renders label and options", () => {
    render(
      <BasicSelect
        label='Test Label'
        errorMessage=''
        options={options}
        name='test'
        onChange={() => {}}
      />
    );
    expect(screen.getByText("Test Label")).toBeInTheDocument();
    expect(screen.getByText(/choose test/i)).toBeInTheDocument();
  });

  it("opens filter and filters options", () => {
    render(
      <BasicSelect
        label='Test Label'
        errorMessage=''
        options={options}
        name='test'
        onChange={() => {}}
      />
    );
    const selectArea = screen.getByText(/choose test/i).closest("div");
    if (selectArea) fireEvent.click(selectArea);
    const input = screen.getByPlaceholderText(/cari/i);
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: "2" } });
    expect(screen.getByText("Option 2")).toBeInTheDocument();
    expect(screen.queryByText("Option 1")).not.toBeVisible();
  });

  it("calls onChange when option is clicked (single)", () => {
    const handleChange = jest.fn();
    render(
      <BasicSelect
        label='Test Label'
        errorMessage=''
        options={options}
        name='test'
        onChange={handleChange}
      />
    );
    const selectArea = screen.getByText(/choose test/i).closest("div");
    if (selectArea) fireEvent.click(selectArea);
    const input = screen.getByPlaceholderText(/cari/i);
    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(handleChange).toHaveBeenCalledWith("1");
  });

  it("calls onChange with array when option is clicked (multiple)", () => {
    const handleChange = jest.fn();
    render(
      <BasicSelect
        label='Test Label'
        errorMessage=''
        options={options}
        name='test'
        onChange={handleChange}
        multiple
        value={[]}
      />
    );
    const selectArea = screen.getByText(/choose test/i).closest("div");
    if (selectArea) fireEvent.click(selectArea);
    const input = screen.getByPlaceholderText(/cari/i);
    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(handleChange).toHaveBeenCalledWith(["1"]);
  });

  it("shows error message if errorMessage is provided", () => {
    render(
      <BasicSelect
        label='Test Label'
        errorMessage='Error!'
        options={options}
        name='test'
        onChange={() => {}}
      />
    );
    expect(screen.getByText("Error!")).toBeInTheDocument();
  });

  it("renders disabled state", () => {
    render(
      <BasicSelect
        label='Test Label'
        errorMessage=''
        options={options}
        name='test'
        onChange={() => {}}
        disabled
      />
    );
    expect(screen.getByText(/choose test/i)).toBeInTheDocument();
    expect(screen.getByText(/choose test/i).closest("div")).toHaveStyle({
      opacity: 0.6,
    });
  });

  it("clears selection when clear button is clicked (single)", () => {
    const handleChange = jest.fn();
    render(
      <BasicSelect
        label='Test Label'
        errorMessage=''
        options={options}
        name='test'
        onChange={handleChange}
        value='1'
      />
    );
    const clearBtn = screen.getByText("X");
    fireEvent.click(clearBtn);
    expect(handleChange).toHaveBeenCalledWith("");
  });

  it("clears selection when clear button is clicked (multiple)", () => {
    const handleChange = jest.fn();
    render(
      <BasicSelect
        label='Test Label'
        errorMessage=''
        options={options}
        name='test'
        onChange={handleChange}
        multiple
        value={["1", "2"]}
      />
    );
    const clearBtn = screen.getByText("X");
    fireEvent.click(clearBtn);
    expect(handleChange).toHaveBeenCalledWith([]);
  });

  it("removes a single selected value in multiple mode", () => {
    const handleChange = jest.fn();
    render(
      <BasicSelect
        label='Test Label'
        errorMessage=''
        options={options}
        name='test'
        onChange={handleChange}
        multiple
        value={["1", "2"]}
      />
    );
    // Find the remove button for Option 1
    const removeBtns = screen.getAllByText("x");
    fireEvent.click(removeBtns[0]);
    expect(handleChange).toHaveBeenCalledWith(["2"]);
  });

  it("shows placeholder if value is empty", () => {
    render(
      <BasicSelect
        label='Test Label'
        errorMessage=''
        options={options}
        name='test'
        onChange={() => {}}
        value=''
      />
    );
    expect(screen.getByText(/choose test/i)).toBeInTheDocument();
  });

  it("handles keyboard navigation and closes on Escape", () => {
    render(
      <BasicSelect
        label='Test Label'
        errorMessage=''
        options={options}
        name='test'
        onChange={() => {}}
      />
    );
    const selectArea = screen.getByText(/choose test/i).closest("div");
    if (selectArea) fireEvent.click(selectArea);
    const input = screen.getByPlaceholderText(/cari/i);
    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "ArrowUp" });
    fireEvent.keyDown(input, { key: "Escape" });
    expect(input).not.toBeVisible();
  });
});
