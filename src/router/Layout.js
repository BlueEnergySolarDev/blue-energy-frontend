import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/ui/Navbar";

export const Layout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
}