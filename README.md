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


