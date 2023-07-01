import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchConToken } from "../../helpers/fetch";
import { PaginatedSitDownsItems } from "./PaginatedSitDownsItems";

export const SitDownsScreen = () => {
  const { uid } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [entradas, setEntradas] = useState([]);
  const [loading, setLoading] = useState(false);
  //FETCHING
  useEffect(() => {
    const getEntradas = async () => {
      setLoading(true);
      const resp = await fetchConToken(`clientes/pagina/${uid}`);
      const body = await resp.json();
      setEntradas(body.entradas);
      setLoading(false);
    }
    getEntradas();
  }, [uid]);
  const handleVolver = (e) => {
    navigate('/');
  };
  return (
    <div className="d-flex flex-column justify-content-center align-items-center text-center">
      <h1 className="text-light mb-2">Mis entradas</h1>
      {entradas.length > 0 &&
        <div>
          <h5 className="text-light mb-2">Click en la tabla para desplegar y ver las entradas</h5>
          <div className="form-group d-flex justify-content-center">
            <Link reloadDocument className="text-light fw-bold text-decoration-none" to="/compras">Historial</Link>
          </div>
        </div>
      }
      <hr style={{ color: "white" }} />

      {entradas.length > 0 ?
        <PaginatedSitDownsItems itemsPerPage={10} items={entradas} loading={loading} />
        :
        <span className="h3 text-light">No hay entradas</span>}
      <div className="form-group d-flex justify-content-center">
        <button className="btn btn-light mt-2" onClick={handleVolver}>Volver</button>
      </div>
    </div>
  );
};
