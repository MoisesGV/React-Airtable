import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { ShowAlert } from "../function";
import Supabase from "../Credenciales";

const ModalAirtable = ({ data }) => {
  //STATE
  const [Id, SetId] = useState("");
  const [NombreCompleto, SetNombreCompleto] = useState("");
  const [AlumnoOInvitado, SetAlumnoOInvitado] = useState("");
  const [CodigoEntrada, SetCodigoEntrada] = useState("");
  const [NombreCompletoInvito, SetNombreCompletoInvito] = useState("");
  const [Email, SetEmail] = useState("");
  const [Telefono, SetTelefono] = useState("");
  const [EstatusUne, SetEstatusUne] = useState("");
  const [AsisteComo, SetAsisteComo] = useState("");
  const [Dni, SetDni] = useState("");
  const [NombreTabla, SetNombreTabla] = useState("");
  const [Data, SetData] = useState(false);
  const url = "https://api.airtable.com/v0/";

  const Validar = () => {
    if (NombreCompleto.trim() === "") {
      ShowAlert("Escribe el nombre de la columna Nombre Completo", "warning");
    } else if (AlumnoOInvitado.trim() === "") {
      ShowAlert(
        "Escribe el nombre de la columna ¿Es alumno o invitado?",
        "warning"
      );
    } else if (CodigoEntrada.trim() === "") {
      ShowAlert(
        "Escribe el nombre de la columna Código de la Entrada",
        "warning"
      );
    } else if (NombreCompletoInvito.trim() === "") {
      ShowAlert(
        "Escribe el nombre de la columna Nombre Completo de la Persona que Invita",
        "warning"
      );
    } else if (Email.trim() === "") {
      ShowAlert("Escribe el nombre de la columnaEmail", "warning");
    } else if (Telefono.trim() === "") {
      ShowAlert("Escribe el nombre de la columnaTeléfono", "warning");
    } else if (Dni.trim() === "") {
      ShowAlert(
        "Escribe el nombre de la columna Dni Descargo de Responsabilidad",
        "warning"
      );
    } else {
      EnviarSolicitud();
    }
  };

  const GetAirtableConfig = () => {
    SetNombreCompleto(data["nombreCompleto"]);
    SetAlumnoOInvitado(data["alumnoOinvitado"]);
    SetCodigoEntrada(data["codigoEntrada"]);
    SetNombreCompletoInvito(data["nombreCompletoInvito"]);
    SetEmail(data["email"]);
    SetTelefono(data["telefono"]);
    SetEstatusUne(data["estatusUne"]);
    SetAsisteComo(data["asisteComo"]);
    SetDni(data["dni"]);
    SetId(data["idAirtable"]);
  };

  const EnviarSolicitud = async (e) => {
    try {
      const {
        data: { user },
      } = await Supabase.auth.getUser();
      const iduser = user.id;
      if (Data) {
        try {
          const result = await Supabase.from("table")

            .update({
              nombreCompleto: NombreCompleto,
              alumnoOinvitado: AlumnoOInvitado,
              codigoEntrada: CodigoEntrada,
              nombreCompletoInvito: NombreCompletoInvito,
              email: Email,
              telefono: Telefono,
              estatusUne: EstatusUne,
              asisteComo: AsisteComo,
              dni: Dni,
              idAirtable: Id.replace(/\s/g, "%20"),
              idUser: iduser,
            })
            .eq("idUser", iduser);
          ShowAlert(
            "Cambios Guardados<br>La página necesitará recargarse",
            "success"
          );
          setTimeout(() => {
            location.reload();
          }, 1000);
        } catch (error) {
          console.log(error);
          ShowAlert("Error en la Solicitud", "error");
        }
      } else {
        try {
          const result = await Supabase.from("table").upsert(
            {
              nombreCompleto: NombreCompleto,
              alumnoOinvitado: AlumnoOInvitado,
              codigoEntrada: CodigoEntrada,
              nombreCompletoInvito: NombreCompletoInvito,
              email: Email,
              telefono: Telefono,
              estatusUne: EstatusUne,
              asisteComo: AsisteComo,
              dni: Dni,
              idAirtable: url + Id.replace(/\s/g, "%20"),
              idUser: iduser,
            },
            { onConflict: "idUser" }
          );
          ShowAlert(
            "Cambios Guardados<br>La página necesitará recargarse",
            "success"
          );
          setTimeout(() => {
            location.reload();
          }, 1000);
        } catch (error) {
          console.log(error);
          ShowAlert("Error en la Solicitud", "error");
        }
      }
    } catch (error) {
      console.log(error);
      ShowAlert("Error en la Solicitud", "error");
    }
  };

  if (data["idAirtable"] && !Data) {
    GetAirtableConfig(data);
    SetData(true);
    //console.log("hay datos");
  }

  return (
    <div className="modal fade " aria-hidden="true" id="modalAirtable">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header bg-dark text-white">
            <label className="h5">Configuración Airtable</label>
            <button
              id="btn-closeAirtable"
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              style={{ backgroundColor: "white", opacity: 1 }}
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="nombreCompleto" className="form-label">
                Nombre Completo
              </label>
              <input
                type="text"
                id="nombreCompleto"
                className="form-control"
                placeholder="Nombre Completo"
                value={NombreCompleto}
                onChange={(e) => {
                  SetNombreCompleto(e.target.value);
                }}
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="nombreCompleto" className="form-label">
                ¿Es alumno o invitado?
              </label>
              <input
                type="text"
                id="nombreCompleto"
                className="form-control"
                placeholder="¿Es alumno o invitado?"
                value={AlumnoOInvitado}
                onChange={(e) => {
                  SetAlumnoOInvitado(e.target.value);
                }}
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="codigoEntrada" className="form-label">
                Código Entrada
              </label>
              <input
                type="text"
                id="codigoEntrada"
                className="form-control"
                placeholder="Código Entrada"
                value={CodigoEntrada}
                onChange={(e) => {
                  SetCodigoEntrada(e.target.value);
                }}
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="nombreCompletoInvito" className="form-label">
                Nombre Completo de la Persona que Invita
              </label>
              <input
                type="text"
                id="nombreCompletoInvito"
                className="form-control"
                placeholder="Nombre Completo de la Persona que Invita"
                value={NombreCompletoInvito}
                onChange={(e) => {
                  SetNombreCompletoInvito(e.target.value);
                }}
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="text"
                id="email"
                className="form-control"
                placeholder="Email"
                value={Email}
                onChange={(e) => {
                  SetEmail(e.target.value);
                }}
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="telefono" className="form-label">
                Teléfono
              </label>
              <input
                type="text"
                id="teléfono"
                className="form-control"
                placeholder="Teléfono"
                value={Telefono}
                onChange={(e) => {
                  SetTelefono(e.target.value);
                }}
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="estatusUne" className="form-label">
                Estatus de Une
              </label>
              <input
                type="text"
                id="estatusUne"
                className="form-control"
                placeholder="Estatus de Une"
                value={EstatusUne}
                onChange={(e) => {
                  SetEstatusUne(e.target.value);
                }}
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="asisteComo" className="form-label">
                Asiste Como
              </label>
              <input
                type="text"
                id="asisteComo"
                className="form-control"
                placeholder="Asiste Como"
                value={AsisteComo}
                onChange={(e) => {
                  SetAsisteComo(e.target.value);
                }}
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="dni" className="form-label">
                Dni Descargo de Responsabilidad
              </label>
              <input
                type="text"
                id="dni"
                className="form-control"
                placeholder="Dni Descargo de Responsabilidad"
                value={Dni}
                onChange={(e) => {
                  SetDni(e.target.value);
                }}
              ></input>
            </div>

            <div className="mb-3">
              <label htmlFor="dni" className="form-label">
                <strong>URL/TABLA de AIRTABLE</strong>
              </label>
              <input
                type="text"
                id="IdAirtable"
                className="form-control"
                placeholder="Url de Airtable/Tabla"
                value={Id ? Id : "https://api.airtable.com/v0/"}
                onChange={(e) => {
                  SetId(e.target.value);
                }}
              ></input>
            </div>

            <div className="d-grid col-md-6 mx-auto mt-4">
              <button className="btn btn-success" onClick={() => Validar()}>
                <FontAwesomeIcon icon={faFloppyDisk} />
                <span className="mx-2">Guardar</span>
              </button>
            </div>
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

export default ModalAirtable;
