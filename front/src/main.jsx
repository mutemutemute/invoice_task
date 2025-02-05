import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import InvoiceContextProvider from "./contexts/InvoiceContextProvider.jsx";
import UserContextProvider from "./contexts/UserContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserContextProvider>
      <InvoiceContextProvider>
        <App />
      </InvoiceContextProvider>
    </UserContextProvider>
  </StrictMode>
);
