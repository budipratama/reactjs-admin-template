# AdvancedSelect Component Usage Guide

`AdvancedSelect` adalah komponen dropdown/select React yang powerful untuk data besar/remote (API), dengan fitur pencarian, debounce, event delegation (clear), validasi, aksesibilitas, posisi dropdown dinamis, serta mendukung single dan multiple selection.

## Import
```jsx
import AdvancedSelect from "./AdvancedSelect";
```

## Props
| Prop                | Type                                      | Description                                                      |
|---------------------|-------------------------------------------|------------------------------------------------------------------|
| name                | string                                    | Field name (required)                                            |
| label               | string                                    | Label yang ditampilkan                                           |
| value               | Option \| Option[] \| ""                   | Value terpilih (object/array, default: ""/[])                    |
| onChange            | (value: Option \| Option[] \| "") => void  | Callback ketika value berubah                                    |
| placeholder         | string                                    | Placeholder jika belum ada value                                 |
| required            | boolean                                   | Tampilkan tanda wajib (*)                                        |
| errorMessage        | string                                    | Pesan error/validasi                                             |
| containerClassName  | string                                    | CSS class untuk container (default: 'form__group')               |
| multiple            | boolean                                   | Aktifkan multiple selection (default: false)                     |
| disabled            | boolean                                   | Nonaktifkan select (default: false)                              |
| minSearchLength     | number                                    | Minimal karakter untuk trigger search (default: 1)               |
| rawOptions          | any[]                                     | Data mentah dari API/source                                      |
| optionMapper        | (item: any) => Option                     | Fungsi mapping data mentah ke `{ label, value }`                 |
| onSearch            | (search: string) => void                  | Callback pencarian (API search, debounced)                       |

## Option Type
```ts
type Option = { label: string; value: string };
```

## Contoh Penggunaan (Single Select, API Search)
```jsx
const [countryApi, setCountryApi] = useState<any[]>([]);
const [selectedCountry, setSelectedCountry] = useState(""); // atau Option | ""

const handleCountrySearch = async (search) => {
  const res = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(search)}`);
  const data = await res.json();
  setCountryApi(data);
};

<AdvancedSelect
  name="country"
  label="Country"
  value={selectedCountry}
  onChange={val => setSelectedCountry(val)}
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

## Contoh Penggunaan (Multiple Select, API Search)
```jsx
const [countryApi, setCountryApi] = useState<any[]>([]);
const [selectedCountries, setSelectedCountries] = useState([]); // Option[]

<AdvancedSelect
  name="countries"
  label="Countries"
  value={selectedCountries}
  onChange={val => setSelectedCountries(val)}
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

## Tips Penting
- Untuk multiple select, value harus selalu array Option (default: []).

- Untuk single select, value bisa Option atau string kosong ("").

- Gunakan updater function pada setState jika value tergantung state sebelumnya:
  ```jsx
  onChange={val => setFormData(prev => ({ ...prev, country: val }))}
  ```

- Hindari value null/undefined, gunakan "" atau [] sesuai mode.

## Contoh Penggunaan (Disabled)
```jsx
<AdvancedSelect
  name="countries"
  label="Countries"
  value={selectedCountries}
  onChange={setSelectedCountries}
  multiple={true}
  disabled={true}
  // ...props lain
/>
```

## Fitur
- **API/Remote Search**: Gunakan `onSearch` dan `rawOptions` untuk pencarian async.
- **Debounce**: Pencarian otomatis debounce.
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
Bisa digunakan dengan form library (Formik, React Hook Form) dengan mengontrol prop `value` dan `onChange`. Untuk multiple select, gunakan array Option untuk value.

---
Untuk contoh lanjutan, lihat di `src/pages/Form.tsx` atau kode integrasi API Anda.
