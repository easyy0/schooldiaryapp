import { Box, CircularProgress, SxProps, Theme } from "@mui/material";

export const LoadingCircle : React.FC<{sx?: SxProps<Theme>, size?: number}> = ({ sx, size }) => {
    return (
        <Box sx={sx || { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
            <CircularProgress size={size || 20} />
        </Box>
    );
}