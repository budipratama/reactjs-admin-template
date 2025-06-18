# Button Component Usage Guide

`Button` is a reusable button component with various features: variant, size, loading, icon, and supports all standard button attributes.

## Import
```jsx
import Button from "./Button";
```

## Props
| Prop      | Type                                 | Default   | Description                                   |
|-----------|--------------------------------------|-----------|-----------------------------------------------|
| variant   | "primary" | "secondary" | "danger" | "success" | "primary" | Button color/style                            |
| size      | "sm" | "md" | "lg"                  | "md"      | Button size                                   |
| loading   | boolean                              | false     | Show loading spinner                          |
| icon      | ReactNode                            | -         | Icon on the left of button text               |
| ...rest   | ButtonHTMLAttributes<HTMLButtonElement> | -      | All standard button attributes (onClick, etc) |

## Usage Examples

### 1. Basic Button
```jsx
<Button>Click Me</Button>
```

### 2. Variant
```jsx
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="danger">Danger</Button>
<Button variant="success">Success</Button>
```

### 3. Size
```jsx
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

### 4. Loading
```jsx
<Button loading>Loading...</Button>
```

### 5. Icon
```jsx
import { FaCheck } from "react-icons/fa";
<Button icon={<FaCheck />}>With Icon</Button>
```

### 6. Disabled
```jsx
<Button disabled>Disabled</Button>
```

### 7. Full Example
```jsx
<Button
  variant="success"
  size="lg"
  loading={isSubmitting}
  icon={<FaCheck />}
  onClick={() => alert("Clicked!")}
>
  Submit
</Button>
```

---

- All prop combinations can be used together.
- When loading, the button is automatically disabled.
- For icons, use an icon library like `react-icons` or SVG/JSX.
- You can override styling with additional className if needed.

