import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../src/styles/main.scss";
import App from "./App";
import { ModalProvider } from "./context/ModalContext";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <ModalProvider>
        <App />
      </ModalProvider>
    </StrictMode>
  );
} else {
  console.error("Root element not found");
}
