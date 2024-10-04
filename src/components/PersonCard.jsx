import React from "react";

import BtnDelete from "./BtnDelete";
import BtnUpdate from "./BtnUpdate";
import BtnUpdateAsiste from "./BtnUpdateAsiste";
const PersonCard = ({
  dataAirtable,
  dataPerson,
  url,
  onChange,
  onEdit,
  showBtn,
}) => {
  return (
    <div className="col mb-1">
      <div className="card border-dark  ">
        <h5 className="card-header bg-dark text-white">
          <div className="row">
            <div className="card-text fw-bolder m-0 d-grid  col-md-4 col-sm-10  order-sm-2">
              <BtnUpdateAsiste
                Url={url}
                Id={dataPerson.id}
                codigoEntrada={
                  dataPerson.fields[
                    dataAirtable["codigoEntrada"]
                      ? dataAirtable["codigoEntrada"]
                      : "CcodigoEntrada"
                  ]
                }
                asisteComo={
                  dataPerson.fields[
                    dataAirtable["asisteComo"]
                      ? dataAirtable["asisteComo"]
                      : "asisteComo"
                  ]
                }
                onChange={onChange}
              />
            </div>
            <div className="card-text fw-bolder mx-0 my-2 d-flex align-self-center col-lg-7 col-md-6 col-12 order-sm-3 ">
              {
                dataPerson.fields[
                  dataAirtable["nombreCompleto"]
                    ? dataAirtable["nombreCompleto"]
                    : "nombreCompleto"
                ]
              }
            </div>
            {showBtn && (
              <BtnDelete
                Url={url}
                Id={dataPerson.id}
                Name={
                  dataPerson.fields[
                    dataAirtable["nombreCompleto"]
                      ? dataAirtable["nombreCompleto"]
                      : "nombreCompleto"
                  ]
                }
                onDelete={onChange}
              />
            )}
          </div>
        </h5>
        <div className="card-body">
          <p className="card-text fw-bolder m-0 text-uppercase">
            {dataAirtable["email"] ? dataAirtable["email"] : "EMAIL"}:
          </p>
          <p className="card-text m-0">
            {
              dataPerson.fields[
                dataAirtable["email"] ? dataAirtable["email"] : "email"
              ]
            }
          </p>

          <hr className="my-1" />
          <p className="card-text fw-bolder m-0 text-uppercase">
            {dataAirtable["telefono"] ? dataAirtable["telefono"] : "TELÉFONO"}:
          </p>
          <p className="card-text m-0">
            {
              dataPerson.fields[
                dataAirtable["telefono"] ? dataAirtable["telefono"] : "telefono"
              ]
            }
          </p>

          <hr className="my-1" />
          <p className="card-text fw-bolder m-0 text-uppercase">
            {dataAirtable["dni"] ? dataAirtable["dni"] : "DNI"}:
          </p>
          <p className="card-text m-0">
            {
              dataPerson.fields[
                dataAirtable["dni"] ? dataAirtable["dni"] : "dni"
              ]
            }
          </p>
        </div>
        <div className="card-footer bg-dark ">
          <div className="row">
            <div className="col-6 text-white">
              <p className="card-text fw-bolder m-0">TIPO DE ENTRADA:</p>
              <p className="card-text m-0">
                {
                  dataPerson.fields[
                    dataAirtable["alumnoOinvitado"]
                      ? dataAirtable["alumnoOinvitado"]
                      : "alumnoOinvitado"
                  ]
                }
              </p>
            </div>
            <BtnUpdate onEdit={() => onEdit(dataPerson)} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default PersonCard;
