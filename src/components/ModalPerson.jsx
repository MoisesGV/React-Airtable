import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFloppyDisk,
  faAt,
  faPhone,
  faAddressCard,
  faIdBadge,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { ShowAlert } from "../function";
import axios from "axios";

const ModalPerson = ({ dataAirtable, operation, url, onChange, person }) => {
  const [NombreCompleto, SetNombreCompleto] = useState("");
  const [AlumnoOInvitado, SetAlumnoOInvitado] = useState("");
  const [CodigoEntrada, SetCodigoEntrada] = useState("");
  const [NombreCompletoInvito, SetNombreCompletoInvito] = useState("");
  const [Email, SetEmail] = useState("");
  const [Telefono, SetTelefono] = useState("");
  const [EstatusUne, SetEstatusUne] = useState("");
  const [AsisteComo, SetAsisteComo] = useState("");
  const [Dni, SetDni] = useState("");
  const [Id, SetId] = useState("");

  const Validar = (dataAirtable) => {
    let metodo;
    let parametros;
    if ((NombreCompleto || "").trim() === "") {
      ShowAlert("Escribe el " + dataAirtable["nombreCompleto"], "warning");
    } else if ((Dni || "").trim() === "") {
      ShowAlert("Escribe el " + dataAirtable["dni"], "warning");
    } else if ((CodigoEntrada || "").trim() === "") {
      ShowAlert("Escribe el " + dataAirtable["codigoEntrada"], "warning");
    } else if ((Email || "").trim() === "") {
      ShowAlert("Escribe el " + dataAirtable["email"], "warning");
    } else {
      if (operation) {
        (parametros = {
          fields: {
            [dataAirtable["nombreCompleto"]]: `${NombreCompleto.trim()}`,
            [dataAirtable["dni"]]: `${Dni.trim()}`,
            [dataAirtable["codigoEntrada"]]: `${CodigoEntrada.trim()}`,
            [dataAirtable["email"]]: `${Email.trim()}`,
            [dataAirtable["telefono"]]: `${Telefono.trim()}`,
            [dataAirtable["asisteComo"]]: `${AsisteComo.trim()}`,
            [dataAirtable["alumnoOinvitado"]]: `${AlumnoOInvitado}`,
            [dataAirtable[
              "nombreCompletoInvito"
            ]]: `${NombreCompletoInvito.trim()}`,
            [dataAirtable["estatusUne"]]: `${EstatusUne.trim()}`,
          },
          typecast: true,
        }),
          (metodo = "POST");
      } else {
        parametros = {
          records: [
            {
              id: `${Id.trim()}`,
              fields: {
                [dataAirtable["nombreCompleto"]]: `${(
                  NombreCompleto || ""
                ).trim()}`,
                [dataAirtable["dni"]]: `${Dni.trim()}`,
                [dataAirtable["codigoEntrada"]]: `${(
                  CodigoEntrada || ""
                ).trim()}`,
                [dataAirtable["email"]]: `${(Email || "").trim()}`,
                [dataAirtable["telefono"]]: `${(Telefono || "").trim()}`,
                [dataAirtable["asisteComo"]]: `${(AsisteComo || "").trim()}`,
                [dataAirtable["alumnoOinvitado"]]: `${(
                  AlumnoOInvitado || ""
                ).trim()}`,
                [dataAirtable["nombreCompletoInvito"]]: `${(
                  NombreCompletoInvito || ""
                ).trim()}`,
                [dataAirtable["estatusUne"]]: `${(EstatusUne || "").trim()}`,
              },
            },
          ],
          typecast: true,
        };
        metodo = "PATCH";
      }

      EnviarSolicitud(metodo, parametros);
    }
  };

  const EnviarSolicitud = async (metodo, parametros, mensaje = "") => {
    //await axios({ method: metodo, url: baseURL, data: { records: parametros } })
    await axios({
      method: metodo,
      url: url,
      data: parametros,
    })
      .then(function (res) {
        let tipo = res["status"];
        let msj;

        msj = mensaje == "" ? "Registro Guardado" : mensaje;

        ShowAlert(msj, "success");
        //console.log(res['status'])
        if (tipo === 200) {
          document.getElementById("btn-closeModalPerson").click();
        }
        onChange();
      })
      .catch(function (error) {
        let type =
          error.response.data.error.type == "UNKNOWN_FIELD_NAME"
            ? ""
            : error.response.data.error.type;
        let message = error.response.data.error.message.replace(
          "Unknown field name",
          "No existe ninguna columna con el nombre"
        );

        ShowAlert(
          "Error en la Solicitud: <br>" + message + "<br>" + type,
          "error"
        );
        console.log(error);
      });
  };

  useEffect(() => {
    // Siempre que 'person' cambie, se ejecuta este efecto
    if (!Array.isArray(person)) {
      if (person) {
        SetId(person.id);
        SetAsisteComo(person.fields[dataAirtable["asisteComo"]]);
        SetCodigoEntrada(person.fields[dataAirtable["codigoEntrada"]]);
        SetNombreCompleto(person.fields[dataAirtable["nombreCompleto"]]);
        SetDni(person.fields[dataAirtable["dni"]]);
        SetEmail(person.fields[dataAirtable["email"]]);
        SetTelefono(person.fields[dataAirtable["telefono"]]);
        SetAlumnoOInvitado(person.fields[dataAirtable["alumnoOinvitado"]]);
        SetEstatusUne(person.fields[dataAirtable["estatusUne"]]);
      } else {
        SetId("");
        SetAsisteComo("");
        SetCodigoEntrada("");
        SetNombreCompleto("");
        SetDni("");
        SetEmail("");
        SetTelefono("");
        SetAlumnoOInvitado("");
        SetEstatusUne("");
      }
    }
  }, [person]);

  return (
    <div className="modal fade " aria-hidden="true" id="modalPerson">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header bg-dark ">
            <div className="row">
              <div className="col-auto">
                <select
                  className={`form-select form-select-lg ${
                    AsisteComo == "Presencial"
                      ? "bg-success text-white"
                      : AsisteComo == "Online"
                      ? "bg-light"
                      : AsisteComo == "No Asiste"
                      ? "bg-danger text-white"
                      : "bg-secondary text-white"
                  }`}
                  aria-label=".form-select-lg example"
                  value={AsisteComo}
                  onChange={(e) => {
                    SetAsisteComo(e.target.value);
                  }}
                >
                  <option value="">{dataAirtable["asisteComo"]}</option>
                  <option value="Presencial">Presencial</option>
                  <option value="Online">Online</option>
                  <option value="No Asiste">No Asiste</option>
                </select>
              </div>
              <div className="col-auto">
                <input
                  id="codigoEntrada"
                  type="text"
                  className="form-control form-select-lg"
                  placeholder={`${dataAirtable["codigoEntrada"]}`}
                  value={CodigoEntrada}
                  onChange={(e) => {
                    SetCodigoEntrada(e.target.value);
                  }}
                />
              </div>
            </div>
            <button
              id="btn-closeModalPerson"
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              style={{ backgroundColor: "white", opacity: 1 }}
            ></button>
          </div>
          <div className="modal-body">
            <div className="row ">
              <div className="col-md-8">
                <label htmlFor="nombreCompleto" className="form-label ">
                  {dataAirtable["nombreCompleto"]}
                </label>
                <input
                  type="text"
                  id="nombreCompleto"
                  className="form-control"
                  value={NombreCompleto}
                  onChange={(e) => {
                    SetNombreCompleto(e.target.value);
                  }}
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="dni" className="form-label">
                  {dataAirtable["dni"]}
                </label>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <FontAwesomeIcon icon={faAddressCard} />
                  </span>
                  <input
                    type="text"
                    id="dni"
                    className="form-control"
                    value={Dni}
                    onChange={(e) => {
                      SetDni(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="row ">
              <div className="col-md-6">
                <label htmlFor="email" className="form-label">
                  {dataAirtable["email"]}
                </label>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <FontAwesomeIcon icon={faAt} />
                  </span>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    value={Email}
                    onChange={(e) => {
                      SetEmail(e.target.value);
                    }}
                  ></input>
                </div>
              </div>
              <div className="col-md-6">
                <label htmlFor="telefono" className="form-label">
                  {dataAirtable["telefono"]}
                </label>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <FontAwesomeIcon icon={faPhone} />
                  </span>
                  <input
                    type="text"
                    id="telefono"
                    className="form-control"
                    value={Telefono}
                    onChange={(e) => {
                      SetTelefono(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="row ">
              <div className="col-md-5">
                <label htmlFor="alumnoOInvitado" className="form-label">
                  {dataAirtable["alumnoOinvitado"]}
                </label>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <FontAwesomeIcon icon={faUser} />
                  </span>
                  <input
                    type="text"
                    id="AlumnoOInvitado"
                    className="form-control"
                    value={AlumnoOInvitado}
                    onChange={(e) => {
                      SetAlumnoOInvitado(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="col-md-7">
                <label htmlFor="nombreCompletoInvito" className="form-label">
                  {dataAirtable["nombreCompletoInvito"]}
                </label>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <FontAwesomeIcon icon={faIdBadge} />
                  </span>
                  <input
                    type="text"
                    id="nombreCompletoInvito"
                    className="form-control"
                    value={NombreCompletoInvito}
                    onChange={(e) => {
                      SetNombreCompletoInvito(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="row ">
              <div className="col-md-12">
                <label htmlFor="nombreCompletoInvito" className="form-label">
                  {dataAirtable["estatusUne"]}
                </label>
                <div className="input-group ">
                  <span className="input-group-text">
                    <FontAwesomeIcon icon={faIdBadge} />
                  </span>
                  <input
                    type="text"
                    id="nombreCompletoInvito"
                    className="form-control"
                    value={EstatusUne}
                    onChange={(e) => {
                      SetEstatusUne(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer bg-dark d-flex justify-content-center">
            <button
              className="btn btn-success btn-lg my-2"
              onClick={() => Validar(dataAirtable)}
            >
              <FontAwesomeIcon icon={faFloppyDisk} />
              <span className="mx-2">Guardar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalPerson;
