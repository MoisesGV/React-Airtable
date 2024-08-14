import React from "react";
const Pagination = ({
  CurrentPage,
  PersonsPerPage,
  SetCurrentPage,
  totalPersons,
}) => {
  const numberPage = [];
  for (let i = 1; i <= Math.ceil(totalPersons / PersonsPerPage); i++) {
    numberPage.push(i);
  }

  const onPreviusPage = () => {
    SetCurrentPage(CurrentPage - 1);
  };

  const onNextPage = () => {
    SetCurrentPage(CurrentPage + 1);
  };

  const onSpecificPage = (n) => {
    SetCurrentPage(n);
  };

  return (
    <div className="text-center my-3 d-none d-sm-block">
      <nav>
        <ul className="pagination justify-content-center  ">
          <li
            className={CurrentPage === 1 ? "page-item disabled " : "page-item "}
          >
            <a
              className="page-link text-light bg-dark"
              href="#"
              onClick={onPreviusPage}
            >
              Anterior
            </a>
          </li>
          {numberPage.map((page) => (
            <li
              className={
                page === CurrentPage ? "page-item active" : "page-item"
              }
              key={page}
            >
              <a
                className="page-link text-light bg-dark"
                href="#"
                onClick={() => onSpecificPage(page)}
              >
                {page}
              </a>
            </li>
          ))}
          <li
            className={
              CurrentPage >= numberPage.length
                ? "page-item disabled"
                : "page-item"
            }
          >
            <a
              className="page-link text-light bg-dark"
              href="#"
              onClick={onNextPage}
            >
              Siguiente
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
