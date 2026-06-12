import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import CardHeader from "@mui/material/CardHeader";
import { News } from "../../typings/News";
import { AppNewsItem } from "./AppNewsItem";
import { LoadingCircle } from "../LoadingCircle/LoadingCircle";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface AppNewsProps {
    title: string,
    list: News[] | null
}

export const AppNews : React.FC<AppNewsProps> = ({
    title,
    list,
}) => {
    const { t } = useTranslation();

    return (
        <Card className="h-fit">
            <CardHeader title={title} />

            {list
                ?
                    <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
                        {list.length > 0 ?
                            (list.map((news: News) => (
                                <AppNewsItem key={news.id} news={news} />
                            )))
                        :
                            <Box sx={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%)', display: 'flex', flexDirection: 'column', gap: 1 }}>
                                <Typography>{t("home:NO_NEWS")}</Typography>
                            </Box>
                        }
                    </Stack>
                :
                    <Stack spacing={3} sx={{ p: 5 }}>
                        <LoadingCircle size={30} />
                    </Stack>
            }
            
        </Card>
    );
}