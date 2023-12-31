import { Outlet } from "react-router-dom";

import { Navbar } from "../components/ui/Navbar";
import { LanguageSwitcher } from "../components/ui/LanguageSwitcher";

export const Layout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <LanguageSwitcher />
        </>
    );
}