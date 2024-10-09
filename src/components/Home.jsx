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
  const [Id, SetId] = useState("");

  const id = import.meta.env.VITE_ADMIN_KEY;
  const id2 = import.meta.env.VITE_ADMIN_KEY2;

  const GetAirtableConfig = async () => {
    const {
      data: { user },
    } = await Supabase.auth.getUser();
    SetUser(user);
    let userId = "";
    if (user.id != id && user.id != id2) {
      userId = id;
    } else {
      userId = user.id;
    }
    const { data, error } = await Supabase.from("table")
      .select()
      .eq("idUser", userId);
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
            <Sidebar user={User} />
            <div className="App col-md-9 col-lg-10 mt-2 pt-5 px-3 order-first order-md-last">
              <div className="container-fluid App my-4">
                <ShowPerson data={Data} user={User} />
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
