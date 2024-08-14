import React, { useState } from "react";
import Supabase from "../Credenciales";

const Login = () => {
  const [usuarioError, setusuarioError] = useState(false);

  const Autentication = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const {
        data: { user },
        error,
      } = await Supabase.auth.signInWithPassword({ email, password });

      if (!user) {
        setusuarioError(true);
      }
    } catch (error) {
      alert("El usuario o la contraseña son incorrectos");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row vh-100 d-flex align-items-center ">
        <div className="col-md-5 col-lg-3 mx-auto">
          <form className="card p-5 frame mx-auto" onSubmit={Autentication}>
            <h4 className="card-title mb-3 text-center">Inicio de Sesión</h4>
            <div className="form-group mb-3">
              <label>Correo electrónico:</label>
              <input
                type="email"
                className="form-control py-2"
                id="email"
              ></input>
            </div>
            <div className="form-group mb-3">
              <label>Contraseña:</label>
              <input
                type="password"
                className="form-control py-2"
                id="password"
                autoComplete="on"
              ></input>
            </div>
            {/*<div className="form-check">
            <input type="checkbox" className="form-check-input py-2" id="rememberMe"></input>
            <label className="form-check-label">Recordarme</label>
          </div>
          */}
            <button type="submit" className="btn btn-primary mt-3">
              Iniciar Sesión
            </button>
            {usuarioError ? (
              <p className="pt-2 text-danger">
                El usuario o la contraseña son incorrectos
              </p>
            ) : (
              ""
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
