import { Container, Typography, Grid } from "@mui/material";
import { AppNews } from "./AppNews";
import { useAuth } from "../../context/AuthContext";
import { services } from "../../services/services";
import React, { useEffect, useState } from "react";
import { News } from "../../typings/News";
import { useTranslation } from "react-i18next";

export const HomeComponent : React.FC = () => {
    const { t } = useTranslation();
    const { accessToken, logout } = useAuth();
    
    const [appNewsUpdateList, setAppNewsUpdateList] = useState<News[] | null>(null);

    const fetchData = async () => {
        try {
            const data = await services.HomeService(accessToken);
            const formattedList = Array.from(data).map((val: News) => ({
                id: val.id,
                header: val.header,
                title: val.title,
                description: val.description,
                user: val.user,
                date: val.date
            }));
            setAppNewsUpdateList(formattedList);
        } catch (e) {
            logout();
        }
    };

    useEffect(() => {
        fetchData();
    }, [accessToken]);

    return (
        <>
            <Container className="pt-20" maxWidth={false} sx={{ px: { xs: 2, sm: 3, lg: 5 } }}>
                <Typography variant="h4" sx={{ mb: 5 }}>
                    {t("home:HEADER")}
                </Typography>

                {/* <HomeSummaryGrid /> */}

                <Grid className="mt-6" xs={12} md={6} lg={8}>
                    <AppNews
                        title={t("global:NEWS")}
                        list={appNewsUpdateList}
                    />
                </Grid>
            </Container>
        </>
    );
}

export default HomeComponent;
