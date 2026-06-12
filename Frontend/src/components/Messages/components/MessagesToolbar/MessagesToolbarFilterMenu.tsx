import { Menu, MenuItem } from "@mui/material"
import { MESSAGES_FILTERS } from "../../../../constants/MessagesFilters";
import { useTranslation } from "react-i18next";

interface MessagesToolbarFilterMenuProps {
    filterName: string,
    filtersMenuAnchorEl: HTMLElement | null,
    filtersMenuVisible: boolean,
    setFilterName: (filterName: string) => void,
    handleCloseFilterMenu: () => void
}

export const MessagesToolbarFilterMenu : React.FC<MessagesToolbarFilterMenuProps> = ({
    filterName,
    filtersMenuAnchorEl,
    filtersMenuVisible,
    setFilterName,
    handleCloseFilterMenu
}) => {
    const { t } = useTranslation();
    const getMenuItemStyle = (filter: string) => ({ pr: 8, backgroundColor: filterName === filter ? "rgba(0, 0, 0, 0.1)" : "transparent" });

    return (
        <Menu
            anchorEl={filtersMenuAnchorEl}
            open={filtersMenuVisible}
            onClose={handleCloseFilterMenu}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
            {Object.entries(MESSAGES_FILTERS).map(([localFilterName, localFilterValue]) => {
                return (
                    <MenuItem
                        key={localFilterName}
                        onClick={() => setFilterName(localFilterName)}
                        sx={getMenuItemStyle(localFilterName)}
                    >
                        {localFilterValue.icon}
                        {t(`messages:${localFilterValue.localeKey}`)}
                    </MenuItem>
                )
            })}
        </Menu>
    )
}