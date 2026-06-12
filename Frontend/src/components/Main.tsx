import Box, { BoxProps } from "@mui/material/Box";
import { useResponsive } from "../hooks/use-responsive";
import { Config } from "../config";
import React, { ReactNode } from "react";
import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";

const SPACING = 8;

interface MainProps extends BoxProps {
    children: ReactNode;
    sx: SxProps<Theme>;
}

export const Main : React.FC<MainProps> = ({
    children,
    sx,
    ...other
}) => {
    const lgUp = useResponsive("up", "lg", null);

    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                minHeight: 1,
                display: "flex",
                flexDirection: "column",
                py: `${Config.LAYOUT.HEADER.H_MOBILE + SPACING}px`,
                ...(lgUp && {
                    px: 2,
                    py: `${Config.LAYOUT.HEADER.H_DESKTOP + SPACING}px`,
                    width: `calc(100% - ${Config.LAYOUT.NAV.WIDTH}px)`,
                }),
                ...sx,
            }}
            {...other}
        >
            {children}
        </Box>
    );
}