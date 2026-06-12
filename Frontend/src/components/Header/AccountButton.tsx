import { MouseEvent } from "react";
import { alpha } from "@mui/material/styles";
import { IconButton, Avatar } from "@mui/material"
import { useAccount } from "../../context/AccountContext";
import { LoadingCircle } from "../LoadingCircle/LoadingCircle";

interface AccountButtonProps {
    open: boolean,
    handleOpen: (event: MouseEvent<HTMLButtonElement>) => void;
}

export const AccountButton : React.FC<AccountButtonProps> = ({
    open,
    handleOpen
}) => {    
    const { account } = useAccount();

    return (
        <>
            {account ?
                <IconButton
                    onClick={handleOpen}
                    className="w-12 h-12"
                    sx={{
                        background: (theme) => alpha(theme.palette.grey[500], 0.08),
                        
                        ...(open && {
                            background: (theme) =>
                                `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
                        }),
                    }}
                >
                    <Avatar
                        alt={account.firstname}
                        className="w-15 h-15"
                        sx={{
                            border: (theme) =>
                                `solid 2px ${theme.palette.background.default}`,
                        }}
                    >
                        {account.firstname.charAt(0).toUpperCase()}
                        {account.lastname.charAt(0).toUpperCase()}
                    </Avatar>
                </IconButton>
            :
                <LoadingCircle />
            }
        </>
    )
}
