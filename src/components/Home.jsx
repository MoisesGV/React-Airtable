import React, { useEffect, useState } from "react";
import ShowPerson from "./ShowPerson";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Supabase from "../Credenciales";
import Loader from "./Loader";
import { ShowAlert } from "../function";

const Home = ({ sesion }) => {
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
  if (sesion) {
    return (
      <>
        <Header />
        <div className="container-fluid">
          <div className="row vh-100">
            <Sidebar email={User} />
            <div className="App col-md-9 col-lg-10 mt-2 pt-5 px-3 order-first order-md-last">
              <div className="container-fluid App my-4">
                <ShowPerson data={Data} />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    <Loader />;
  }
};

export default Home;
