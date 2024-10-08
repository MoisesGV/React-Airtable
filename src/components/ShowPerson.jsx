import React, { useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import Searcher from "./Searcher";
import BtnAdd from "./BtnAdd";
import PersonCard from "./PersonCard";
import ModalAirtable from "./ModalAirtable";
import { ShowAlert } from "../function";

import Pagination from "./Pagination";
import ModalPerson from "./ModalPerson";
import ModalPermis from "./ModalPermis";

const ShowPerson = ({ data, user }) => {
  //axios CONST
  const ApiKey = import.meta.env.VITE_AIRTABLE_API_KEY;
  axios.defaults.headers.post["Content-Type"] = "application/json";
  axios.defaults.headers["Authorization"] = `Bearer ${ApiKey}`;

  //STATE
  const [Pending, setPending] = useState(true);
  const [Persons, SetPersons] = useState([]);
  const [personToEdit, SetpersonToEdit] = useState([]);
  const [Operation, SetOperation] = useState(true);
  const [Search, SetSearch] = useState("");
  const [Data, SetData] = useState(false);
  const [AirtableRegister, SetAirtableRegister] = useState([]);
  const [UrlAirtableRegister, SetUrlAirtableRegister] = useState("");

  //STATE PAGINATION
  const totalPersons = Persons.length;
  //console.log(totalPersons);
  const [CurrentPage, SetCurrentPage] = useState(1);
  const [PersonsPerPage, SetPersonsPerPage] = useState(20);

  const id = import.meta.env.VITE_ADMIN_KEY;
  const id2 = import.meta.env.VITE_ADMIN_KEY2;
  let showBtn = false;
  if (user.id === id2 || user.id === id) {
    showBtn = true;
  }
  const GetURL = () => {
    let fieldOrder = data["nombreCompleto"].replace(" ", "%20");
    let order =
      "?sort%5B0%5D%5Bfield%5D=" +
      fieldOrder +
      "&sort%5B0%5D%5Bdirection%5D=asc";
    const urlBase = data["idAirtable"] + order;

    const baseURL = (axios.defaults.baseURL = urlBase);
    SetUrlAirtableRegister(baseURL);
    //console.log(baseURL);
    return baseURL;
  };

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
      //console.log(allRecords);
    } catch (error) {
      //console.error(error);
      ShowAlert(
        "Ocurrio un error al cargar los datos de la tabla, debe verificar que la Configuración de Airtable corresponda con los encabezados de su tabla",
        "error"
      );
    }
  };

  const onSearch = (value) => {
    SetSearch(value);
  };

  const SelectAdd = () => {
    SetOperation(true);
    SetpersonToEdit(false);
  };

  if (data["idAirtable"] && !Data) {
    ShowAlert(
      "Configuración de Airtable encontrada, cargando datos de la tabla...",
      "info"
    );
    SetAirtableRegister(data);
    //console.log(data);
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

  const EditPerson = (Person) => {
    SetpersonToEdit(Person);
    SetOperation(false);
  };

  let results = [];

  if (Search) {
    const searchValue =
      typeof Search === "number"
        ? Search.toString()
        : Search.toLocaleLowerCase();

    results = Persons.filter(
      (Person) =>
        Person.fields[AirtableRegister.nombreCompleto]
          ?.toLowerCase()
          ?.includes(searchValue) ||
        Person.fields[AirtableRegister.email]?.includes(searchValue) ||
        Person.fields[AirtableRegister.codigoEntrada]
          ?.toString()
          ?.includes(searchValue) ||
        Person.fields[AirtableRegister.telefono]
          ?.toString()
          ?.includes(searchValue)
    );
  } else {
    results = [];
  }

  if (Pending) {
    return (
      <>
        <Loader page={true} />
        <ModalAirtable data={AirtableRegister} />
      </>
    );
  } else {
    //console.log(Persons);
    return (
      <>
        <div className="row">
          <Searcher onSearch={onSearch} />
          <BtnAdd selectOperation={SelectAdd} />
        </div>
        <div className="row row-cols-1 row-cols-lg-2 g-4  my-1">
          {results.map((Person) => {
            return (
              <PersonCard
                dataAirtable={data}
                dataPerson={Person}
                key={Person.id}
                url={UrlAirtableRegister}
                onChange={GetPersons}
                onEdit={EditPerson}
                showBtn={showBtn}
              />
            );
          })}
        </div>
        <ModalAirtable data={AirtableRegister} />
        <ModalPermis />
        <ModalPerson
          dataAirtable={AirtableRegister}
          operation={Operation}
          url={UrlAirtableRegister}
          onChange={GetPersons}
          person={personToEdit}
        />
      </>
    );
  }
};
export default ShowPerson;
