import React, { useState } from "react";

const Searcher = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  const Search = (e) => {
    setSearch(e.target.value);
    if (e.target.value.length >= 3) {
      onSearch(e.target.value);
    }
  };

  return (
    <div className="col-md-6">
      <div className="d-grid mx-auto">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar Nombre, Email, N° Entrada"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </div>
  );
};
export default Searcher;
