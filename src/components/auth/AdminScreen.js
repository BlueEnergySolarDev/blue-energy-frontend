import React from 'react';
import { Link } from 'react-router-dom';

export const AdminScreen = () => {
  return (
    <div className='container text-center'>
      <h2 className='mb-5 mt-2' style={{ color: "black" }}>Administrar</h2>
      <div className='d-flex flex-row justify-content-evenly align-items-center'>
        <Link to="/controlrpp">
          <button className="btn btn-primary btn-lg" title="Cargar un nuevo RPP">
            <i className="fas fa-user"></i> Controlar RRPP
          </button>
        </Link>
        <Link to="/controlevento">
          <button className="btn btn-primary btn-lg" title="Cargar un nuevo RPP">
            <i className="fas fa-calendar-alt"></i> Controlar Eventos
          </button>
        </Link>
        <Link to="/agregarfotos">
          <button className="btn btn-primary btn-lg" title="Cargar un nuevo RPP">
            <i className="fas fa-camera"></i> Subir fotos a página
          </button>
        </Link>

      </div>
    </div>
  );
};
