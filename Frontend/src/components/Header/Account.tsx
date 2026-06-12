import { MouseEvent, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { AccountButton } from "./AccountButton";
import { AccountPopover } from "./AccountPopover";

export const Account : React.FC = () => {
    const [ open, setOpen ] = useState(false);
    const [ anchorEl, setAnchorEl ] = useState<HTMLElement | null>(null);

    const { logout } = useAuth();

    const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
        setOpen(true);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(false);
        setAnchorEl(null);
    };

    return (
        <>
            <AccountButton
                open={open}
                handleOpen={handleOpen}
            />

            <AccountPopover
                open={open}
                anchorEl={anchorEl}
                handleClose={handleClose}
                logout={logout}
            />
        </>
    );
}
