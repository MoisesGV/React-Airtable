import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { ShowAlert } from "../function";

const BtnDelete = ({ Url, Id, Name, onDelete }) => {
  const DeletePerson = (Id, Name) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "¿Seguro que deseas eliminar el registro de  " + Name + "?",
      icon: "question",
      iconColor: "#6c757d",
      text: "No se puede dar marcha atrás a esta operación",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar",
      confirmButtonColor: "#0a58ca",
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#dc3545",
    }).then((res) => {
      if (res.isConfirmed) {
        const recordsToDelete = [Id]; // Reemplazar con los IDs reales
        const config = {
          method: "delete",
          url: Url,
          params: {
            records: recordsToDelete,
          },
        };

        axios
          .request(config)
          .then(function (response) {
            //console.log(response.data); // Maneja la respuesta exitosa
            ShowAlert("Registro Eliminado", "success");
            onDelete();
          })
          .catch(function (error) {
            console.error(error); // Maneja el error de la solicitud
            ShowAlert("Error en la Solicitud", "error");
          });
      } else {
        //ShowAlert("El registro No fue eliminado", "info");
      }
    });
  };
  //
  return (
    <div className="card-text fw-bolder m-0  d-flex align-self-center col-md-2 col-lg-1 col-sm-2 justify-content-end order-sm-2 order-md-3 ">
      <button
        className="btn btn-outline-danger mx-1 "
        onClick={() => DeletePerson(Id, Name)}
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title="Eliminar registro"
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
};
export default BtnDelete;
