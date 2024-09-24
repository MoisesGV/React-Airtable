import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

const BtnAdd = ({ selectOperation }) => {
  return (
    <div className="col-md-3 ms-auto">
      <div className="d-grid mx-auto">
        <button
          className="btn btn-dark"
          data-bs-toggle="modal"
          data-bs-target="#modalPerson"
          onClick={() => selectOperation()}
        >
          <FontAwesomeIcon icon={faCirclePlus} />
          <span className="mx-2">Añadir</span>
        </button>
      </div>
    </div>
  );
};
export default BtnAdd;
