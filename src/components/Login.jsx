import React, { useState } from "react";
import Supabase from "../Credenciales";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [usuarioError, setusuarioError] = useState(false);
  const [msgError, setmsgError] = useState("");

  const Autentication = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const {
        data: { user },
        error,
      } = await Supabase.auth.signInWithPassword({ email, password });

      if (error) throw error;
      if (!user) setusuarioError(true);
    } catch (error) {
      if (error == "AuthApiError: Invalid login credentials") {
        setmsgError("El usuario o la contraseña son incorrectos");
      } else {
        setmsgError("Error de conexión con el Auth Supabase");
      }
    }
  };

  return (
    <div className="container-fluid">
      <div className="row vh-100 d-flex align-items-center ">
        <div className="col-md-5 col-lg-3 mx-auto">
          <form className="card p-4 frame mx-auto" onSubmit={Autentication}>
            <img
              src="/avatar.png"
              className="rounded mx-auto d-block  text-center img-login"
              alt=""
            />
            <h4 className="card-title my-3 text-center">Inicio de Sesión</h4>

            <div className="input-group mb-3 ">
              <span className="input-group-text bg-white" id="basic-addon1">
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
              <input
                type="email"
                className="form-control py-2"
                id="email"
                placeholder="Email"
                required
              ></input>
            </div>
            <div className="input-group mb-3 ">
              <span className="input-group-text bg-white" id="basic-addon1">
                <FontAwesomeIcon icon={faLock} />
              </span>
              <input
                type="password"
                className="form-control py-2"
                id="password"
                autoComplete="on"
                placeholder="Contraseña"
                required
              ></input>
            </div>
            <button type="submit" className="btn btn-primary btn-lg mt-3">
              Iniciar Sesión
            </button>
            {usuarioError || msgError != "" ? (
              <p className="pt-2 m-0 fs-5 text-danger text-center">
                {msgError}
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
