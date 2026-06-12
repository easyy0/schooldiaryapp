import { Box, alpha, Avatar, Typography } from "@mui/material"
import { useAccount } from "../../context/AccountContext";
import { useEffect } from "react";
import { services } from "../../services/services";
import { useAuth } from "../../context/AuthContext";
import { LoadingCircle } from "../LoadingCircle/LoadingCircle";
import { useTranslation } from "react-i18next";

export const Account : React.FC = () => {
    const { accessToken, logout } = useAuth();
    const { account, setAccount } = useAccount();
    const { t } = useTranslation();

    const getAccountData = async () => {
        try {
            const accountData = await services.UtilsService.GetUser(
                accessToken,
                null
            );
            
            setAccount(accountData);
        } catch (e) {
            logout();
        }
    };

    useEffect(() => {
        getAccountData();
    }, [])

    return (
        <Box
            sx={{
                my: 3,
                mx: 2.5,
                py: 2,
                px: 2.5,
                display: "flex",
                borderRadius: 1.5,
                justifyContent: account ? "baseline" : "center",
                alignItems: "center",
                bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
            }}
        >
            {account ?
                <>
                    <Avatar>{account.firstname.charAt(0)}{account.lastname.charAt(0)}</Avatar>

                    <Box sx={{ ml: 2 }}>
                        <Typography variant="subtitle2">
                            {account.firstname + " " + account.lastname}
                        </Typography>
                        {account.schoolClass &&
                            <Typography
                                variant="subtitle2"
                                color={'primary'}
                                sx={{
                                    fontSize: 12
                                }}
                            >
                                {`${t('global:CLASS')} ${account.schoolClass.name}`}
                            </Typography>
                        }
                    </Box>
                </>
            :
                <LoadingCircle />
            }
        </Box>
    )
}
