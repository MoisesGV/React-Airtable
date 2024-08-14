const Loader = (page) =>   {

    const clase = !page ? 'col-md-12 align-self-center' : 'col-md-9 col-lg-10 pt-5 px-3 align-self-center';    
    //console.log(page)
  return (
    <div className={`App text-center  ${clase}`}>
        
            <div className="spinner-grow mx-1" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow mx-1" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow mx-1" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
        </div>

  );
};

export default Loader;
