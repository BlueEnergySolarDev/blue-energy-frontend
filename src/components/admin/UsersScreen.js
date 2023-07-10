import React from "react";
import { useNavigate } from "react-router-dom";
import { PaginatedUsersItems } from "./PaginatedUsersItems";
import useSWR from "swr"

export const UsersScreen = () => {
  const navigate = useNavigate();
  const { data, error, isLoading } = useSWR('auth/users');
  const handleReturn = (e) => {
    navigate('/');
  };
  return (
    <div className="d-flex flex-column justify-content-center align-items-center text-center">
      <h1 className="text-dark mb-4 mt-2">Users</h1>
      {
        data?.users.length > 0 ?
          <PaginatedUsersItems itemsPerPage={10} items={data?.users} loading={isLoading} />
          :
          <span className="h3">No users</span>
      }
      <div className="form-group d-flex flex-row justify-content-center">
        <button className="btn btn-light mt-2 mb-2 btn-bright d-flex flex-row justify-content-center align-items-center" onClick={handleReturn}>
          <i className="fa fa-arrow-rotate-left me-1"></i> Return
        </button>
      </div>
    </div >
  );
};
