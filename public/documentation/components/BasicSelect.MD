# BasicSelect Component Usage Guide

`BasicSelect` adalah komponen dropdown/select React yang fleksibel dengan fitur pencarian lokal, event delegation (clear), validasi, aksesibilitas, posisi dropdown dinamis, serta mendukung single dan multiple selection.

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
| value               | string \| string[]                | Selected value(s) (controlled from parent, default: ""/[])       |
| onChange            | (value: string \| string[]) => void | Callback ketika value berubah                                    |
| placeholder         | string                            | Placeholder jika belum ada value                                 |
| required            | boolean                           | Tampilkan tanda wajib (*)                                        |
| errorMessage        | string                            | Pesan error/validasi                                             |
| containerClassName  | string                            | CSS class untuk container (default: 'form__group')               |
| multiple            | boolean                           | Aktifkan multiple selection (default: false)                     |
| disabled            | boolean                           | Nonaktifkan select (default: false)                              |

## Option Type
```ts
type Option = { label: string; value: string };
```

## Contoh Penggunaan (Single Select)
```jsx
const options = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];
const [selectedGender, setSelectedGender] = useState("");

<BasicSelect
  name="gender"
  label="Gender"
  options={options}
  value={selectedGender}
  onChange={(val) => setSelectedGender(val)}
  placeholder="Select gender"
  required
  errorMessage={errorGender}
/>
```

## Contoh Penggunaan (Multiple Select)
```jsx
const hobbyOptions = [
  { label: "Bike", value: "bike" },
  { label: "Reading", value: "reading" },
  { label: "Swimming", value: "swimming" },
];
const [selectedHobbies, setSelectedHobbies] = useState([]);

<BasicSelect
  name="hobbies"
  label="Hobbies"
  options={hobbyOptions}
  value={selectedHobbies} // array of string
  onChange={(val) => setSelectedHobbies(val)}
  multiple={true}
  placeholder="Select hobbies"
/>
```

## Tips Penting
- Untuk multiple select, pastikan value selalu array (default: []).

- Untuk single select, value selalu string (default: "").

- Gunakan updater function pada setState jika value tergantung state sebelumnya:
  ```jsx
  onChange={val => setFormData(prev => ({ ...prev, gender: val }))
  ```

- Hindari value null/undefined, gunakan "" atau [] sesuai mode.

## Contoh Penggunaan (Disabled)
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

## Fitur
- **Search**: Ketik untuk filter opsi.
- **Clear**: Klik tombol X untuk menghapus pilihan.
- **Multiple**: Pilih lebih dari satu opsi dengan `multiple={true}`.
- **Keyboard**: Navigasi dengan panah, Enter untuk pilih, Escape untuk tutup.
- **Aksesibilitas**: Label, fokus, dan navigasi keyboard didukung.
- **Validasi**: Tampilkan pesan error dengan prop `errorMessage`.
- **Dropdown Positioning**: Dropdown otomatis ke atas jika ruang bawah kurang.
- **Disabled**: Semua interaksi dinonaktifkan dan tampilan redup dengan `disabled={true}`.

## Event Delegation (Clear)
Tombol clear (X) menggunakan event delegation agar tetap robust meski DOM berubah.

## Styling
Menggunakan SCSS bawaan (`_select.scss`). Bisa override dengan prop `containerClassName`.

## Integrasi Form
Bisa digunakan dengan form library (Formik, React Hook Form) dengan mengontrol prop `value` dan `onChange`. Untuk multiple select, gunakan array string untuk value.

---
Untuk contoh lanjutan, lihat di `src/pages/Form.tsx`.
