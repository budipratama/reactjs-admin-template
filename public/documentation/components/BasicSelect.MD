# BasicSelect Component Usage Guide

`BasicSelect` is a flexible React dropdown/select component with local search, event delegation (clear), validation, accessibility, dynamic dropdown positioning, and support for both single and multiple selection.

## Import
```jsx
import BasicSelect from "./BasicSelect";
```

## Props
| Prop                | Type                              | Description                                                      |
|---------------------|-----------------------------------|------------------------------------------------------------------|
| name                | string                            | Field name (required)                                            |
| label               | string                            | Label to display                                                 |
| options             | Option[]                          | Array of options `{ label, value }`                              |
| value               | string \| string[]                | Selected value(s) (controlled from parent, default: "")          |
| onChange            | (value: string \| string[]) => void | Callback when value changes                                      |
| placeholder         | string                            | Placeholder if no value selected                                 |
| required            | boolean                           | Show required mark (*)                                           |
| errorMessage        | string                            | Error/validation message                                         |
| containerClassName  | string                            | CSS class for container (default: 'form__group')                 |
| multiple            | boolean                           | Enable multiple selection (default: false)                       |
| disabled            | boolean                           | Disable the select (default: false)                              |

## Option Type
```ts
type Option = { label: string; value: string };
```

## Example Usage (Single Select)
```jsx
const options = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

<BasicSelect
  name="gender"
  label="Gender"
  options={options}
  value={selectedGender}
  onChange={setSelectedGender}
  placeholder="Select gender"
  required
  errorMessage={errorGender}
/>
```

## Example Usage (Multiple Select)
```jsx
const hobbyOptions = [
  { label: "Bike", value: "bike" },
  { label: "Reading", value: "reading" },
  { label: "Swimming", value: "swimming" },
];

<BasicSelect
  name="hobbies"
  label="Hobbies"
  options={hobbyOptions}
  value={selectedHobbies} // array of string
  onChange={setSelectedHobbies}
  multiple={true}
  placeholder="Select hobbies"
/>
```

## Example Usage (Disabled)
```jsx
<BasicSelect
  name="gender"
  label="Gender"
  options={options}
  value={selectedGender}
  onChange={setSelectedGender}
  disabled={true}
/>
```

## Features
- **Search**: Type in the input to filter options.
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
Works with form libraries (Formik, React Hook Form) by controlling `value` and `onChange` props. For multiple select, use an array of string for value.

---
For more advanced usage, see the example in `src/pages/Form.tsx`.
