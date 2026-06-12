import { Theme } from "@mui/material";
import { alpha } from "@mui/material/styles";

export function overrides(theme: Theme) {
    const isDark = theme.palette.mode === "dark";

    return {
        MuiCssBaseline: {
            styleOverrides: {
                "*": {
                    boxSizing: "border-box",
                },
                html: {
                    margin: 0,
                    padding: 0,
                    width: "100%",
                    height: "100%",
                    WebkitOverflowScrolling: "touch" as const,
                },
                body: {
                    margin: 0,
                    padding: 0,
                    width: "100%",
                    height: "100%",
                },
                "#root": {
                    width: "100%",
                    height: "100%",
                },
                input: {
                    "&[type=number]": {
                        MozAppearance: "textfield" as const,
                        "&::-webkit-outer-spin-button": {
                            margin: 0,
                            WebkitAppearance: "none" as const,
                        },
                        "&::-webkit-inner-spin-button": {
                            margin: 0,
                            WebkitAppearance: "none" as const,
                        },
                    },
                },
                img: {
                    maxWidth: "100%" as const,
                    display: "inline-block" as const,
                    verticalAlign: "bottom" as const,
                },
            },
        },
        MuiBackdrop: {
            styleOverrides: {
                root: {
                    backgroundColor: alpha(theme.palette.grey[900], 0.8),
                },
                invisible: {
                    background: "transparent" as const,
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: theme.shape.borderRadius,
                    fontWeight: 700,
                    textTransform: "none" as const,
                },
                textInherit: {
                    color: theme.palette.text.secondary,
                    "&:hover": {
                        color: theme.palette.text.primary,
                        backgroundColor: theme.palette.action.hover,
                    },
                },
                containedInherit: {
                    color: theme.palette.common.white,
                    backgroundColor: theme.palette.grey[800],
                    boxShadow: theme.customShadows.z8,
                    "&:hover": {
                        color: theme.palette.common.white,
                        backgroundColor: isDark ? theme.palette.grey[700] : theme.palette.grey[700],
                        boxShadow: theme.customShadows.z12,
                    },
                },
                containedPrimary: {
                    boxShadow: theme.customShadows.primary,
                    "&:hover": {
                        backgroundColor: theme.palette.primary.dark,
                        boxShadow: theme.customShadows.z12,
                    },
                },
                sizeLarge: {
                    minHeight: 48,
                },
            },
        },
        MuiToggleButton: {
            styleOverrides: {
                root: {
                    borderRadius: theme.shape.borderRadius,
                    fontWeight: 700,
                    textTransform: "none" as const,
                    borderColor: alpha(theme.palette.grey[500], isDark ? 0.22 : 0.18),
                    color: theme.palette.text.secondary,
                    "&:hover": {
                        color: theme.palette.text.primary,
                        backgroundColor: theme.palette.action.hover,
                    },
                    "&.Mui-selected": {
                        color: theme.palette.primary.main,
                        backgroundColor: alpha(theme.palette.primary.main, isDark ? 0.18 : 0.1),
                        borderColor: alpha(theme.palette.primary.main, isDark ? 0.56 : 0.32),
                        "&:hover": {
                            backgroundColor: alpha(theme.palette.primary.main, isDark ? 0.26 : 0.16),
                        },
                    },
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    border: 'none',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: theme.customShadows.card,
                    backgroundImage: "none",
                    border: isDark ? `1px solid ${alpha(theme.palette.grey[500], 0.12)}` : "none",
                    borderRadius: Number(theme.shape.borderRadius) * 2,
                    position: "relative" as const,
                    zIndex: 0, // Fix Safari overflow: hidden with border radius
                },
            },
        },
        MuiCardHeader: {
            defaultProps: {
                titleTypographyProps: { variant: "h6" as const },
                subheaderTypographyProps: { variant: "body2" as const },
            },
            styleOverrides: {
                root: {
                    padding: theme.spacing(3, 3, 0),
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    "input:autofill": {
                        boxShadow: `0 0 0px 1000px ${theme.palette.background.paper} inset`,
                        WebkitBoxShadow: `0 0 0px 1000px ${theme.palette.background.paper} inset`,
                        WebkitTextFillColor: theme.palette.common.white,
                    },
                    "input:-internal-autofill-selected": {
                        WebkitTextFillColor: '#fff'
                    },
                },
            },
        },
        MuiPaper: {
            defaultProps: {
                elevation: 0,
            },
            styleOverrides: {
                root: {
                    backgroundImage: "none",
                    ...(isDark && {
                        borderColor: alpha(theme.palette.grey[500], 0.12),
                    }),
                },
                elevation1: {
                    boxShadow: theme.customShadows.z1,
                },
                elevation3: {
                    boxShadow: theme.customShadows.card,
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    backgroundImage: "none",
                    overflow: "hidden",
                    borderRadius: Number(theme.shape.borderRadius) * 2,
                    boxShadow: theme.customShadows.dialog,
                    border: `1px solid ${alpha(theme.palette.grey[500], isDark ? 0.16 : 0.12)}`,
                    ...(isDark && {
                        backgroundColor: theme.palette.grey[800],
                    }),
                },
            },
        },
        MuiDialogTitle: {
            styleOverrides: {
                root: {
                    minHeight: 72,
                    padding: theme.spacing(2, 3),
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: theme.palette.background.paper,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                },
            },
        },
        MuiDialogContent: {
            styleOverrides: {
                root: {
                    overflowY: "auto" as const,
                    overflowX: "hidden" as const,
                    padding: theme.spacing(3),
                    borderColor: theme.palette.divider,
                    backgroundColor: isDark
                        ? alpha(theme.palette.grey[900], 0.18)
                        : alpha(theme.palette.grey[100], 0.56),
                    scrollbarWidth: "thin" as const,
                    scrollbarColor: `${theme.palette.action.selected} transparent`,
                    "&::-webkit-scrollbar": {
                        width: 8,
                    },
                    "&::-webkit-scrollbar-track": {
                        backgroundColor: "transparent",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: theme.palette.action.selected,
                        borderRadius: 8,
                        border: "2px solid transparent",
                        backgroundClip: "content-box" as const,
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                        backgroundColor: theme.palette.action.active,
                    },
                },
            },
        },
        MuiDialogActions: {
            styleOverrides: {
                root: {
                    minHeight: 72,
                    padding: theme.spacing(2, 3),
                    gap: theme.spacing(1),
                    backgroundColor: theme.palette.background.paper,
                    borderTop: `1px solid ${theme.palette.divider}`,
                },
            },
        },
        MuiAutocomplete: {
            styleOverrides: {
                paper: {
                    marginTop: theme.spacing(0.75),
                    borderRadius: Number(theme.shape.borderRadius) * 1.25,
                    backgroundImage: "none",
                    backgroundColor: theme.palette.background.paper,
                    border: `1px solid ${alpha(theme.palette.grey[500], isDark ? 0.22 : 0.16)}`,
                    boxShadow: theme.customShadows.dropdown,
                    overflow: "hidden",
                },
                listbox: {
                    padding: theme.spacing(0.75),
                },
                option: {
                    borderRadius: theme.shape.borderRadius,
                    minHeight: 38,
                    marginBottom: theme.spacing(0.25),
                    '&[aria-selected="true"]': {
                        backgroundColor: alpha(theme.palette.primary.main, isDark ? 0.22 : 0.12),
                    },
                    "&.Mui-focused": {
                        backgroundColor: theme.palette.action.hover,
                    },
                    '&[aria-selected="true"].Mui-focused': {
                        backgroundColor: alpha(theme.palette.primary.main, isDark ? 0.3 : 0.18),
                    },
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                head: {
                    color: theme.palette.text.secondary,
                    backgroundColor: theme.palette.background.default,
                },
            },
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    backgroundColor: theme.palette.grey[800],
                },
                arrow: {
                    color: theme.palette.grey[800],
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                paragraph: {
                    marginBottom: theme.spacing(2),
                },
                gutterBottom: {
                    marginBottom: theme.spacing(1),
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    ...theme.typography.body2,
                },
            },
        },
        MuiAvatar: {
            styleOverrides: {
                root: {
                    fontWeight: '600',
                }
            }
        }
    };
}
