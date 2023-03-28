import { Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "./layout/Dashboard";
import Login from "./layout/Login";
import Register from "./layout/Register";

function App() {
  const location = useLocation();
  const user = true;

  return (
    <>
      {(location.pathname === "/" ||
        location.pathname === "/menu" ||
        location.pathname === "/orders" ||
        location.pathname === "/order-history") &&
      user ? (
        <Dashboard />
      ) : (
        ""
      )}
      <Routes>
        <Route path="/rasoi-login" element={<Login />} />
        <Route path="/rasoi-register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
