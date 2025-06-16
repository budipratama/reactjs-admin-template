# BasicSelect Component Usage Guide

`BasicSelect` is a flexible React dropdown/select component with local search, event delegation (clear), validation, accessibility, and dynamic dropdown positioning.

## Import
```jsx
import BasicSelect from "./BasicSelect";
```

## Props
| Prop                | Type                        | Description                                                      |
|---------------------|-----------------------------|------------------------------------------------------------------|
| name                | string                      | Field name (required)                                            |
| label               | string                      | Label to display                                                 |
| options             | Option[]                    | Array of options `{ label, value }`                              |
| value               | string                      | Selected value (controlled from parent, default: "")             |
| onChange            | (value: string) => void     | Callback when value changes                                      |
| placeholder         | string                      | Placeholder if no value selected                                 |
| required            | boolean                     | Show required mark (*)                                           |
| errorMessage        | string                      | Error/validation message                                         |
| containerClassName  | string                      | CSS class for container (default: 'form__group')                 |

## Option Type
```ts
type Option = { label: string; value: string };
```

## Example Usage
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

## Features
- **Search**: Type in the input to filter options.
- **Clear**: Click the X button to clear the selection.
- **Keyboard**: Navigate with arrow keys, Enter to select, Escape to close.
- **Accessibility**: Proper label, focus, and keyboard navigation supported.
- **Validation**: Show error message with `errorMessage` prop.
- **Dropdown Positioning**: Dropdown will open above if not enough space below.

## Event Delegation (Clear)
The clear (X) button uses event delegation for robust event handling even if the DOM changes.

## Styling
Uses built-in SCSS (`_select.scss`). You can override with the `containerClassName` prop.

## Form Integration
Works with form libraries (Formik, React Hook Form) by controlling `value` and `onChange` props.

---
For more advanced usage, see the example in `src/pages/Form.tsx`.
