import React, { useEffect, useState } from "react";
import ShowPerson from "./ShowPerson";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Supabase from "../Credenciales";
import { ShowAlert } from "../function";

const Home = () => {
  //STATE
  const [Data, SetData] = useState([]);
  const [User, SetUser] = useState([]);

  const GetAirtableConfig = async () => {
    const {
      data: { user },
    } = await Supabase.auth.getUser();
    SetUser(user.email);
    const iduser = user.id;
    const { data, error } = await Supabase.from("table")
      .select()
      .eq("idUser", iduser);
    if (error) throw error;
    if (data.length > 0 && data) {
      SetData(data[0]);
    } else {
      ShowAlert(
        "No existe una Configuración de Airtable para este usuario",
        "error"
      );
    }
  };

  useEffect(() => {
    GetAirtableConfig();
  }, []);

  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row vh-100">
          <Sidebar email={User} />
          <ShowPerson data={Data} />
        </div>
      </div>
    </>
  );
};

export default Home;
