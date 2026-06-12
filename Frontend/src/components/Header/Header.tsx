import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useTheme } from "@mui/material/styles";
import { useResponsive } from "../../hooks/use-responsive";
import { bgBlur } from "../../theme/css";
import { Config } from "../../config";
import { Account } from "./Account";
import { Language } from "./Language";

type HeaderProps = {
    navOpen: boolean;
};

export const Header : React.FC<HeaderProps> = ({ navOpen }) => {
    const theme = useTheme();

    const lgUp = useResponsive("up", "lg", null);
    const desktopNavWidth = navOpen ? Config.LAYOUT.NAV.WIDTH + 1 : 0;

    return (
        <AppBar
            sx={{
                boxShadow: "none",
                height: Config.LAYOUT.HEADER.H_MOBILE,
                zIndex: theme.zIndex.appBar + 1,
                background: 'none',
                ...bgBlur({
                    color: theme.palette.background.default
                }),
                transition: theme.transitions.create(["height"], {
                    duration: theme.transitions.duration.enteringScreen,
                    easing: theme.transitions.easing.sharp,
                }),
                ...(lgUp && {
                    width: `calc(100% - ${desktopNavWidth}px)`,
                    height: Config.LAYOUT.HEADER.H_DESKTOP,
                    ml: `${desktopNavWidth}px`,
                    transition: theme.transitions.create(["height", "margin-left", "width"], {
                        duration: navOpen
                            ? theme.transitions.duration.enteringScreen
                            : theme.transitions.duration.leavingScreen,
                        easing: theme.transitions.easing.sharp,
                    }),
                }),
            }}
        >
            <Toolbar
                sx={{
                    height: 1,
                    px: { lg: 5 },
                }}
            >
                <Box sx={{ flexGrow: 1 }} />

                <Stack direction="row" alignItems="center" spacing={2}>
                    <Language />
                    <Account />
                </Stack>
            </Toolbar>
        </AppBar>
    );
}
