# SearchableSelect Component

A flexible, accessible, and robust React select component with support for both local and API-based search, custom validation, and modular UI.

## Features
- Local and API search modes
- Debounced API search with customizable minimum search length
- Custom mapping for API data (label/value)
- Keyboard navigation and accessible dropdown
- Error handling and prop validation with clear UI feedback
- Modular, reusable, and easy to integrate
- Error message display via `error` prop

## Props
| Prop             | Type                                | Required | Default   | Description                                                                                 |
|------------------|-------------------------------------|----------|-----------|---------------------------------------------------------------------------------------------|
| `options`        | `{ label: string, value: string }[]` | No       | `[]`      | List of options for local search mode                                                       |
| `value`          | `string`                            | Yes      |           | The selected value                                                                          |
| `onChange`       | `(value: string) => void`            | Yes      |           | Callback when value changes                                                                 |
| `placeholder`    | `string`                            | No       | `Select...`| Placeholder text                                                                            |
| `label`          | `string`                            | No       |           | Label for the select field                                                                  |
| `name`           | `string`                            | No       |           | Name attribute                                                                              |
| `searchMode`     | `'local' | 'api'`                   | No       | `'local'` | Search mode: 'local' for static options, 'api' for remote search                            |
| `rawOptions`     | `any[]`                             | Yes*     |           | Raw API data array (required for `searchMode='api'`)                                        |
| `optionMapper`   | `(item: any) => {label, value}`      | Yes*     |           | Function to map raw API data to `{label, value}` (required for `searchMode='api'`)          |
| `onSearch`       | `(search: string) => void`           | Yes*     |           | Callback to trigger API search (required for `searchMode='api'`)                            |
| `minSearchLength`| `number`                            | No       | `2`       | Minimum characters before search/API is triggered and dropdown is shown                      |
| `error`          | `string`                            | No       |           | Error message to display below the select (e.g. for required validation)                    |

\* Required only if `searchMode='api'`.

## Usage

### Local Search Example
```tsx
<SearchableSelect
  label="Country"
  value={selectedCountry}
  onChange={setSelectedCountry}
  options={[
    { label: "Indonesia", value: "indonesia" },
    { label: "USA", value: "usa" },
    { label: "Singapore", value: "singapore" },
    { label: "Malaysia", value: "malaysia" },
  ]}
  searchMode="local"
  minSearchLength={1} // optional
  error={errors.country} // tampilkan pesan error jika ada
/>
```

### API Search Example
```tsx
const [apiData, setApiData] = useState<any[]>([]);
const handleSearch = async (search: string) => {
  if (search.length > 1) {
    const res = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(search)}`);
    const data = await res.json();
    setApiData(Array.isArray(data) ? data : []);
  } else {
    setApiData([]);
  }
};

<SearchableSelect
  label="Country"
  value={selectedCountry}
  onChange={setSelectedCountry}
  searchMode="api"
  minSearchLength={2} // optional
  rawOptions={apiData}
  optionMapper={item => ({
    label: item.name?.common || item.name || "",
    value: item.cca2 || item.cca3 || item.name?.common || item.name || "",
  })}
  onSearch={handleSearch}
  error={errors.country} // tampilkan pesan error jika ada
/>
```

## Error Handling
- If required props are missing for the selected `searchMode`, a clear error message and the received props will be shown in the UI.
- For `searchMode='api'`, you must provide `rawOptions`, `optionMapper`, and `onSearch`.
- For `searchMode='local'`, do not provide `rawOptions` or `onSearch`.
- For validation (e.g. required), pass your error message via the `error` prop.

## Accessibility & UX
- Keyboard navigation: Up/Down arrows, Enter to select, Escape to close.
- Dropdown will not show options until `minSearchLength` is reached.
- Customizable placeholder and label.
- Error state is visually indicated on the select.

## Notes
- For API mode, all data fetching and mapping is handled in the parent. The component only displays mapped options.
- You can style the component further using the provided class names.

---

For more advanced usage, see the code and comments in `SearchableSelect.tsx`.
