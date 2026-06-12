import { Stack, Box, Avatar, Typography, Link } from "@mui/material";
import { fToNow } from "../../utils/format-time";
import { News } from "../../typings/News";

interface AppNewsItemProps {
    news: News
}

export const AppNewsItem : React.FC<AppNewsItemProps> = ({ news }) => {
    const { header, title, description, date } = news;

    return (
        <Stack direction="row" alignItems="center" spacing={2}>
            <Box
                sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }}
            >
                <Avatar
                    sx={{ bgcolor: "text.primary" }}
                    className="w-full h-full rounded-xl"
                >
                    {header}
                </Avatar>
            </Box>

            <Box sx={{ minWidth: 240, flexGrow: 1 }}>
                <Link
                    color="inherit"
                    variant="subtitle2"
                    underline="hover"
                    noWrap
                >
                    {title}
                </Link>

                <Typography
                    variant="body2"
                    sx={{ color: "text.secondary" }}
                    noWrap
                >
                    {description}
                </Typography>
            </Box>

            <Typography
                variant="caption"
                sx={{ pr: 3, flexShrink: 0, color: "text.secondary" }}
            >
                {fToNow(date)}
            </Typography>
        </Stack>
    );
}