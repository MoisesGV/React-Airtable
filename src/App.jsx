import { useEffect, useState } from "react";
import Supabase from "../src/Credenciales";
import { Routes, Route, useNavigate } from "react-router-dom";

//Importar components
import Login from "../src/components/Login";
import Home from "../src/components/Home";
import "./App.css";

function App() {
  const [Sesion, SetSesion] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    Supabase.auth.onAuthStateChange((event, sesion) => {
      SetSesion(sesion);
      if (!sesion) {
        navigate("/login");
      } else {
        navigate("/");
      }
    });
  }, [navigate]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home sesion={Sesion} />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
