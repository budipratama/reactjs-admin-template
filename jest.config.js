export default {
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  collectCoverage: true, // Aktifkan pengumpulan coverage
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}", // Sertakan semua file TypeScript dan TSX di folder src
    "!src/**/*.d.ts", // Kecualikan file deklarasi TypeScript
    "!src/index.tsx", // Kecualikan file entry point utama jika tidak relevan
  ],
  coverageDirectory: "coverage", // Direktori output laporan coverage
};
