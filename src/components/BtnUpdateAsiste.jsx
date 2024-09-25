import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { ShowAlert } from "../function";

const BtnUpdateAsiste = ({ Url, Id, codigoEntrada, asisteComo, onChange }) => {
  const UpdateAsiste = (Id, codigoEntrada, asisteComo) => {
    const MySwal = withReactContent(Swal);
    if (codigoEntrada) {
      let metodo = "PATCH";
      let parametros;
      parametros = {
        records: [
          {
            id: `${Id.trim()}`,
            fields: {
              "Asiste Como": "CONFIRMADO",
            },
          },
        ],
      };

      if (asisteComo == "CONFIRMADO") {
        ShowAlert("Este registro ya esta CONFIRMADO", "info");
      } else {
        axios({ method: metodo, url: Url, data: parametros })
          .then(function (res) {
            let tipo = res["status"];
            let msj;
            ShowAlert("Ha marcado este registro como CONFIRMADO", "success");
            //console.log(res['status'])
            if (tipo === 200) {
              document.getElementById("btnCerrar").click();
              onChange();
            }
          })
          .catch(function (error) {
            ShowAlert("Error en la Solicitud", "error");
            //console.log(error);
          });
      }
    } else {
      ShowAlert("Este asistente no tiene una entrada registrada", "error");
    }
  };
  let color;
  let separador = " #";
  switch (asisteComo) {
    case "CONFIRMADO":
      color = "primary";
      break;
    case "Presencial":
      color = "success";
      break;
    case "Online":
      color = "light";
      break;
    case "No Asiste":
      color = "danger";
      break;
    default:
      color = "secondary";
  }
  return (
    <button
      className={`btn ${asisteComo} btn-${color} fw-bold me-3 `}
      onClick={() => UpdateAsiste(Id, codigoEntrada, asisteComo)}
    >
      {asisteComo}
      {separador}
      {codigoEntrada}
    </button>
  );
};
export default BtnUpdateAsiste;
