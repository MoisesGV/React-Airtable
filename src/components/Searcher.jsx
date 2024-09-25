import React, { useState } from "react";

const Searcher = ({ onSearch }) => {
  const [search, setSearch] = useState("");
  const Search = (e) => {
    //console.log(e);
    onSearch(e);
    setSearch(e);
  };

  return (
    <div className="col-md-6">
      <div className="d-grid mx-auto">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar Nombre, Email, N° Entrada"
          onChange={(e) => Search(e.target.value)}
        />
        {!search || search.trim() === "" ? (
          <div className="alert alert-primary" role="alert">
            Buscador vacio, escribe algo!
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
export default Searcher;
