import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import InvoiceContextProvider from "./contexts/InvoiceContextProvider.jsx";
import UserContextProvider from "./contexts/UserContextProvider.jsx";
import ThemeContextProvider from "./contexts/ThemeContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeContextProvider>
    <UserContextProvider>
      <InvoiceContextProvider>
        <App />
      </InvoiceContextProvider>
    </UserContextProvider>
    </ThemeContextProvider>
  </StrictMode>
);
