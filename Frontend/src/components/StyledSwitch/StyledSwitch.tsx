import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const SwitchContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 30,
    padding: 4,
    width: 220,
    height: 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: `inset 0 2px 5px rgba(0,0,0,0.15)`,
    position: "relative",
    cursor: "pointer",
}));

const ActiveBg = styled(Box)(({ theme }) => ({
    position: "absolute",
    top: 4,
    bottom: 4,
    width: "50%",
    borderRadius: 30,
    backgroundColor: theme.palette.primary.main,
    transition: "all 0.3s ease",
    zIndex: 1,
}));

const Label = styled(Typography)(() => ({
    flex: 1,
    textAlign: "center",
    fontWeight: 600,
    fontSize: "0.9rem",
    zIndex: 2,
    transition: "color 0.3s ease",
}));

interface StyledSwitchProps {
    semester: number;
    setSemester: (semester: number) => void;
}

export const StyledSwitch : React.FC<StyledSwitchProps> = ({
    semester,
    setSemester
}) => {
  

  return (
    <SwitchContainer onClick={() => setSemester(semester === 1 ? 2 : 1)}>
        <ActiveBg
            sx={{
                left: semester === 1 ? 4 : "calc(50% - 4px)",
            }}
        />
        <Label
            sx={{
                color: semester === 1 ? "#fff" : "text.secondary",
            }}
        >
            Semestr 1
        </Label>
        <Label
            sx={{
                color: semester === 2 ? "#fff" : "text.secondary",
            }}
        >
            Semestr 2
        </Label>
    </SwitchContainer>
  );
}
