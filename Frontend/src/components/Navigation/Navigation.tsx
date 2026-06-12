import {
    alpha,
    Badge,
    Box,
    ButtonBase,
    Drawer,
    ListItemButton,
    Stack,
} from "@mui/material";
import { useResponsive } from "../../hooks/use-responsive";
import { Config } from "../../config";
import Scrollbar from "../Scrollbar/scrollbar";
import { NavLink, useLocation } from "react-router-dom";
import navConfig from "./Config-Navigation";
import { useEffect } from "react";
import { services } from "../../services/services";
import { useAuth } from "../../context/AuthContext";
import { useUnreadMessagesCount } from "../../context/UnreadMessagesContext";
import { Account } from "./Account";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

type NavigationProps = {
    openNav?: boolean;
    onCloseNav?: () => void;
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

type PullerProps = {
    open: boolean;
    onClick: () => void;
};

const Puller = ({ open, onClick }: PullerProps) => {
    return (
        <ButtonBase
            type="button"
            aria-label={open ? "Collapse navigation" : "Expand navigation"}
            sx={{
                position: "fixed",
                left: open ? `calc(${Config.LAYOUT.NAV.WIDTH}px)` : 0,
                height: "100%",
                width: "20px",
                zIndex: 1201,
                borderRadius: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: (theme) => theme.palette.background.paper,
                transition: (theme) =>
                    theme.transitions.create(["left", "background-color"], {
                        duration: open
                            ? theme.transitions.duration.enteringScreen
                            : theme.transitions.duration.leavingScreen,
                        easing: theme.transitions.easing.sharp,
                    }),
                "&:hover": {
                    backgroundColor: (theme) =>
                        alpha(theme.palette.primary.main, 0.08),
                },
                "&:active": {
                    backgroundColor: (theme) =>
                        alpha(theme.palette.primary.main, 0.16),
                },
            }}
            onClick={onClick}
        >
            {open ? <ChevronLeft /> : <ChevronRight />}
        </ButtonBase>
    );
};

export default function Navigation({
    openNav,
    onCloseNav,
    open,
    onOpenChange,
}: NavigationProps) {
    const upLg = useResponsive("up", "lg", null);
    const { accessToken, logout } = useAuth();
    const { unreadMessagesCount, setUnreadMessagesCount } = useUnreadMessagesCount();

    const fetchData = async () => {
        try {
            const data = await services.MessagesService.GetUnreadMessagesCount(
                accessToken
            );
            setUnreadMessagesCount(data);
        } catch (e) {
            logout();
        }
    };

    useEffect(() => {
        fetchData();
    }, [accessToken]);

    const renderMenu = (
        <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
            {navConfig.map((item) => {
                {
                    item.path == "/messages"
                        ? (item.badgeContent = unreadMessagesCount)
                        : null;
                }
                return <NavItem key={item.localeKey} item={item} />;
            })}
        </Stack>
    );

    const renderContent = (
        <Scrollbar
            sx={{
                height: 1,
                "& .simplebar-content": {
                    height: 1,
                    display: "flex",
                    flexDirection: "column",
                },
            }}
        >
            <Account />

            {renderMenu}

            <Box sx={{ flexGrow: 1 }} />
        </Scrollbar>
    );

    return (
        <>
            <Box
                sx={{
                    flexShrink: { lg: 0 },
                    width: { xs: 0, lg: open ? Config.LAYOUT.NAV.WIDTH : 0 },
                    transition: (theme) =>
                        theme.transitions.create("width", {
                            duration: open
                                ? theme.transitions.duration.enteringScreen
                                : theme.transitions.duration.leavingScreen,
                            easing: theme.transitions.easing.sharp,
                        }),
                }}
            >
                {upLg ? (
                    <>
                        <Drawer
                            open={open}
                            onClose={onCloseNav}
                            variant="persistent"
                            PaperProps={{
                                sx: {
                                    width: Config.LAYOUT.NAV.WIDTH,
                                },
                            }}
                        >
                            {renderContent}
                        </Drawer>
                        <Puller
                            open={open}
                            onClick={() => onOpenChange(!open)}
                        />
                    </>
                ) : (
                    <Drawer
                        open={openNav}
                        onClose={onCloseNav}
                        PaperProps={{
                            sx: {
                                width: Config.LAYOUT.NAV.WIDTH,
                            },
                        }}
                    >
                        {renderContent}
                    </Drawer>
                )}
            </Box>
        </>
    );
}

function NavItem({ item }: any) {
    const { t } = useTranslation();
    const { pathname } = useLocation();

    const active = item.path === pathname;

    return (
        <ListItemButton
            component={NavLink}
            to={item.path}
            sx={{
                minHeight: 44,
                borderRadius: 0.75,
                typography: "body2",
                color: "text.secondary",
                textTransform: "capitalize",
                fontWeight: "fontWeightMedium",
                ...(active && {
                    color: "primary.main",
                    fontWeight: "fontWeightSemiBold",
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                    "&:hover": {
                        bgcolor: (theme) =>
                            alpha(theme.palette.primary.main, 0.16),
                    },
                }),
            }}
        >
            <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
                {item.badgeContent ? (
                    <Badge badgeContent={item.badgeContent} color="error">
                        {item.icon}
                    </Badge>
                ) : (
                    item.icon
                )}
            </Box>

            <Box component="span">{t(`navigation:${item.localeKey}`)} </Box>
        </ListItemButton>
    );
}
