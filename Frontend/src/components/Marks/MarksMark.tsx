import { ButtonBase } from "@mui/material";
import { alpha, Theme } from "@mui/material/styles";

interface MarksMarkProps {
    value: number | string;
    weight?: number;
    onButtonSelected?: (value: number | string) => void;
    selected?: boolean;
}

const getWeightPalette = (theme: Theme, weight = 1, selected: boolean) => {
    const normalizedWeight = Math.max(0, Math.min(weight, 5));
    const isDark = theme.palette.mode === "dark";
    const colors = {
        0: isDark ? theme.palette.grey[700] : theme.palette.grey[500],
        1: isDark ? "#46586B" : "#607D94",
        2: isDark ? "#1F5E9E" : "#1976D2",
        3: isDark ? "#284BBA" : "#3F51B5",
        4: isDark ? "#5637B8" : "#673AB7",
        5: isDark ? "#732CBA" : "#7B1FA2",
    };
    const baseColor = colors[normalizedWeight as keyof typeof colors];
    const hoverColor = isDark
        ? alpha(baseColor, 0.86)
        : alpha(baseColor, 0.9);

    return {
        backgroundColor: baseColor,
        color: theme.palette.common.white,
        hoverBackgroundColor: hoverColor,
        boxShadow: selected
            ? `0 0 0 2px ${alpha(theme.palette.common.white, isDark ? 0.18 : 0.34)}`
            : theme.customShadows.z1,
    };
};

export const MarksMark: React.FC<MarksMarkProps> = ({
    value,
    weight = 1,
    onButtonSelected,
    selected = false,
}) => {
    return (
        <ButtonBase
            type="button"
            onClick={() => onButtonSelected?.(value)}
            sx={(theme) => {
                const palette = getWeightPalette(theme, weight, selected);

                return {
                    display: "flex",
                    justifySelf: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    width: 28,
                    height: 28,
                    borderRadius: 0.75,
                    bgcolor: palette.backgroundColor,
                    color: palette.color,
                    fontWeight: 700,
                    fontSize: "0.8rem",
                    lineHeight: 1,
                    boxShadow: palette.boxShadow,
                    transition: theme.transitions.create(
                        ["background-color", "box-shadow", "transform"],
                        { duration: theme.transitions.duration.shorter },
                    ),
                    "&:hover": {
                        bgcolor: palette.hoverBackgroundColor,
                        transform: "translateY(-1px)",
                    },
                };
            }}
        >
            {value}
        </ButtonBase>
    );
};
