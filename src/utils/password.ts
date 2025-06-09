// src/utils/password.ts

/**
 * Check password strength and return a message.
 * Requirements: min 8 chars, uppercase, lowercase, number, symbol
 */
export function checkPasswordStrength(pwd: string): string {
  const hasUpper = /[A-Z]/.test(pwd);
  const hasLower = /[a-z]/.test(pwd);
  const hasNumber = /[0-9]/.test(pwd);
  const hasSymbol = /[^A-Za-z0-9]/.test(pwd);
  const minLength = pwd.length >= 8;
  if (!minLength) return "Password must be at least 8 characters";
  if (!hasUpper) return "Password must contain an uppercase letter (A-Z)";
  if (!hasLower) return "Password must contain a lowercase letter (a-z)";
  if (!hasNumber) return "Password must contain a number (0-9)";
  if (!hasSymbol) return "Password must contain a symbol/wildcard (!@#$...)";
  return "Strong password";
}
