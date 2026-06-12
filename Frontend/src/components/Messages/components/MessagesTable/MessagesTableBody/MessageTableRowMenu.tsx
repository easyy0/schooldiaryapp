import { Check, ArchiveOutlined, DeleteOutline } from "@mui/icons-material";
import { Menu, MenuItem } from "@mui/material";
import { Message, MessageStatus } from "../../../../../typings/Message";
import { useTranslation } from "react-i18next";

interface MessageTableRowMenuProps {
    message: Message,
    anchorEl: HTMLElement | null,
    visibility: boolean,
    status: MessageStatus,
    handleCloseMenu: () => void,
    handleUpdateMessage: (method: string, messagesIds?: number[]) => void
}

export const MessageTableRowMenu : React.FC<MessageTableRowMenuProps> = ({
    message,
    anchorEl,
    visibility,
    status,
    handleCloseMenu,
    handleUpdateMessage
}) => {
    const { t } = useTranslation();

    return (
        <>
            <Menu
                anchorEl={anchorEl}
                open={visibility}
                onClose={handleCloseMenu}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                PaperProps={{
                    sx: { minWidth: 170 },
                }}
            >
                {status === MessageStatus.UNREAD ? (
                    <MenuItem
                        onMouseDown={() => {
                            handleUpdateMessage("READ", [message.id]);
                            handleCloseMenu();
                        }}
                    >
                        <Check sx={{ mr: 0.5 }} />
                        {t("messages:MARK_AS_READ")}
                    </MenuItem>
                ) : (
                    ``
                )}

                <MenuItem
                    onMouseDown={() => {
                        handleUpdateMessage("ARCHIVE", [message.id]);
                        handleCloseMenu();
                    }}
                >
                    <ArchiveOutlined sx={{ mr: 0.5 }} />
                    {message.archived ? t("messages:UNARCHIVE") : t("messages:ARCHIVE")}
                </MenuItem>

                <MenuItem
                    onMouseDown={() => {
                        handleUpdateMessage("DELETE", [message.id]);
                        handleCloseMenu();
                    }}
                >
                    <DeleteOutline sx={{ mr: 0.5 }} />
                    {t("messages:DELETE")}
                </MenuItem>
            </Menu>
        </>
    )
}