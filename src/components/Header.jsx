import Supabase from "../Credenciales";

const Header = () => {
  //<button className="btn btn-dark px-3" href="#" onClick={() => signOut(auth)}>
  return (
    <header className="navbar fixed-top navbar-dark bg-dark">
      <a className="navbar-brand col-md-3 col-lg-2 me-0 px-4 " href="#">
        Airtable Register
      </a>
      <div className="navbar-nav mx-4">
        <div className="nav-item text-nowrap">
          <button
            className="btn btn-primary px-3"
            href="#"
            onClick={async () => await Supabase.auth.signOut()}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
