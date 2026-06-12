import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface HomeSummaryProps {
    title : string,
    total: number,
    color: string,
    icon: any
}

export const HomeSummary : React.FC<HomeSummaryProps> = ({
    title,
    total,
    icon,
    color,
}) => {
    return (
        <Card
            component={Stack}
            spacing={3}
            direction="row"
            sx={{
                px: 3,
                py: 5,
                borderRadius: 2,
            }}
        >
            <Box sx={{ width: 64, height: 64, color: color }}>
                {icon}
            </Box>

            <Stack spacing={0.5}>
                <Typography variant="h4">{total}</Typography>

                <Typography variant="subtitle2" sx={{ color: "text.disabled" }}>
                    {title}
                </Typography>
            </Stack>
        </Card>
    );
}