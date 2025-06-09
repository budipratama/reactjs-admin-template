export const required = (msg = "Field wajib diisi") => (value: string) =>
  !value ? msg : "";

export const maxLength = (max: number, msg?: string) => (value: string) =>
  value && value.length > max ? msg || `Maksimal ${max} karakter` : "";

export const isEmail = (msg = "Format email tidak valid") => (value: string) =>
  value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? msg : "";

export const isSame = (compare: string, msg = "Konfirmasi tidak cocok") => (value: string) =>
  value !== compare ? msg : "";

export const minNumber = (min: number, msg?: string) => (value: string) =>
    value && parseInt(value) < min ? msg || `Minimum number is ${min}` : "";

export const maxNumber = (min: number, msg?: string) => (value: string) =>
    value && parseInt(value) > min ? msg || `Maximum number is ${min}` : "";

export const isNumber = (msg = "Harus berupa angka") => (value: string) =>
  value && isNaN(Number(value)) ? msg : "";

