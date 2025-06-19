import {
  required,
  maxLength,
  isEmail,
  isSame,
  minNumber,
  maxNumber,
  isNumber,
} from "../validation";

describe("validation utils", () => {
  it("required: returns error if empty", () => {
    expect(required()("")).toBe("Field wajib diisi");
    expect(required("Custom msg")(" ")).toBe("");
    expect(required()("abc")).toBe("");
  });

  it("maxLength: returns error if value too long", () => {
    expect(maxLength(5)("abcdef")).toBe("Maksimal 5 karakter");
    expect(maxLength(5, "Custom")("abcdef")).toBe("Custom");
    expect(maxLength(5)("abc")).toBe("");
  });

  it("isEmail: returns error if not valid email", () => {
    expect(isEmail()("")).toBe("");
    expect(isEmail()("abc")).toBe("Format email tidak valid");
    expect(isEmail()("a@b.com")).toBe("");
    expect(isEmail("Custom")("abc")).toBe("Custom");
  });

  it("isSame: returns error if not same as compare", () => {
    expect(isSame("abc")("def")).toBe("Konfirmasi tidak cocok");
    expect(isSame("abc", "Custom")("def")).toBe("Custom");
    expect(isSame("abc")("abc")).toBe("");
  });

  it("minNumber: returns error if value < min", () => {
    expect(minNumber(5)("3")).toBe("Minimum number is 5");
    expect(minNumber(5, "Custom")("3")).toBe("Custom");
    expect(minNumber(5)("6")).toBe("");
    expect(minNumber(5)("abc")).toBe("");
  });

  it("maxNumber: returns error if value > max", () => {
    expect(maxNumber(5)("6")).toBe("Maximum number is 5");
    expect(maxNumber(5, "Custom")("6")).toBe("Custom");
    expect(maxNumber(5)("4")).toBe("");
    expect(maxNumber(5)("abc")).toBe("");
  });

  it("isNumber: returns error if not a number", () => {
    expect(isNumber()("")).toBe("");
    expect(isNumber()("abc")).toBe("Harus berupa angka");
    expect(isNumber()("123")).toBe("");
    expect(isNumber("Custom")("abc")).toBe("Custom");
  });
});
