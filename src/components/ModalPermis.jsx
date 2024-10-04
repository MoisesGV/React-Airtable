import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { ShowAlert } from "../function";
import Supabase from "../Credenciales";

const ModalPermis = () => {
  const test = Supabase.auth.admin;

  //STATE

  /*async function listUsers() {
    try {
      const {
        data: { users },
        error,
      } = await test.getUserById(1);

      if (error) {
        console.error("Error al listar usuarios:", error);
      } else {
        console.log(users);
      }
    } catch (error) {
      console.error("Error inesperado:", error);
    }
  }

  listUsers();
*/
  return (
    <div className="modal fade " aria-hidden="true" id="modalPermis">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header bg-dark text-white">
            <label className="h5">Configuración Permisos Usuarios</label>
            <button
              id="btn-closeAirtable"
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              style={{ backgroundColor: "white", opacity: 1 }}
            ></button>
          </div>

          <div className="modal-footer bg-dark">
            <button
              className="btn btn-light"
              data-bs-dismiss="modal"
              id="btnCerrar"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalPermis;
