import { ChangeEvent, useState } from "react";
import { FilterList, Search } from "@mui/icons-material";
import { Box, Card, IconButton, InputAdornment, OutlinedInput, styled, Toolbar, Tooltip, Typography } from "@mui/material"
import { MessagesToolbarFilterMenu } from "./MessagesToolbarFilterMenu";
import { MessagesToolbarActionButtons } from "./MessagesToolbarActionButtons";
import { MESSAGES_FILTERS } from "../../../../constants/MessagesFilters";
import { useTranslation } from "react-i18next";

// ----------------------------ANIMATION---------------------------------

const AnimatedOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
    width: "15%",
    transition: "width 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
        width: "25%",
    },
    "&.focused": {
        width: "90%",
        boxShadow: theme.shadows[4],
    },
}));

// ----------------------------------------------------------------------

interface MessagesToolbarProps {
    selectedMessagesCount: number,
    filterName: string,
    searchQuery: string,
    setSearchQuery: (searchQuery: string) => void,
    setFilterName: (filterName: string) => void,
    handleUpdateMessage: (method: string, messagesIds?: number[]) => void
}

export const MessagesToolbar : React.FC<MessagesToolbarProps> = ({
    selectedMessagesCount,
    filterName,
    searchQuery,
    setSearchQuery,
    setFilterName,
    handleUpdateMessage
}) => {
    const { t } = useTranslation();
    const [ focused, setFocused ] = useState<boolean>(false);

    const [ filtersMenuVisible, setFiltersMenuVisible ] = useState<boolean>(false);
    const [ filtersMenuAnchorEl, setFiltersMenuAnchorEl ] = useState<HTMLElement | null>(null);

    const handleOnFocusStart = () => setFocused(true);
    const handleOnFocusEnd = () => setFocused(false);

    const handleOpenFilterMenu = (event: React.MouseEvent<HTMLButtonElement>) => { event.stopPropagation(); setFiltersMenuVisible(true); setFiltersMenuAnchorEl(event.currentTarget); }
    const handleCloseFilterMenu = () => { setFiltersMenuVisible(false); setFiltersMenuAnchorEl(null); }

    const handleSearchQueryChanged = (event: ChangeEvent<HTMLInputElement>) => setSearchQuery(event.target.value as string);

    return (
        <Toolbar
            sx={{
                height: 96,
                display: "flex",
                justifyContent: "space-between",
                p: (theme) => theme.spacing(0, 1, 0, 3),
                ...(selectedMessagesCount > 0 && {
                    color: "text.primary",
                    bgcolor: "action.selected",
                }),
            }}
        >
            {selectedMessagesCount > 0 ? (
                <Typography component="div" variant="subtitle1">
                    {selectedMessagesCount} {t("messages:SELECTED").toLowerCase()}
                </Typography>
            ) : (
                <Box sx={{ flexGrow: 1 }}>
                    <AnimatedOutlinedInput
                        value={searchQuery}
                        placeholder={t("global:SEARCH_PLACEHOLDER")}
                        className={focused ? "focused" : ""}
                        onChange={handleSearchQueryChanged}
                        onFocus={handleOnFocusStart}
                        onBlur={handleOnFocusEnd}
                        startAdornment={
                            <InputAdornment position="start" sx={{ pointerEvents: 'none' }}>
                                <Search />
                            </InputAdornment>
                        }
                    />
                </Box>
            )}

            {selectedMessagesCount > 0 ? (
                <MessagesToolbarActionButtons handleUpdateMessage={handleUpdateMessage} />
            ) : (
                <Card
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        pl: 2,
                        pr: 1,
                        py: 1,
                    }}
                >
                    <Typography sx={{ alignSelf: "center", mr: 1 }}>
                        {t(`messages:${MESSAGES_FILTERS[filterName].localeKey}`)}
                    </Typography>
                    {MESSAGES_FILTERS[filterName].icon}
                    <Tooltip title={t("global:FILTER")}>
                        <IconButton
                            onClick={handleOpenFilterMenu}
                        >
                            <FilterList />
                        </IconButton>
                    </Tooltip>
                </Card>
            )}

            <MessagesToolbarFilterMenu
                filterName={filterName}
                filtersMenuAnchorEl={filtersMenuAnchorEl}
                filtersMenuVisible={filtersMenuVisible}
                setFilterName={setFilterName}
                handleCloseFilterMenu={handleCloseFilterMenu}
            />
        </Toolbar>
    )
}