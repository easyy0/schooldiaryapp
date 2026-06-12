import { Box, IconButton, MenuList, Popover } from '@mui/material';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';
import { useState } from 'react';
import { GB, PL } from 'country-flag-icons/react/3x2'
import { useTranslation } from "react-i18next"

const languages: Record<string, {
    label: string,
    icon: React.ReactNode
}> = {
    en: {
        label: "English",
        icon: <GB style={{ borderRadius: 5.5}} />
    },
    pl: {
        label: "Polski",
        icon: <PL style={{ border: '1x solid black', borderRadius: 5.5}} />
    },
};

export const Language : React.FC = () => {
    const { i18n } = useTranslation();

    const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);

    const handleChangeLang = (newLang: string) => {
        i18n.changeLanguage(newLang);
    }

    const handleOpenPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
        setOpenPopover(event.currentTarget);
    };

    const handleClosePopover = () => {
        setOpenPopover(null);
    };

    const renderedFlag = (key: string, size?: number) => (
        <Box
            sx={{
                width: size || 48,
                height: size || 48,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {languages[key] ? languages[key].icon : "N/A"}
        </Box>
    )

    return (
        <>
            <IconButton
                onClick={handleOpenPopover}
                className="w-12 h-12"
            >
                {renderedFlag(i18n.language)}
            </IconButton>

            <Popover
                open={!!openPopover}
                anchorEl={openPopover}
                onClose={handleClosePopover}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <MenuList
                    disablePadding
                    sx={{
                        p: 0.5,
                        gap: 0.5,
                        width: 160,
                        display: 'flex',
                        flexDirection: 'column',
                        [`& .${menuItemClasses.root}`]: {
                            px: 1,
                            gap: 2,
                            borderRadius: 0.75,
                            [`&.${menuItemClasses.selected}`]: {
                                bgcolor: 'action.selected',
                                fontWeight: 'fontWeightSemiBold',
                            },
                        },
                    }}
                >
                {i18n.options.resources ? (
                    Object.entries(i18n.options.resources).map(([lang]) => (
                        <MenuItem
                            key={lang}
                            selected={lang === i18n.language}
                            onClick={() => handleChangeLang(lang)}
                        >
                            {renderedFlag(lang, 25)}
                            {languages[lang].label}
                        </MenuItem>
                    ))
                ) : (
                    <div>No available languages</div>
                )}
                </MenuList>
            </Popover>
        </>
    );
} 
