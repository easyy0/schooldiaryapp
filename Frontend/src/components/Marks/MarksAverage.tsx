import { Box } from "@mui/material"

export const MarksAverage: React.FC<{ average: number }> = ({ average }) => {
    return (
        <>
        <Box
            sx={{
                display: 'flex',
                justifySelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                minWidth: 64,
                height: 36,
                borderRadius: 1,
                bgcolor: 'secondary.main',
                color: 'secondary.contrastText',
                fontWeight: 700,
                fontSize: "0.9rem",
                boxShadow: 1,
            }}
        >
                { Number(average).toFixed(2) }
            </Box>
        </>
    )
}
