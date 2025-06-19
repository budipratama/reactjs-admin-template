import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AutoComplete from "../AutoComplete";

// Mock fetch for country API
beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue([
      { name: { common: "Indonesia" }, cca2: "ID" },
      { name: { common: "Japan" }, cca2: "JP" },
    ]),
  }) as any; //kmsdfds
});
afterEach(() => {
  jest.clearAllMocks();
});

describe("AutoComplete page", () => {
  it("renders all select fields", () => {
    render(<AutoComplete />);
    expect(screen.getByLabelText(/gender/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/hobbies/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/country/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/countries/i)).toBeInTheDocument();
  });

  it("can select gender and hobbies (basic select)", () => {
    render(<AutoComplete />);
    // Gender
    const genderSelect = screen.getByLabelText(/gender/i).closest("div");
    if (genderSelect) fireEvent.click(genderSelect);
    const input = screen.getByPlaceholderText(/cari/i);
    fireEvent.change(input, { target: { value: "male" } });
    const option = screen.getByText(/male/i);
    fireEvent.mouseDown(option);
    expect(screen.getByText(/male/i)).toBeInTheDocument();
    // Hobbies
    const hobbiesSelect = screen.getByLabelText(/hobbies/i).closest("div");
    if (hobbiesSelect) fireEvent.click(hobbiesSelect);
    const input2 = screen.getByPlaceholderText(/cari/i);
    fireEvent.change(input2, { target: { value: "reading" } });
    const option2 = screen.getByText(/reading/i);
    fireEvent.mouseDown(option2);
    expect(screen.getByText(/reading/i)).toBeInTheDocument();
  });

  it("can search and select country (advanced select)", async () => {
    render(<AutoComplete />);
    // Country
    const countrySelect = screen.getByLabelText(/country/i).closest("div");
    if (countrySelect) fireEvent.click(countrySelect);
    const input = screen.getByPlaceholderText(/cari/i);
    fireEvent.change(input, { target: { value: "indo" } });
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    await waitFor(() =>
      expect(screen.getByText(/indonesia/i)).toBeInTheDocument()
    );
    const option = screen.getByText(/indonesia/i);
    fireEvent.mouseDown(option);
    expect(screen.getByText(/indonesia/i)).toBeInTheDocument();
  });

  it("can search and select multiple countries (advanced select multiple)", async () => {
    render(<AutoComplete />);
    // Countries
    const countriesSelect = screen.getByLabelText(/countries/i).closest("div");
    if (countriesSelect) fireEvent.click(countriesSelect);
    const input = screen.getByPlaceholderText(/cari/i);
    fireEvent.change(input, { target: { value: "jap" } });
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    await waitFor(() => expect(screen.getByText(/japan/i)).toBeInTheDocument());
    const option = screen.getByText(/japan/i);
    fireEvent.mouseDown(option);
    expect(screen.getByText(/japan/i)).toBeInTheDocument();
  });
});
