import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Cookies from "./pages/Cookies";
import Signup from "./pages/Signup";
import Userpage from "./pages/Userpage";
import PasswordResetPage from "./pages/PasswordResetPage";
import ResetConfirmationPage from "./pages/ResetConfirmationPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/userpage" element={<Userpage />} />
          <Route path="/passwordrecovery" element={<PasswordResetPage />} />
          <Route path="/resetpassword" element={<ResetConfirmationPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

