# AdvancedSelect Component Usage Guide

`AdvancedSelect` is a powerful React dropdown/select component with API-driven options, local search, debounce, event delegation (clear), validation, accessibility, dynamic dropdown positioning, and support for both single and multiple selection. It is ideal for large or remote datasets.

## Import
```jsx
import AdvancedSelect from "./AdvancedSelect";
```

## Props
| Prop                | Type                                      | Description                                                      |
|---------------------|-------------------------------------------|------------------------------------------------------------------|
| name                | string                                    | Field name (required)                                            |
| label               | string                                    | Label to display                                                 |
| options             | Option[]                                  | (Not used directly, see `rawOptions` and `optionMapper`)         |
| value               | Option \| Option[] \| ""                   | Selected value(s) (object or array of object, default: "")       |
| onChange            | (value: Option \| Option[] \| "") => void  | Callback when value changes                                      |
| placeholder         | string                                    | Placeholder if no value selected                                 |
| required            | boolean                                   | Show required mark (*)                                           |
| errorMessage        | string                                    | Error/validation message                                         |
| containerClassName  | string                                    | CSS class for container (default: 'form__group')                 |
| multiple            | boolean                                   | Enable multiple selection (default: false)                       |
| disabled            | boolean                                   | Disable the select (default: false)                              |
| minSearchLength     | number                                    | Minimum characters to trigger search (default: 1)                |
| rawOptions          | any[]                                     | Raw data array from API or source                                |
| optionMapper        | (item: any) => Option                     | Function to map raw data to `{ label, value }`                   |
| onSearch            | (search: string) => void                  | Callback for search input (for API search, debounced)            |

## Option Type
```ts
type Option = { label: string; value: string };
```

## Example Usage (Single Select, API Search)
```jsx
const [countryApi, setCountryApi] = useState<any[]>([]);
const [selectedCountry, setSelectedCountry] = useState<Option | "">("");

const handleCountrySearch = async (search) => {
  const res = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(search)}`);
  const data = await res.json();
  setCountryApi(data);
};

<AdvancedSelect
  name="country"
  label="Country"
  value={selectedCountry}
  onChange={setSelectedCountry}
  errorMessage={errorCountry}
  minSearchLength={1}
  onSearch={handleCountrySearch}
  rawOptions={countryApi}
  optionMapper={item => ({
    label: item.name?.common || item.name || "",
    value: item.cca2 || item.cca3 || item.name?.common || item.name || "",
  })}
  placeholder="Search country..."
/>
```

## Example Usage (Multiple Select, API Search)
```jsx
const [countryApi, setCountryApi] = useState<any[]>([]);
const [selectedCountries, setSelectedCountries] = useState<Option[]>([]);

<AdvancedSelect
  name="countries"
  label="Countries"
  value={selectedCountries}
  onChange={setSelectedCountries}
  multiple={true}
  minSearchLength={1}
  onSearch={handleCountrySearch}
  rawOptions={countryApi}
  optionMapper={item => ({
    label: item.name?.common || item.name || "",
    value: item.cca2 || item.cca3 || item.name?.common || item.name || "",
  })}
  placeholder="Search countries..."
/>
```

## Example Usage (Disabled)
```jsx
<AdvancedSelect
  name="countries"
  label="Countries"
  value={selectedCountries}
  onChange={setSelectedCountries}
  multiple={true}
  disabled={true}
  // ...other props
/>
```

## Features
- **API/Remote Search**: Use `onSearch` and `rawOptions` for async search.
- **Debounce**: Search is debounced for performance.
- **Clear**: Click the X button to clear the selection(s).
- **Multiple**: Select more than one option with `multiple={true}`.
- **Keyboard**: Navigate with arrow keys, Enter to select, Escape to close.
- **Accessibility**: Proper label, focus, and keyboard navigation supported.
- **Validation**: Show error message with `errorMessage` prop.
- **Dropdown Positioning**: Dropdown will open above if not enough space below.
- **Disabled**: Prevent all interaction and show dimmed style with `disabled={true}`.

## Event Delegation (Clear)
The clear (X) button uses event delegation for robust event handling even if the DOM changes.

## Styling
Uses built-in SCSS (`_select.scss`). You can override with the `containerClassName` prop.

## Form Integration
Works with form libraries (Formik, React Hook Form) by controlling `value` and `onChange` props. For multiple select, use an array of Option object for value.

---
For more advanced usage, see the example in `src/pages/Form.tsx` or your API integration code.
