import { Outlet } from "react-router-dom";

import { LanguageSwitcher } from "../components/ui/LanguageSwitcher";

export const PublicLayout = () => {
    return (
        <>
            <Outlet />
            <LanguageSwitcher />
        </>
    );
}