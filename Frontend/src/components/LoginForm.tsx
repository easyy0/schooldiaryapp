import { VisibilityOff, Visibility } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Card, Stack, Typography, Divider, TextField, InputAdornment, IconButton, useTheme } from "@mui/material";
import { services } from "../services/services";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { CustomizedDialog } from "./Dialog/CustomDialog";
import { bgGradient } from "../theme/css";
import { useTranslation } from "react-i18next";
import { Language } from "./Header/Language";

export const LoginForm : React.FC = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const { t } = useTranslation();

    const { accessToken, setAccessToken } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [wrongPassword, setWrongPassword] = useState(false);

    const [ loading, setLoading ] = useState(false);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onLoginFailed = () => {
        setWrongPassword(true);
        setLoading(false);
    }

    const onLoginPressed = (event?: React.FormEvent) => {
        if (event) event.preventDefault();

        setWrongPassword(false);
        setLoading(true);

        services.LoginService(
            username,
            password,
            accessToken
        ).then((data: any) => {
            setAccessToken(data.accessToken);
            navigate("/");
        }).catch(onLoginFailed);
    }

    return (
        <Box
            sx={{
                ...bgGradient({
                    startColor: theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[800],
                    endColor: theme.palette.mode === "light" ? theme.palette.grey[200] : theme.palette.grey[900],
                })
            }}
            className="
                w-screen
                h-screen
                flex
                items-center
                justify-center
            "
        >
            <div style={{ position: 'absolute', top: 10, right: 10}}>
                <Language/>
            </div>
            

            <Card className="w-full max-w-420">
                <form onSubmit={onLoginPressed}>
                    <Stack className="p-10" spacing={3}>
                        <Typography variant="h4">
                            {t("login:HEADER")}
                        </Typography>

                        <Typography variant="body2">
                            {t("login:NO_ACCOUNT")}
                            <CustomizedDialog
                                linkText={t("login:GET_ACCOUNT")}
                                dialogContent={t("login:GET_ACCOUNT_INFORMATION")}
                            />
                        </Typography>

                        <Divider sx={{ my: 3 }}>
                            <Typography
                                variant="body2"
                                sx={{ color: "text.secondary" }}
                            >
                                {t("global:OR").toUpperCase()}
                            </Typography>
                        </Divider>

                        <TextField
                            required
                            name="username"
                            label={t("global:USERNAME")}
                            value={username}
                            spellCheck={false}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <TextField
                            required
                            name="password"
                            label={t("global:PASSWORD")}
                            type={showPassword ? "text" : "password"}
                            value={password}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => {
                                                setShowPassword(
                                                    (previousBool) => !previousBool
                                                );
                                            }}
                                            edge="end"
                                        >
                                            {showPassword ? (<VisibilityOff />) : (<Visibility />)}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        
                        <CustomizedDialog
                            linkText={t("login:FORGOT_PASSWORD")}
                            dialogContent={t("login:RESET_PASSWORD")}
                        />

                        {wrongPassword ? (
                            <Typography
                                className="self-center"
                                variant="body2"
                                color="error"
                            >
                                {t("login:INVALID_CREDENTIALS")}
                            </Typography>
                        ) : null}

                        <LoadingButton
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            color="inherit"
                            loading={loading}
                        >
                            {t("login:LOGIN")}
                        </LoadingButton>
                    </Stack>
                </form>
            </Card>
        </Box>
    );
}