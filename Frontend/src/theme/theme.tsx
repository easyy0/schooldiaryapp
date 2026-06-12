import { createContext, useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";

import CssBaseline from "@mui/material/CssBaseline";
import {
    createTheme,
    ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";

import { palette } from "./palette";
import { getShadows } from "./shadows";
import { overrides } from "./overrides";
import { typography } from "./typography";
import { customShadows } from "./custom-shadows";
import { ThemeOptions } from "@mui/material/styles";

interface ThemeContextProps {
    mode: "light" | "dark";
    setMode: (mode: "light" | "dark") => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

interface ThemeProviderProps {
    children: React.ReactNode;
}

const getInitialMode = (): 'light' | 'dark' => {
    return (localStorage.getItem('themeMode') as 'light' | 'dark') || 'light';
};

export default function ThemeProvider({ children }: ThemeProviderProps) {
    const [mode, setMode] = useState<'light' | 'dark'>(getInitialMode);

    useEffect(() => {
        localStorage.setItem('themeMode', mode);
    }, [mode]);

    const memoizedValue = useMemo<ThemeOptions>(
        () => ({
            palette: palette(mode),
            typography,
            shadows: getShadows(mode),
            customShadows: customShadows(mode),
            shape: { borderRadius: 8 },
        }),
        [mode]
    );

    const theme = createTheme(memoizedValue);

    theme.components = overrides(theme);

    return (
        <ThemeContext.Provider value={{ mode, setMode }}>
            <MUIThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MUIThemeProvider>
        </ThemeContext.Provider>
    );
}

export function useThemeMode() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useThemeMode must be used within a ThemeProvider");
    }
    return context;
}

ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
