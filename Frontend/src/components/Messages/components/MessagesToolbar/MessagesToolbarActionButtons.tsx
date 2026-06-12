import { Check, ArchiveOutlined, DeleteOutline } from "@mui/icons-material";
import { Box, Tooltip, IconButton } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

interface MessagesToolbarActionButtonsProps {
    handleUpdateMessage: (method: string, messagesIds?: number[]) => void
}

export const MessagesToolbarActionButtons : React.FC<MessagesToolbarActionButtonsProps> = ({
    handleUpdateMessage
}) => {
    const { t } = useTranslation();
    
    const handleOnMarkAsRead = () => {
        handleUpdateMessage("READ");
    }

    const handleOnArchive = () => {
        handleUpdateMessage("ARCHIVE");
    }

    const handleOnDelete = () => {
        handleUpdateMessage("DELETE");
    }

    return (
        <>
            <Box>
                <Tooltip title={t("messages:MARK_AS_READ")}>
                    <IconButton onClick={handleOnMarkAsRead}>
                        <Check />
                    </IconButton>
                </Tooltip>

                <Tooltip title={t("messages:ARCHIVE")}>
                    <IconButton onClick={handleOnArchive}>
                        <ArchiveOutlined />
                    </IconButton>
                </Tooltip>

                <Tooltip title={t("messages:DELETE")}>
                    <IconButton onClick={handleOnDelete}>
                        <DeleteOutline />
                    </IconButton>
                </Tooltip>

            </Box>
        </>
    )
}