# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


Mengubah kode React.js dari JavaScript ke TypeScript melibatkan beberapa langkah, mulai dari konfigurasi proyek hingga penyesuaian sintaksis. Berikut panduan lengkapnya:

---

### **1. Install TypeScript dan Dependensi**
Jalankan perintah berikut di direktori proyek React Anda:
```bash
npm install --save-dev typescript @types/react @types/react-dom @types/node
```
Atau jika menggunakan Yarn:
```bash
yarn add --dev typescript @types/react @types/react-dom @types/node
```

---

### **2. Ubah Ekstensi File**
- Ganti ekstensi file `.js`/`.jsx` menjadi `.tsx` (untuk komponen React) atau `.ts` (untuk file non-JSX).
- Contoh:
  ```diff
  - App.js
  + App.tsx
  ```

---

### **3. Konfigurasi TypeScript**
Buat file `tsconfig.json` di root proyek (atau jalankan `npx tsc --init` untuk generate otomatis). Contoh konfigurasi dasar:
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "baseUrl": "src"
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}
```

---

### **4. Perbaiki Error TypeScript**
Setelah konversi, TypeScript akan menampilkan error terkait type. Berikut contoh penyesuaian:

#### **a. Komponen React dengan Props**
```tsx
// Sebelum (JavaScript)
function Button({ label, onClick }) {
  return <button onClick={onClick}>{label}</button>;
}

// Sesudah (TypeScript)
interface ButtonProps {
  label: string;
  onClick: () => void;
}

function Button({ label, onClick }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}
```

#### **b. State dengan `useState`**
```tsx
// Sebelum (JavaScript)
const [count, setCount] = useState(0);

// Sesudah (TypeScript)
const [count, setCount] = useState<number>(0);
// Atau TypeScript bisa infer otomatis:
const [count, setCount] = useState(0); // Tetap aman
```

#### **c. Event Handlers**
```tsx
// Sebelum (JavaScript)
const handleChange = (e) => {
  console.log(e.target.value);
};

// Sesudah (TypeScript)
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log(e.target.value);
};
```

---

### **5. Tambahkan Type untuk Fungsi/Library Eksternal**
- Gunakan `@types/[nama-library]` untuk library pihak ketiga (misal: `@types/react-router-dom`).
- Jika tidak ada types-nya, buat deklarasi manual di file `declarations.d.ts`:
  ```ts
  declare module 'library-tanpa-types';
  ```

---

### **6. Jalankan Proyek**
- Jika menggunakan `create-react-app`, cukup jalankan:
  ```bash
  npm start
  ```
  CRA akan otomatis mendeteksi TypeScript.
- Untuk proyek custom, tambahkan script `build` di `package.json`:
  ```json
  "scripts": {
    "build": "tsc"
  }
  ```

---

### **7. Contoh Lengkap: App.tsx**
```tsx
import React, { useState } from 'react';

interface User {
  id: number;
  name: string;
}

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleClick = (): void => {
    setUser({ id: 1, name: 'John Doe' });
  };

  return (
    <div>
      <button onClick={handleClick}>Get User</button>
      {user && <p>Hello, {user.name}!</p>}
    </div>
  );
};

export default App;
```

---

### **Tips Penting**
1. **Gunakan `strict: true`** di `tsconfig.json` untuk memaksakan type checking ketat.
2. **Langkah Bertahap**: Jika proyek besar, konversi perlahan dengan mengaktifkan `allowJs: true`.
3. **Type Inference**: Biarkan TypeScript infer tipe sederhana (seperti `useState(0)` tidak perlu `<number>`).
4. **ESLint + Prettier**: Tambahkan `@typescript-eslint` untuk konsistensi kode.

Dengan TypeScript, Anda dapat menangkap error lebih awal dan membuat kode lebih mudah dipelihara! 🚀


Berikut adalah langkah-langkah lengkap untuk menginstal dan mengkonfigurasi **`@typescript-eslint`** di proyek React/TypeScript Anda:

---

### **1. Install Package yang Diperlukan**
Jalankan perintah berikut di terminal:
```bash
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```
Atau jika menggunakan Yarn:
```bash
yarn add --dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

---

### **2. Buat File Konfigurasi ESLint**
Buat file `.eslintrc.json` di root proyek Anda dan tambahkan konfigurasi dasar:
```json
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended" // Opsional: jika menggunakan React
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "warn", // Contoh custom rule
    "react/react-in-jsx-scope": "off" // Untuk React 17+ (tidak perlu impor React)
  },
  "settings": {
    "react": {
      "version": "detect" // Deteksi versi React otomatis
    }
  }
}
```

---

### **3. Tambahkan File `.eslintignore` (Opsional)**
Agar ESLint mengabaikan file/folder tertentu, buat file `.eslintignore`:
```
node_modules
dist
build
*.css
*.svg
```

---

### **4. Integrasi dengan Prettier (Opsional)**
Jika menggunakan Prettier, install package tambahan:
```bash
npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier
```
Kemudian update `.eslintrc.json`:
```json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended" // Tambahkan ini di akhir
  ]
}
```

---

### **5. Tambahkan Script di `package.json`**
Agar mudah dijalankan, tambahkan script berikut:
```json
"scripts": {
  "lint": "eslint . --ext .ts,.tsx",
  "lint:fix": "eslint . --ext .ts,.tsx --fix"
}
```

---

### **6. Jalankan ESLint**
- Untuk mengecek error:
  ```bash
  npm run lint
  ```
- Untuk memperbaiki error yang bisa difix otomatis:
  ```bash
  npm run lint:fix
  ```

---

### **7. Konfigurasi untuk VSCode (Opsional)**
Agar ESLint bekerja otomatis di VSCode:
1. Install ekstensi [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).
2. Tambahkan setting berikut di `.vscode/settings.json`:
```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": ["typescript", "typescriptreact"]
}
```

---

### **Contoh Error Populer dan Solusinya**
1. **`'React' must be in scope`**
   Tambahkan rule di `.eslintrc.json`:
   ```json
   "rules": {
     "react/react-in-jsx-scope": "off"
   }
   ```

2. **`Missing return type on function`**
   Tambahkan rule untuk tidak memaksa return type:
   ```json
   "rules": {
     "@typescript-eslint/explicit-function-return-type": "off"
   }
   ```

3. **`Any type disallowed`**
   Jika ingin menggunakan `any` (tidak direkomendasikan):
   ```json
   "rules": {
     "@typescript-eslint/no-explicit-any": "off"
   }
   ```

---

### **Hasil**
Setelah konfigurasi, ESLint akan:
✅ Mengecek error TypeScript dan React.
✅ Memperbaiki kode otomatis (jika memungkinkan).
✅ Memberikan warning untuk best practices.

---

### **Referensi Resmi**
- [@typescript-eslint Docs](https://typescript-eslint.io/)
- [ESLint Configuration](https://eslint.org/docs/user-guide/configuring/)

Jika ada error spesifik, sebutkan di sini! Saya bisa bantu debug lebih lanjut. 🛠️


Berikut struktur folder untuk proyek **React.js** yang umum digunakan (baik untuk proyek kecil maupun besar), dilengkapi dengan penjelasan dan contoh:

---

### **Struktur Dasar (Minimum)**
```bash
src/
├── components/   # Komponen reusable (Button, Card)
├── pages/        # Halaman berdasarkan route
├── App.jsx       # Root component
├── index.jsx     # Entry point
└── styles/       # Global CSS
```

---

### **Struktur Direkomendasikan (Scalable)**
```bash
src/
├── assets/            # Gambar, font, SVG
│   ├── images/
│   └── fonts/
│
├── components/        # Komponen UI (Atomic Design)
│   ├── atoms/         # Button, Input
│   ├── molecules/     # SearchBar, Card
│   ├── organisms/     # Header, Sidebar
│   └── templates/     # Layout utama
│
├── features/          # Logika bisnis per fitur
│   ├── auth/          # Contoh: fitur autentikasi
│   │   ├── components/ # Komponen khusus fitur
│   │   ├── hooks/     # useAuth, useLogin
│   │   └── utils/     # Helper functions
│
├── hooks/             # Custom hooks global (useFetch, useLocalStorage)
├── lib/               # Third-party initializations (axios, Firebase)
├── router/            # Konfigurasi routing (React Router)
├── stores/            # State management (Redux/Zustand)
├── styles/            # Global styles, theme
│   ├── base/          # Reset CSS, variables
│   └── components/    # Styled-components
│
├── utils/             # Fungsi utilitas (formatters, validators)
├── App.jsx            # Root component
└── main.jsx           # Entry point
```

---

### **Struktur untuk Proyek Besar (Advanced)**
```bash
src/
├── api/               # API calls & services
│   ├── auth.api.js
│   └── products.api.js
│
├── config/            # Konfigurasi env-based
│   ├── constants.js
│   └── routes.js
│
├── contexts/          # React contexts
├── types/             # TypeScript types/ (jika pakai TS)
├── __tests__/         # Folder test (alternatif: *.test.js di setiap folder)
└── public/            # Static files (index.html, favicon)
```

---

### **Penjelasan Kunci**
1. **Atomic Design** (`components/atoms/molecules/organisms`)
   - Memisahkan komponen berdasarkan kompleksitas.
   Contoh:
   ```jsx
   // components/atoms/Button.jsx
   const Button = ({ children }) => <button>{children}</button>;
   ```

2. **Feature-Based Folders** (`features/auth/`)
   - Kelompokkan file berdasarkan fitur (bukan tipe file).
   Contoh struktur fitur auth:
   ```bash
   features/auth/
   ├── components/LoginForm.jsx
   ├── hooks/useAuth.js
   ├── services/auth.js
   └── auth.slice.js (Redux)
   ```

3. **TypeScript Ready**
   Tambahkan folder `types/` dan file `.d.ts` untuk proyek TS:
   ```ts
   // types/user.d.ts
   interface User {
     id: string;
     name: string;
   }
   ```

---

### **Best Practices**
1. **Naming Convention**
   - Gunakan `PascalCase` untuk komponen (`Button.tsx`).
   - Gunakan `camelCase` untuk utilitas (`formatDate.js`).

2. **Absolute Imports**
   Konfigurasi di `jsconfig.json`/`tsconfig.json`:
   ```json
   {
     "compilerOptions": {
       "baseUrl": "./src",
       "paths": {
         "@components/*": ["components/*"],
         "@hooks/*": ["hooks/*"]
       }
     }
   }
   ```
   Contoh penggunaan:
   ```jsx
   import Button from '@components/atoms/Button';
   ```

3. **File Indeks**
   Gunakan `index.js` di setiap folder untuk ekspor bersih:
   ```js
   // components/atoms/index.js
   export { default as Button } from './Button';
   export { default as Input } from './Input';
   ```

---

### **Contoh Struktur untuk Next.js**
```bash
src/
├── app/               # App Router (Next.js 13+)
│   ├── (auth)/        # Route groups
│   │   └── login/
│   │       └── page.jsx
│   └── layout.jsx
│
├── lib/               # Server-side utilities
└── public/            # Static files
```

---

### **Tools untuk Auto-Struktur**
1. **Plop.js**
   Generate komponen/folder otomatis.
2. **VS Code Snippets**
   Buat template komponen cepat.

---

### **Pilihan Lain**
- **Group by File Type** (kurang direkomendasikan):
  ```bash
  src/
  ├── components/
  ├── hooks/
  └── styles/
  ```
- **Domain-Driven Design** (untuk kompleks):
  ```bash
  src/
  ├── user/
  │   ├── components/
  │   └── models/
  └── product/
      ├── components/
      └── api/
  ```

Struktur di atas bisa disesuaikan dengan **ukuran tim** dan **kompleksitas proyek**. Untuk proyek kecil, gunakan struktur minimalis; untuk enterprise, pilih feature-based.


Di React.js, terdapat beberapa pendekatan untuk menulis CSS yang bisa digunakan, masing-masing dengan kelebihan dan kekurangannya. Berikut penjelasan lengkapnya:

---

### **1. Inline Styles**
```jsx
const divStyle = {
  color: 'blue',
  fontSize: '16px',
  padding: '10px'
};

function Component() {
  return <div style={divStyle}>Hello World</div>;
}
```
✅ **Kelebihan**:
- Scoped langsung ke komponen
- Tidak perlu file CSS terpisah

❌ **Kekurangan**:
- Tidak mendukung pseudo-classes (`:hover`)
- Tidak bisa media queries

---

### **2. Regular CSS File**
```css
/* styles.css */
.button {
  background: #3498db;
  color: white;
}
```
```jsx
import './styles.css';

function Component() {
  return <button className="button">Click</button>;
}
```
✅ **Kelebihan**:
- Familiar (cara tradisional)
- Support penuh fitur CSS

❌ **Kekurangan**:
- Global scope (bisa terjadi conflict)
- Butuh naming convention (BEM, dll)

---

### **3. CSS Modules** *(Paling Direkomendasikan untuk CSS Vanilla)*
```css
/* Button.module.css */
.error {
  color: red;
}
```
```jsx
import styles from './Button.module.css';

function Button() {
  return <button className={styles.error}>Click</button>;
}
```
✅ **Kelebihan**:
- Scoped lokal otomatis (generate class unik)
- Support semua fitur CSS

❌ **Kekurangan**:
- Sedikit syntax tambahan

---

### **4. CSS-in-JS (Styled Components, Emotion)** *(Modern Approach)*
```jsx
import styled from 'styled-components';

const StyledButton = styled.button`
  background: ${props => props.primary ? 'blue' : 'gray'};
  &:hover {
    opacity: 0.9;
  }
`;

function Component() {
  return <StyledButton primary>Click</StyledButton>;
}
```
✅ **Kelebihan**:
- Scoped otomatis
- Dinamis via props
- Support SSR

❌ **Kekurangan**:
- Learning curve
- Bundle size lebih besar

---

### **5. Utility-First CSS (Tailwind CSS)** *(Popular for Rapid Dev)*
```jsx
function Component() {
  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
      Click
    </button>
  );
}
```
✅ **Kelebihan**:
- Development cepat
- Tidak perlu switch antar file
- Responsive design mudah

❌ **Kekurangan**:
- Class name bisa panjang
- Butuh setup awal

---

### **6. Sass/SCSS** *(CSS dengan Superpower)*
```scss
/* styles.scss */
$primary: blue;

.button {
  background: $primary;
  &:hover {
    darken($primary, 10%);
  }
}
```
```jsx
import './styles.scss';
```
✅ **Kelebihan**:
- Variabel, nesting, mixins
- Kompatibel dengan CSS Modules

❌ **Kekurangan**:
- Butuh preprocessor

---

### **7. CSS Framework (Bootstrap, Material UI)**
```jsx
import 'bootstrap/dist/css/bootstrap.min.css';

function Component() {
  return <button className="btn btn-primary">Click</button>;
}
```
✅ **Kelebihan**:
- Komponen siap pakai
- Konsisten design

❌ **Kekurangan**:
- Kustomisasi terbatas
- Bundle size besar

---

### **Perbandingan Popular Libraries**
| Library          | Bundle Size | Dinamis | Scoped | Learning Curve |
|------------------|------------|---------|--------|----------------|
| Styled Components | 12.7kB     | ✅      | ✅     | Medium         |
| Emotion          | 7.9kB      | ✅      | ✅     | Medium         |
| Tailwind CSS     | 3.5kB      | ✅      | ✅     | Low            |
| Sass             | 1.5MB      | ❌      | ❌     | Low            |

---

### **Rekomendasi Berdasarkan Use Case**
1. **Proyek Kecil**: CSS Modules + Sass
2. **Tim Besar**: Styled Components/Emotion
3. **Rapid Prototyping**: Tailwind CSS
4. **Design System**: CSS-in-JS + Utility Classes

Pilihan tergantung pada **preferensi tim** dan **kebutuhan proyek**. Untuk mulai, CSS Modules adalah pilihan aman! 🎨


Berikut struktur folder umum untuk **SCSS/SASS** dalam proyek React.js yang terorganisir dengan baik:

---

### **Struktur Dasar (Atomic Design Inspired)**
```bash
src/
├── styles/
│   ├── base/          # Dasar styling
│   │   ├── _reset.scss
│   │   ├── _typography.scss
│   │   └── _variables.scss
│   │
│   ├── components/    # Style komponen
│   │   ├── _buttons.scss
│   │   ├── _cards.scss
│   │   └── _forms.scss
│   │
│   ├── layout/        # Struktur halaman
│   │   ├── _header.scss
│   │   ├── _footer.scss
│   │   └── _grid.scss
│   │
│   ├── pages/         # Style spesifik halaman
│   │   ├── _home.scss
│   │   └── _dashboard.scss
│   │
│   ├── themes/        # Variasi tema (opsional)
│   │   ├── _light.scss
│   │   └── _dark.scss
│   │
│   ├── utils/         # Helper & mixins
│   │   ├── _mixins.scss
│   │   ├── _functions.scss
│   │   └── _animations.scss
│   │
│   └── main.scss      # File utama (import semua partials)
```

---

### **Penjelasan Setiap Folder**
1. **`base/`**
   - File dasar seperti reset CSS, variabel, dan tipografi.
   Contoh `_variables.scss`:
   ```scss
   $primary-color: #3498db;
   $font-stack: 'Helvetica', sans-serif;
   ```

2. **`components/`**
   - Style untuk komponen UI (button, card, modal).
   Contoh `_buttons.scss`:
   ```scss
   .btn {
     padding: 8px 16px;
     background: $primary-color;
     &:hover {
       opacity: 0.9;
     }
   }
   ```

3. **`layout/`**
   - Style untuk tata letak global (header, footer, grid system).

4. **`pages/`**
   - Style khusus halaman (misal: halaman `Home` punya style unik).

5. **`themes/`** (Opsional)
   - Variabel tema light/dark mode.
   Contoh implementasi:
   ```scss
   [data-theme="dark"] {
     background: #222;
     color: #fff;
   }
   ```

6. **`utils/`**
   - Fungsi reusable seperti mixins dan animations.
   Contoh `_mixins.scss`:
   ```scss
   @mixin flex-center {
     display: flex;
     justify-content: center;
     align-items: center;
   }
   ```

---

### **File Utama (`main.scss`)**
```scss
// Import semua partials
@import 'base/variables';
@import 'base/reset';
@import 'base/typography';

@import 'utils/mixins';
@import 'utils/animations';

@import 'layout/header';
@import 'layout/footer';

@import 'components/buttons';
@import 'components/cards';

@import 'pages/home';
@import 'pages/dashboard';
```

---

### **Struktur Alternatif (BEM Methodology)**
```bash
styles/
├── blocks/       # Komponen utama (BEM Block)
├── elements/     # Bagian kecil komponen (BEM Element)
├── modifiers/    # Variasi style (BEM Modifier)
└── utilities/    # Helper classes
```

---

### **Best Practices**
1. **Naming Convention**
   - Gunakan `_prefix.scss` untuk partial files.
   - Contoh: `_buttons.scss` (akan di-compile ke `main.css`).

2. **Import Order**
   Urutan import harus logis:
   ```
   Variables → Mixins → Base → Components → Layout → Pages
   ```

3. **Modularisasi**
   - Satu file SCSS per komponen.
   - Contoh:
     ```bash
     components/
     ├── Button/
     │   ├── Button.jsx
     │   └── Button.scss  # Style lokal komponen
     ```

4. **Global vs Local Scope**
   - Gunakan `:global` untuk style yang perlu dipakai di banyak komponen:
     ```scss
     :global(.main-container) {
       max-width: 1200px;
     }
     ```

---

### **Contoh Integrasi dengan React**
```jsx
// Button.jsx
import './Button.scss'; // Import file SCSS lokal

function Button() {
  return <button className="btn">Click</button>;
}
```

```scss
// Button.scss
@import '../../styles/variables';

.btn {
  background: $primary-color;
  padding: 8px 16px;
}
```

---

### **Tools Pendukung**
1. **Live Sass Compiler** (VS Code Extension)
   Auto-compile SCSS → CSS.
2. **Preprocessor** di `package.json`:
   ```json
   "scripts": {
     "watch:sass": "sass --watch src/styles:public/css"
   }
   ```

Struktur ini memudahkan:
- **Maintainability** (mudah cari style)
- **Scalability** (tambah komponen baru tanpa ribet)
- **Consistency** (variabel/mixins terpusat)

Untuk proyek besar, kombinasikan dengan **CSS Modules** atau **CSS-in-JS**! 🎨


**BEM (Block Element Modifier)** adalah metodologi penamaan class CSS yang digunakan untuk membuat struktur CSS yang **modular, terorganisir, dan mudah dipelihara**.

---

## 🧱 1. **Struktur Dasar BEM**

```
.block {}
.block__element {}
.block--modifier {}
```

---

### ✅ Penjelasan:

| Istilah    | Fungsi |
|------------|--------|
| `Block`    | Komponen mandiri (misal: `card`, `nav`, `form`) |
| `Element`  | Bagian dari block yang tidak bisa berdiri sendiri (misal: `card__title`) |
| `Modifier` | Versi berbeda dari block/element (misal: `card--highlighted`) |

---

## 🎯 Contoh Kasus: Kartu Berita

### HTML:
```html
<div class="news-card news-card--featured">
  <h2 class="news-card__title">Judul</h2>
  <p class="news-card__excerpt">Isi singkat...</p>
</div>
```

### CSS:
```css
.news-card {
  padding: 1rem;
  border: 1px solid #ccc;
}

.news-card__title {
  font-size: 1.25rem;
}

.news-card__excerpt {
  color: #666;
}

.news-card--featured {
  border-color: gold;
  background-color: #fffbe6;
}
```

---

## 🛠️ Kelebihan BEM

- ✅ Mudah dibaca dan di-maintain
- ✅ Hindari konflik CSS
- ✅ Cocok untuk tim dan proyek besar
- ✅ Tidak bergantung pada struktur HTML (lebih fleksibel)

---

## 🚫 Kesalahan Umum

| Salah                          | Benar                        |
|-------------------------------|------------------------------|
| `.title` di banyak tempat     | `.card__title`              |
| `.active` terlalu umum        | `.nav__item--active`        |
| Class nesting terlalu dalam   | Hindari dengan modular BEM  |

---



Berikut panduan lengkap cara menggunakan **SCSS/SASS** di React.js dengan berbagai metode:

---

### **1. Setup Awal**
Pastikan proyek React Anda sudah terinstall:
```bash
npm install sass
```
atau jika menggunakan Yarn:
```bash
yarn add sass
```

---

### **2. Metode Penggunaan SCSS**
#### **A. Regular SCSS File (Global)**
1. Buat file SCSS (contoh: `src/styles/main.scss`):
   ```scss
   // Variables
   $primary-color: #3498db;

   // Styling
   .app-container {
     background: lighten($primary-color, 40%);
     padding: 20px;
   }
   ```

2. Import di komponen React:
   ```jsx
   import './styles/main.scss';

   function App() {
     return <div className="app-container">Hello SCSS!</div>;
   }
   ```

#### **B. CSS Modules (Lokal Scoped)**
1. Buat file dengan ekstensi `.module.scss` (contoh: `Button.module.scss`):
   ```scss
   .btn {
     background: $primary-color;
     &:hover {
       background: darken($primary-color, 10%);
     }
   }
   ```

2. Gunakan di komponen:
   ```jsx
   import styles from './Button.module.scss';

   function Button() {
     return <button className={styles.btn}>Click</button>;
   }
   ```

#### **C. Inline SCSS dengan CSS-in-JS (Styled Components)**
1. Install library:
   ```bash
   npm install styled-components
   ```

2. Buat komponen dengan SCSS-like syntax:
   ```jsx
   import styled from 'styled-components';

   const StyledButton = styled.button`
     background: ${props => props.primary ? '#3498db' : 'gray'};
     padding: 8px 16px;
     &:hover {
       opacity: 0.8;
     }
   `;

   function MyComponent() {
     return <StyledButton primary>Click</StyledButton>;
   }
   ```

---

### **3. Struktur Folder SCSS yang Direkomendasikan**
```bash
src/
├── styles/
│   ├── _variables.scss    # Variabel warna/font
│   ├── _mixins.scss       # Fungsi reusable
│   ├── _animations.scss   # Animasi
│   └── main.scss          # File utama (import semua)
├── components/
│   └── Button/
│       ├── Button.jsx
│       └── Button.module.scss  # SCSS lokal
└── App.jsx
```

Contoh `main.scss`:
```scss
// Import partials
@import 'variables';
@import 'mixins';

// Global styles
body {
  font-family: 'Arial', sans-serif;
  margin: 0;
}
```

---

### **4. Fitur SCSS yang Berguna di React**
#### **Variables & Nesting**
```scss
// _variables.scss
$font-stack: 'Helvetica', sans-serif;
$primary-color: #3498db;

// Komponen
.card {
  font-family: $font-stack;
  border: 1px solid $primary-color;

  &-title {  // Nesting
    color: darken($primary-color, 20%);
  }
}
```

#### **Mixins**
```scss
// _mixins.scss
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

// Penggunaan
.container {
  @include flex-center;
  height: 100vh;
}
```

#### **Partials & Import**
- File partial (dimulai dengan underscore `_`) tidak akan dicompile ke CSS terpisah.
- Import di file utama:
  ```scss
  @import 'variables';
  @import 'mixins';
  ```

---

### **5. Konfigurasi Tambahan**
#### **Absolute Imports**
Tambahkan di `jsconfig.json`/`tsconfig.json`:
```json
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@styles/*": ["styles/*"]
    }
  }
}
```
Gunakan:
```jsx
import '@styles/main.scss';
```

#### **Custom Webpack Config (Jika Diperlukan)**
Untuk proyek yang di-eject atau menggunakan Craco:
```js
// craco.config.js
module.exports = {
  style: {
    sass: {
      loaderOptions: {
        additionalData: `@import "@styles/variables";`
      }
    }
  }
};
```

---

### **6. Production Build**
SCSS akan otomatis di-compile saat:
```bash
npm run build
```
Hasilnya akan menjadi CSS teroptimasi di folder `build/static/css`.

---

### **Troubleshooting**
1. **Error Compile**:
   Pastikan nama file partial menggunakan `_` (contoh: `_variables.scss`).

2. **Variables Tidak Terbaca**:
   Import file variables di file SCSS yang membutuhkan:
   ```scss
   @import 'path/to/variables';
   ```

3. **HMR (Hot Module Reload) Tidak Work**:
   Restart dev server setelah install `sass`.

---

### **Perbandingan Metode**
| Metode          | Scoped | Dinamis | Bundle Size | Cocok Untuk        |
|----------------|--------|---------|------------|-------------------|
| Regular SCSS   | ❌     | ❌      | Kecil      | Global styles     |
| CSS Modules    | ✅     | ✅      | Kecil      | Komponen          |
| Styled Components | ✅ | ✅      | Besar      | Komponen dinamis  |

Pilih sesuai kebutuhan proyek Anda! 🎨
