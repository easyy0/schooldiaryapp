import { WorkspacePremiumOutlined, AnalyticsOutlined } from "@mui/icons-material"
import { Grid } from "@mui/material"
import { HomeSummary } from "./HomeSummary"
import { useTranslation } from "react-i18next";

export const HomeSummaryGrid : React.FC = () => {
    const { t } = useTranslation();

    return (
        <>
            <Grid
                container
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4"
            >
                <Grid className="col-span-1">
                    <HomeSummary
                        title={t("global:MARKS_REACHED")}
                        total={0}
                        color="success"
                        icon={
                            <WorkspacePremiumOutlined
                                sx={{ color: "primary.dark" }}
                                className="w-fit h-fit"
                            />
                        }
                    />
                </Grid>

                <Grid className="col-span-1">
                    <HomeSummary
                        title={t("global:MARKS_AVERAGE")}
                        total={0.0}
                        color="error"
                        icon={
                            <AnalyticsOutlined
                                sx={{ color: "warning.dark" }}
                                className="w-fit h-fit"
                            />
                        }
                    />
                </Grid>
            </Grid>
        </>
    )
}
