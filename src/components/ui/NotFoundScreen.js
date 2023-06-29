import React from "react";

export const NotFoundScreen = () => {

  return (
    <div className="container">
      <div className="alert alert-danger d-flex flex-column justify-content-center align-items-center mt-5">
        <h1 style={{color:"red"}}>Error</h1>
        <h3>No existe ninguna pagina aquí</h3>
      </div>
    </div>
  );
};
