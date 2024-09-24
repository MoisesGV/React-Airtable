import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export function ShowAlert(mensaje, icono, foco = "") {
  OnFocus(foco);
  const MySwal = withReactContent(Swal);
  MySwal.fire({
    title: mensaje,
    icon: icono,
    confirmButtonColor: "#0a58ca",
  });
}

function OnFocus(foco) {
  if (foco !== "") {
    document.getElementById(foco).focus();
  }
}
