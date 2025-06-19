import { checkPasswordStrength } from "../password";

describe("checkPasswordStrength", () => {
  it("returns error if password is less than 8 characters", () => {
    expect(checkPasswordStrength("Ab1!")).toBe(
      "Password must be at least 8 characters"
    );
  });

  it("returns error if missing uppercase letter", () => {
    expect(checkPasswordStrength("abcdefg1!"))
      .toBe("Password must contain an uppercase letter (A-Z)");
  });

  it("returns error if missing lowercase letter", () => {
    expect(checkPasswordStrength("ABCDEFG1!"))
      .toBe("Password must contain a lowercase letter (a-z)");
  });

  it("returns error if missing number", () => {
    expect(checkPasswordStrength("Abcdefgh!"))
      .toBe("Password must contain a number (0-9)");
  });

  it("returns error if missing symbol", () => {
    expect(checkPasswordStrength("Abcdefg1"))
      .toBe("Password must contain a symbol/wildcard (!@#$...)");
  });

  it("returns empty string for strong password", () => {
    expect(checkPasswordStrength("Abcdef1!"))
      .toBe("");
    expect(checkPasswordStrength("A1b2c3d4!@#"))
      .toBe("");
  });
});
