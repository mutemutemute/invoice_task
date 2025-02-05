import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Invoices from "./components/Invoices";
import NotFound from "./components/NotFound";
import EditInvoice from "./components/EditInvoice";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/invoices/edit/:id" element={<EditInvoice />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
