import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPersonCircleCheck,
  faHome,
  faLock,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ user }) => {
  const id = import.meta.env.VITE_ADMIN_KEY;
  const id2 = import.meta.env.VITE_ADMIN_KEY2;

  return (
    <section className="d-flex flex-column flex-shrink-0 pt-5 px-3 text-white bg-dark col-md-3 col-lg-2  ">
      <hr />
      <ul className="nav nav-pills flex-column">
        <li className="nav-item">
          <a href="#" className="nav-link active" aria-current="page">
            <FontAwesomeIcon icon={faHome} />
            <span className="px-2">Dashboard</span>
          </a>
        </li>
        {(user.id === id2 || user.id === id) && (
          <li>
            <a
              href="#"
              className="nav-link text-white"
              data-bs-toggle="modal"
              data-bs-target="#modalAirtable"
            >
              <FontAwesomeIcon icon={faPersonCircleCheck} />
              <span className="px-2">Cambiar Datos Airtable</span>
            </a>
          </li>
        )}
      </ul>
      <hr />
      <ul className="nav nav-pills flex-column">
        <li className="nav-item">
          <span className="px-2 text-secondary">{user.email}</span>
        </li>
      </ul>
      <hr />
    </section>
  );
};

export default Sidebar;
