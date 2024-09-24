import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const BtnUpdate = ({ onEdit }) => {
  return (
    <div className="col-6 d-flex align-self-center justify-content-end ">
      <button
        type="button"
        className="btn btn-primary fw-bolder"
        onClick={() => onEdit()}
        data-bs-toggle="modal"
        data-bs-target="#modalPerson"
      >
        Editar <FontAwesomeIcon icon={faEdit} />
      </button>
    </div>
  );
};
export default BtnUpdate;
