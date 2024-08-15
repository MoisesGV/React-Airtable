import React, { useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import ModalAirtable from "./ModalAirtable";
import { ShowAlert } from "../function";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faCheck,
  faEdit,
  faUser,
  faFloppyDisk,
  faHashtag,
  faEnvelope,
  faIdBadge,
  faAt,
  faPhone,
  faList,
  faShareFromSquare,
  faAddressCard,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import Pagination from "./Pagination";

const ShowPerson = ({ data }) => {
  //axios CONST

  const ApiKey = import.meta.env.VITE_AIRTABLE_API_KEY;
  //const Url = import.meta.env.VITE_AIRTABLE_URL;
  //const baseURL = (axios.defaults.baseURL = Url);
  axios.defaults.headers.post["Content-Type"] = "application/json";
  axios.defaults.headers["Authorization"] = `Bearer ${ApiKey}`;

  //STATE
  const [Pending, setPending] = useState(true);
  const [Persons, SetPersons] = useState([]);
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
  const [Operation, SetOperation] = useState(1);
  const [Title, SetTitle] = useState("");
  const [Search, SetSearch] = useState("");
  const [Data, SetData] = useState(false);
  const [AirtableRegister, SetAirtableRegister] = useState([]);

  //STATE PAGINATION
  const totalPersons = Persons.length;
  //console.log(totalPersons);
  const [CurrentPage, SetCurrentPage] = useState(1);
  const [PersonsPerPage, SetPersonsPerPage] = useState(10);

  const GetPersons = async () => {
    let baseURL = GetURL();
    try {
      const response = await axios.get(baseURL);

      let allRecords = [];

      allRecords.push(response.data.records);

      let offset = response.data.offset;

      if (offset !== undefined) {
        do {
          const response1 = await axios.get(baseURL + "&offset=" + offset);
          allRecords.push(response1.data.records);
          offset = response1.data.offset;
        } while (offset !== undefined);
      }

      allRecords = allRecords.flat();

      SetPersons(allRecords);
      setPending(false);
    } catch (error) {
      console.error(error);
      ShowAlert(
        "Ocurrio un error al cargar los datos de la tabla, debe verificar que la Configuración de Airtable corresponda con los encabezados de su tabla",
        "error"
      );
    }
  };

  const GetURL = () => {
    let fieldOrder = data["nombreCompleto"].replace(" ", "%20");
    let order =
      "?sort%5B0%5D%5Bfield%5D=" +
      fieldOrder +
      "&sort%5B0%5D%5Bdirection%5D=asc";
    const urlBase = data["idAirtable"] + order;

    const baseURL = (axios.defaults.baseURL = urlBase);
    return baseURL;
  };

  if (data["idAirtable"] && !Data) {
    ShowAlert(
      "Configuración de Airtable encontrada, cargando datos de la tabla...",
      "info"
    );
    SetAirtableRegister(data);
    //console.log(      "Configuración de Airtable encontrada, cargando datos de la tabla..."    );
    SetData(true);
    GetPersons();

    let defaultkeys = [
      "Nombre Completo",
      "¿Es alumno o invitado?",
      "Código Entrada",
      "Nombre Completo de la Persona que Invita",
      "Email",
      "Teléfono",
      "Estatus de Une",
      "Asiste Como",
      "Dni Descargo de Responsabilidad",
    ];
  }

  const OpenModal = (
    Operation,
    Id,
    NombreCompleto = "",
    AlumnoOInvitado = "",
    CodigoEntrada = "",
    NombreCompletoInvito = "",
    Email = "",
    Telefono = "",
    EstatusUne = "",
    AsisteComo = "",
    Dni = ""
  ) => {
    SetId("");
    SetNombreCompleto("");
    SetAlumnoOInvitado("");
    SetCodigoEntrada("");
    SetNombreCompletoInvito("");
    SetEmail("");
    SetTelefono("");
    SetEstatusUne("");
    SetAsisteComo("");
    SetDni("");
    SetOperation(Operation);

    if (Operation === 1) {
      SetTitle("Registrar Usuario");
    } else if (Operation === 2) {
      SetTitle("Modificar Usuario");
      SetId(Id);
      SetNombreCompleto(NombreCompleto);
      SetAlumnoOInvitado(AlumnoOInvitado);
      SetCodigoEntrada(CodigoEntrada);
      SetNombreCompletoInvito(NombreCompletoInvito);
      SetEmail(Email);
      SetTelefono(Telefono);
      SetEstatusUne(EstatusUne);
      SetAsisteComo(AsisteComo);
      SetDni(Dni);
    }
    window.setTimeout(() => {
      document.getElementById("nombre").focus();
    }, 500);
  };

  const Validar = () => {
    let metodo;
    let parametros;

    if (NombreCompleto.trim() === "") {
      ShowAlert("Escribe el Nombre", "warning");
    } else if (Dni.trim() === "") {
      ShowAlert("Escribe el Dni", "warning");
    } else if (AlumnoOInvitado.trim() === "") {
      ShowAlert(
        "La casilla ¿Es alumno o invitado? no puede estar vacía",
        "warning"
      );
    } else if (CodigoEntrada.trim() === "") {
      ShowAlert("Escribe el Código de la Entrada", "warning");
    } else if (
      NombreCompletoInvito.trim() === "" &&
      AlumnoOInvitado.trim() === "Invitado"
    ) {
      ShowAlert(
        "Escribe el Nombre de la persona Persona que Invitó",
        "warning"
      );
    } else if (Email.trim() === "") {
      ShowAlert("Escribe el Email", "warning");
    } else if (Telefono.trim() === "") {
      ShowAlert("Escribe el Teléfono", "warning");
    } else if (AsisteComo.trim() === "") {
      ShowAlert("Debe seleccionar una opción en Asiste Como", "warning");
    } else if (EstatusUne.trim() === "") {
      ShowAlert("Debe seleccionar una opción en Estatus Une", "warning");
    } else {
      if (Operation === 1) {
        //console.log("operacion" + Operation);
        (parametros = {
          fields: {
            "Nombre Completo": `${NombreCompleto.trim()}`,
            "¿Es alumno o invitado?": `${AlumnoOInvitado.trim()}`,
            "Código Entrada": `${CodigoEntrada.trim()}`,
            "Nombre Completo de la Persona que Invita": `${NombreCompletoInvito.trim()}`,
            Email: `${Email.trim()}`,
            Teléfono: `${Telefono.trim()}`,
            "Estatus de Une": `${EstatusUne.trim()}`,
            "Asiste Como": `${AsisteComo.trim()}`,
            "Dni Descargo de Responsabilidad": `${Dni.trim()}`,
          },
        }),
          (metodo = "POST");
      } else {
        //console.log("operacion" + Operation);
        parametros = {
          records: [
            {
              id: `${Id.trim()}`,
              fields: {
                "Nombre Completo": `${NombreCompleto.trim()}`,
                "¿Es alumno o invitado?": `${AlumnoOInvitado.trim()}`,
                "Código Entrada": `${CodigoEntrada.trim()}`,
                "Nombre Completo de la Persona que Invita": `${NombreCompletoInvito.trim()}`,
                Email: `${Email.trim()}`,
                Teléfono: `${Telefono.trim()}`,
                "Estatus de Une": `${EstatusUne.trim()}`,
                "Asiste Como": `${AsisteComo.trim()}`,
                "Dni Descargo de Responsabilidad": `${Dni.trim()}`,
              },
            },
          ],
        };
        metodo = "PATCH";
      }
      //console.log(NombreCompleto+"--"+AlumnoOInvitado+"--"+CodigoEntrada+"--"+NombreCompletoInvito)
      EnviarSolicitud(metodo, parametros);
    }
  };

  const EnviarSolicitud = async (metodo, parametros, mensaje = "") => {
    //await axios({ method: metodo, url: baseURL, data: { records: parametros } })
    let baseURL = GetURL();
    await axios({ method: metodo, url: baseURL, data: parametros })
      .then(function (res) {
        let tipo = res["status"];
        let msj;

        msj = mensaje == "" ? "Registro Guardado" : mensaje;

        ShowAlert(msj, "success");
        //console.log(res['status'])
        if (tipo === 200) {
          document.getElementById("btnCerrar").click();
          GetPersons();
        }
      })
      .catch(function (error) {
        ShowAlert("Error en la Solicitud", "error");
        console.log(error);
      });
  };

  const DeletePerson = (Id, NombreCompleto) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title:
        "¿Seguro que deseas eliminar el registro de  " + NombreCompleto + "?",
      icon: "question",
      text: "No se puede dar marcha atrás a esta operación",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancelar",
    }).then((res) => {
      if (res.isConfirmed) {
        SetId(Id);
        const recordsToDelete = [Id]; // Reemplazar con los IDs reales
        let baseURL = GetURL();
        const config = {
          method: "delete",
          url: baseURL,
          params: {
            records: recordsToDelete,
          },
        };

        axios
          .request(config)
          .then(function (response) {
            //console.log(response.data); // Maneja la respuesta exitosa
            ShowAlert("Registro Eliminado", "success");
            GetPersons();
          })
          .catch(function (error) {
            console.error(error); // Maneja el error de la solicitud
            ShowAlert("Error en la Solicitud", "error");
          });
      } else {
        ShowAlert("El registro No fue eliminado", "info");
      }
    });
  };

  const UpdateAsiste = (Id, codigoEntrada) => {
    if (codigoEntrada) {
      SetId(Id);
      let metodo = "PATCH";
      let parametros;
      let mensaje;
      parametros = {
        records: [
          {
            id: `${Id.trim()}`,
            fields: {
              "Asiste Como": "Presencial",
            },
          },
        ],
      };
      mensaje = "Ha marcado este registro como Asiste Presencial";

      EnviarSolicitud(metodo, parametros, mensaje);
    } else {
      ShowAlert("Este asistente no tiene una entrada registrada", "error");
    }
  };

  //BUSCADOR
  const Searcher = (e) => {
    SetSearch(e.target.value);
    SetCurrentPage(1);
    //console.log(e.target.value)
  };

  let results = [];

  if (!Search) {
    results = Persons;
    //console.log(results.fields);
  } else {
    //console.log(Persons);
    //console.log(Search);
    const searchValue =
      typeof Search === "number"
        ? Search.toString()
        : Search.toLocaleLowerCase();

    results = Persons.filter(
      (Person) =>
        Person.fields["Nombre Completo"]
          ?.toLowerCase()
          ?.includes(searchValue) ||
        Person.fields["Email"]?.includes(searchValue) ||
        Person.fields["Código Entrada"]?.toString()?.includes(searchValue) ||
        Person.fields["Teléfono"]?.toString()?.includes(searchValue)
    );
  }

  //PAGINACION
  const lastIndex = CurrentPage * PersonsPerPage;
  const firstIndex = lastIndex - PersonsPerPage;

  if (Pending) {
    return (
      <>
        <Loader page={true} />
        <ModalAirtable data={AirtableRegister} />
      </>
    );
  } else {
    //console.log(results);
    return (
      <div className="App col-md-9 col-lg-10 mt-2 pt-5 px-3 order-first order-md-last">
        <div className="container-fluid App">
          <div className="row mt-3">
            {/*Searcher*/}
            <div className="col-md-4">
              <div className="d-grid mx-auto">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar Nombre, Email, N° Entrada"
                  onChange={Searcher}
                  value={Search}
                />
              </div>
            </div>
            {/*Btn Añadir*/}
            <div className="col-md-3 ms-auto">
              <div className="d-grid mx-auto">
                <button
                  className="btn btn-dark"
                  data-bs-toggle="modal"
                  data-bs-target="#modalPersons"
                  onClick={() => OpenModal(1)}
                >
                  <FontAwesomeIcon icon={faCirclePlus} />
                  <span className="mx-2">Añadir</span>
                </button>
              </div>
            </div>
          </div>
          {/*Table*/}
          <div className="row mt-3">
            <div className="table-responsive ">
              <table className="table align-middle table-sm">
                <thead className="table-dark">
                  <tr>
                    <th className="col-md-2 "></th>
                    <th className="text-uppercase">
                      {data["nombreCompleto"]
                        ? data["nombreCompleto"]
                        : "Nombre Completo"}
                    </th>
                    <th className="text-center text-uppercase">
                      {data["dni"] ? data["dni"] : "DNI"}
                    </th>
                    <th className="text-center text-uppercase">
                      {data["codigoEntrada"]
                        ? data["codigoEntrada"]
                        : "CÓDIGO DE ENTRADA"}
                    </th>
                    <th className="text-center text-uppercase">
                      {data["telefono"] ? data["telefono"] : "TELÉFONO"}
                    </th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {results
                    .map((Person) => {
                      return (
                        <tr key={Person.id}>
                          <td className="text-center">
                            <button
                              className={`btn btn-outline-success mx-1 btn-sm `}
                              onClick={() =>
                                OpenModal(
                                  2,
                                  Person.id,
                                  Person.fields[
                                    data["nombreCompleto"]
                                      ? data["nombreCompleto"]
                                      : "Nombre Completo"
                                  ],
                                  Person.fields[
                                    data["alumnoOinvitado"]
                                      ? data["alumnoOinvitado"]
                                      : "¿Es alumno o invitado?"
                                  ],
                                  Person.fields[
                                    data["codigoEntrada"]
                                      ? data["codigoEntrada"]
                                      : "Código Entrada"
                                  ],
                                  Person.fields[
                                    data["nombreCompletoInvito"]
                                      ? data["nombreCompletoInvito"]
                                      : "Nombre Completo de la Persona que Invita"
                                  ],
                                  Person.fields[
                                    data["email"] ? data["email"] : "Email"
                                  ],
                                  Person.fields[
                                    data["telefono"]
                                      ? data["telefono"]
                                      : "Teléfono"
                                  ],
                                  Person.fields[
                                    data["estatusUne"]
                                      ? data["estatusUne"]
                                      : "Estatus de Une"
                                  ],
                                  Person.fields[
                                    data["asisteComo"]
                                      ? data["asisteComo"]
                                      : "Asiste Como"
                                  ],
                                  Person.fields[
                                    data["dni"]
                                      ? data["dni"]
                                      : "Dni Descargo de Responsabilidad"
                                  ]
                                )
                              }
                              data-bs-toggle="modal"
                              data-bs-target="#modalPersons"
                            >
                              <FontAwesomeIcon icon={faEdit} />
                            </button>

                            <button
                              className={`btn mx-1 btn-sm ${
                                Person.fields["Asiste Como"] == "Presencial"
                                  ? "btn-outline-primary disabled"
                                  : "btn-outline-primary"
                              }`}
                              onClick={() =>
                                UpdateAsiste(
                                  Person.id,
                                  Person.fields[
                                    data["codigoEntrada"]
                                      ? data["codigoEntrada"]
                                      : "Código Entrada"
                                  ]
                                )
                              }
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title="Marcar como Asiste Presencial"
                            >
                              <FontAwesomeIcon icon={faCheck} />
                            </button>

                            <button
                              className="btn btn-outline-danger mx-1 btn-sm"
                              onClick={() =>
                                DeletePerson(
                                  Person.id,
                                  Person.fields[
                                    data["nombreCompleto"]
                                      ? data["nombreCompleto"]
                                      : "Nombre Completo"
                                  ]
                                )
                              }
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title="Eliminar registro"
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </td>
                          <td>
                            <div>
                              <p className="fw-bold mb-0">
                                {
                                  Person.fields[
                                    data["nombreCompleto"]
                                      ? data["nombreCompleto"]
                                      : "Nombre Completo"
                                  ]
                                }
                              </p>
                              <p className="text-muted mb-0">
                                {
                                  Person.fields[
                                    data["Email"] ? data["Email"] : "Email"
                                  ]
                                }
                              </p>
                            </div>
                          </td>
                          <td className="text-center">
                            {
                              Person.fields[
                                data["dni"]
                                  ? data["dni"]
                                  : "Dni Descargo de Responsabilidad"
                              ]
                            }
                          </td>
                          <td className="text-center">
                            <h5
                              onClick={
                                Person.fields[
                                  data["asisteComo"]
                                    ? data["asisteComo"]
                                    : "Asiste Como"
                                ] != "Presencial"
                                  ? () =>
                                      UpdateAsiste(
                                        Person.id,
                                        Person.fields[
                                          data["codigoEntrada"]
                                            ? data["codigoEntrada"]
                                            : "Código Entrada"
                                        ]
                                      )
                                  : () => UpdateAsiste
                              }
                              style={
                                Person.fields[
                                  data["asisteComo"]
                                    ? data["asisteComo"]
                                    : "Asiste Como"
                                ] != "Presencial"
                                  ? { cursor: "pointer" }
                                  : { cursor: "pointer" }
                              }
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title="Marcar como Asiste Presencial"
                            >
                              <span
                                className={`badge ${
                                  Person.fields[
                                    data["asisteComo"]
                                      ? data["asisteComo"]
                                      : "Asiste Como"
                                  ] == "Presencial"
                                    ? "bg-success"
                                    : "bg-secondary"
                                }`}
                              >
                                {Person.fields[
                                  data["codigoEntrada"]
                                    ? data["codigoEntrada"]
                                    : "Código Entrada"
                                ] ? (
                                  <>
                                    {
                                      Person.fields[
                                        data["asisteComo"]
                                          ? data["asisteComo"]
                                          : "Asiste Como"
                                      ]
                                    }
                                    {" #"}
                                    {
                                      Person.fields[
                                        data["codigoEntrada"]
                                          ? data["codigoEntrada"]
                                          : "Código Entrada"
                                      ]
                                    }
                                  </>
                                ) : (
                                  ""
                                )}
                              </span>
                            </h5>
                          </td>
                          <td className="text-center">
                            {
                              Person.fields[
                                data["telefono"] ? data["telefono"] : "Teléfono"
                              ]
                            }
                          </td>
                        </tr>
                      );
                    })
                    .slice(firstIndex, lastIndex)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/*Modal*/}
        <div className="modal fade " aria-hidden="true" id="modalPersons">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <label className="h5">{Title}</label>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <FontAwesomeIcon icon={faUser} />
                  </span>
                  <input
                    type="hidden"
                    id="id"
                    className="form-control"
                    value={Id}
                    onChange={(e) => {
                      SetId(e.target.value);
                    }}
                  ></input>

                  <input
                    type="text"
                    id="nombre"
                    className="form-control"
                    placeholder="Nombre Completo"
                    value={NombreCompleto}
                    onChange={(e) => {
                      SetNombreCompleto(e.target.value);
                    }}
                  ></input>
                  <span className="input-group-text">
                    <FontAwesomeIcon icon={faAddressCard} />
                  </span>
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

                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </span>
                  <select
                    value={AlumnoOInvitado}
                    className="form-select"
                    onChange={(e) => {
                      //console.log(AlumnoOInvitado)
                      SetAlumnoOInvitado(e.target.value);
                    }}
                  >
                    <option value="" disabled>
                      ¿Es alumno o invitado?
                    </option>
                    <option value="Alumno">Alumno</option>
                    <option value="Invitado">Invitado</option>
                  </select>
                  <span className="input-group-text">
                    <FontAwesomeIcon icon={faHashtag} />
                  </span>
                  <input
                    type="text"
                    id="codigoentrada"
                    className="form-control"
                    placeholder="Código Entrada"
                    value={CodigoEntrada}
                    onChange={(e) => {
                      SetCodigoEntrada(e.target.value);
                    }}
                  ></input>
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <FontAwesomeIcon icon={faAt} />
                  </span>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    placeholder="Correo Electrónico"
                    value={Email}
                    onChange={(e) => {
                      SetEmail(e.target.value);
                    }}
                  ></input>
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <FontAwesomeIcon icon={faPhone} />
                  </span>
                  <input
                    type="text"
                    id="telefono"
                    className="form-control"
                    placeholder="Teléfono"
                    value={Telefono}
                    onChange={(e) => {
                      SetTelefono(e.target.value);
                    }}
                  ></input>
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <FontAwesomeIcon icon={faIdBadge} />
                  </span>
                  <input
                    type="text"
                    id="nombreinvito"
                    className="form-control"
                    placeholder="Nombre Completo de la Persona que Invita"
                    value={NombreCompletoInvito}
                    onChange={(e) => {
                      SetNombreCompletoInvito(e.target.value);
                    }}
                  ></input>
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <FontAwesomeIcon icon={faList} />
                  </span>
                  <select
                    value={EstatusUne}
                    className="form-select"
                    onChange={(e) => {
                      SetEstatusUne(e.target.value);
                    }}
                  >
                    <option value="" disabled>
                      Estatus de Une
                    </option>
                    <option value="Opción 1">Opción 1</option>
                    <option value="Opción 2">Opción 2</option>
                  </select>
                  <span className="input-group-text">
                    <FontAwesomeIcon icon={faShareFromSquare} />
                  </span>
                  <select
                    value={AsisteComo}
                    className="form-select"
                    onChange={(e) => {
                      SetAsisteComo(e.target.value);
                    }}
                  >
                    <option value="">Asiste Como</option>
                    <option value="Presencial">Presencial</option>
                    <option value="Online">Online</option>
                    <option value="NoAsiste">No Asiste</option>
                  </select>
                </div>

                <div className="d-grid col-md-6 mx-auto mt-4">
                  <button className="btn btn-success" onClick={() => Validar()}>
                    <FontAwesomeIcon icon={faFloppyDisk} />
                    <span className="mx-2">Guardar</span>
                  </button>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  id="btnCerrar"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <ModalAirtable />*/}
        <ModalAirtable data={AirtableRegister} />
        <Pagination
          CurrentPage={CurrentPage}
          PersonsPerPage={PersonsPerPage}
          SetCurrentPage={SetCurrentPage}
          totalPersons={totalPersons}
        />
      </div>
    );
  }
};
export default ShowPerson;
