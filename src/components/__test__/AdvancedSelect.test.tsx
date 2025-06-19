import { render, fireEvent, screen } from "@testing-library/react";
import AdvancedSelect from "../AdvancedSelect";

describe("AdvancedSelect", () => {
  const rawOptions = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
  ];
  const optionMapper = (item: any) => ({
    label: item.label,
    value: item.value,
  });
  const onSearch = jest.fn();

  it("renders label and options", () => {
    render(
      <AdvancedSelect
        name='test'
        label='Test Label'
        errorMessage=''
        onChange={() => {}}
        rawOptions={rawOptions}
        optionMapper={optionMapper}
        onSearch={onSearch}
      />
    );
    expect(screen.getByText("Test Label")).toBeInTheDocument();
    // Option 1 is rendered as selected by default (span)
    expect(screen.getByText(/choose test/i)).toBeInTheDocument();
  });

  it("opens filter and filters options on search", () => {
    render(
      <AdvancedSelect
        name='test'
        label='Test Label'
        errorMessage=''
        onChange={() => {}}
        rawOptions={rawOptions}
        optionMapper={optionMapper}
        onSearch={onSearch}
      />
    );
    // Open filter
    const selectArea = screen.getByText(/choose test/i).closest("div");
    if (selectArea) fireEvent.click(selectArea);
    const input = screen.getByPlaceholderText(/cari/i);
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: "2" } });
    expect(onSearch).toHaveBeenCalledWith("2");
  });

  it("calls onChange when option is clicked (single)", () => {
    const handleChange = jest.fn();
    render(
      <AdvancedSelect
        name='test'
        label='Test Label'
        errorMessage=''
        onChange={handleChange}
        rawOptions={rawOptions}
        optionMapper={optionMapper}
        onSearch={onSearch}
      />
    );
    // Open filter
    const selectArea = screen.getByText(/choose test/i).closest("div");
    if (selectArea) fireEvent.click(selectArea);
    const input = screen.getByPlaceholderText(/cari/i);
    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(handleChange).toHaveBeenCalled();
  });

  it("calls onChange with array when option is clicked (multiple)", () => {
    const handleChange = jest.fn();
    render(
      <AdvancedSelect
        name='test'
        label='Test Label'
        errorMessage=''
        onChange={handleChange}
        rawOptions={rawOptions}
        optionMapper={optionMapper}
        onSearch={onSearch}
        multiple
        value={[]}
      />
    );
    // Open filter
    const selectArea = screen.getByText(/choose test/i).closest("div");
    if (selectArea) fireEvent.click(selectArea);
    const input = screen.getByPlaceholderText(/cari/i);
    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(handleChange).toHaveBeenCalledWith([
      { label: "Option 1", value: "1" },
    ]);
  });

  it("shows error message if errorMessage is provided", () => {
    render(
      <AdvancedSelect
        name='test'
        label='Test Label'
        errorMessage='Error!'
        onChange={() => {}}
        rawOptions={rawOptions}
        optionMapper={optionMapper}
        onSearch={onSearch}
      />
    );
    expect(screen.getByText("Error!")).toBeInTheDocument();
  });

  it("renders disabled state", () => {
    render(
      <AdvancedSelect
        name='test'
        label='Test Label'
        errorMessage=''
        onChange={() => {}}
        rawOptions={rawOptions}
        optionMapper={optionMapper}
        onSearch={onSearch}
        disabled
      />
    );
    expect(screen.getByText(/choose test/i)).toBeInTheDocument();
    expect(screen.getByText(/choose test/i).closest("div")).toHaveClass(
      "select__disabled"
    );
  });

  it("clears selection when clear button is clicked (single)", () => {
    const handleChange = jest.fn();
    render(
      <AdvancedSelect
        name='test'
        label='Test Label'
        errorMessage=''
        onChange={handleChange}
        rawOptions={rawOptions}
        optionMapper={optionMapper}
        onSearch={onSearch}
        value={{ label: "Option 1", value: "1" }}
      />
    );
    const clearBtn = screen.getByText("X");
    fireEvent.click(clearBtn);
    expect(handleChange).toHaveBeenCalledWith("");
  });

  it("clears selection when clear button is clicked (multiple)", () => {
    const handleChange = jest.fn();
    render(
      <AdvancedSelect
        name='test'
        label='Test Label'
        errorMessage=''
        onChange={handleChange}
        rawOptions={rawOptions}
        optionMapper={optionMapper}
        onSearch={onSearch}
        multiple
        value={[
          { label: "Option 1", value: "1" },
          { label: "Option 2", value: "2" },
        ]}
      />
    );
    const clearBtn = screen.getByText("X");
    fireEvent.click(clearBtn);
    expect(handleChange).toHaveBeenCalledWith([]);
  });

  it("removes a single selected value in multiple mode", () => {
    const handleChange = jest.fn();
    render(
      <AdvancedSelect
        name='test'
        label='Test Label'
        errorMessage=''
        onChange={handleChange}
        rawOptions={rawOptions}
        optionMapper={optionMapper}
        onSearch={onSearch}
        multiple
        value={[
          { label: "Option 1", value: "1" },
          { label: "Option 2", value: "2" },
        ]}
      />
    );
    // Find the remove button for Option 1
    const removeBtns = screen.getAllByText("x");
    fireEvent.click(removeBtns[0]);
    expect(handleChange).toHaveBeenCalledWith([
      { label: "Option 2", value: "2" },
    ]);
  });

  it("shows search hint if search is too short", () => {
    render(
      <AdvancedSelect
        name='test'
        label='Test Label'
        errorMessage=''
        onChange={() => {}}
        rawOptions={rawOptions}
        optionMapper={optionMapper}
        onSearch={onSearch}
        minSearchLength={3}
      />
    );
    const selectArea = screen.getByText(/choose test/i).closest("div");
    if (selectArea) fireEvent.click(selectArea);
    const input = screen.getByPlaceholderText(/cari/i);
    fireEvent.change(input, { target: { value: "a" } });
    expect(screen.getByText(/type at least 3 character/i)).toBeInTheDocument();
  });
});
