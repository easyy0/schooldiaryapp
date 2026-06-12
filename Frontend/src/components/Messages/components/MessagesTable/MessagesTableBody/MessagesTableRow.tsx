import { Avatar, Checkbox, IconButton, Stack, TableCell, TableRow, Typography } from "@mui/material";
import React, { useState } from "react";
import { Message, MessageStatus, MessageType } from "../../../../../typings/Message";
import { MessageTableRowSender } from "./MessageTableRowSender";
import { MessageTableRowRecipients } from "./MessageTableRowRecipients";
import { format } from "date-fns";
import { Error, MoreVert } from "@mui/icons-material";
import { MessageTableRowMenu } from "./MessageTableRowMenu";
import { useActiveMessage } from "../../../../../context/ActiveMessageContext";
import { MessagesService } from "../../../../../services/MessagesService";
import { useAuth } from "../../../../../context/AuthContext";
import { useUnreadMessagesCount } from "../../../../../context/UnreadMessagesContext";

interface MessagesTableRowProps {
    selected: boolean;
    message: Message;
    handleSelectMessage: (id: number) => void;
    handleUpdateMessage: (method: string, messagesIds?: number[]) => void;
    handleRefreshMessages: () => void;
}

export const MessagesTableRow : React.FC<MessagesTableRowProps> = ({
    selected,
    message,
    handleSelectMessage,
    handleUpdateMessage,
    handleRefreshMessages
}) => {
    const { openMessage } = useActiveMessage();
    const { setUnreadMessagesCount } = useUnreadMessagesCount();
    const { accessToken, logout } = useAuth();

    const [ menuVisible, setMenuVisible ] = useState<boolean>(false);
    const [ menuAnchorEl, setMenuAnchorEl ] = useState<HTMLElement | null>(null);

    const handleCheckboxMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        handleSelectMessage(message.id);
    };

    const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setMenuVisible(true);
        setMenuAnchorEl(event.currentTarget);
    }

    const handleCloseMenu = () => {
        setMenuVisible(false);
        setMenuAnchorEl(null);
    };

    const handleReadMessage = async () => {
        try {
            const messageData = await MessagesService.ReadMessageAndGetDescription(
                accessToken,
                message.id
            );

            const affectedMessages = messageData[0]

            if (affectedMessages > 0) {
                setUnreadMessagesCount(prev => prev - affectedMessages)
            }

            const updatedMessage = { ...message, description: messageData[1].description };
            openMessage(updatedMessage);
            handleRefreshMessages();
        } catch (e) {
            logout();
        }
    }

    return (
        <>
            <TableRow
                sx={{
                    transition: "background-color 0.3s",
                    cursor: "pointer",
                    "&:hover": {
                        backgroundColor: (theme) => theme.palette.action.hover
                    },
                    "&.Mui-selected": {
                        backgroundColor: (theme) => theme.palette.action.selected,
                        "&:hover": {
                            backgroundColor: (theme) => theme.palette.action.hover,
                        },
                    },
                }}
                tabIndex={-1}
                role="checkbox"
                selected={selected}
                onMouseDown={() => {
                    handleReadMessage();
                }}
            >
                <TableCell padding="checkbox">
                    <Checkbox
                        disableRipple
                        checked={selected}
                        onMouseDown={handleCheckboxMouseDown}
                    />
                </TableCell>

                <TableCell component="th" scope="row" padding="none">
                    <Stack direction="row" alignItems="center" spacing={2}>
                        {message.status === MessageStatus.SENT ?
                            <MessageTableRowRecipients
                                recipients={message.recipients}
                            />
                        : message.status === MessageStatus.UNREAD ?
                                <MessageTableRowSender
                                    sender={message.sender}
                                />
                            :
                                <Avatar>
                                    {message.sender.firstname.charAt(0).toUpperCase()}
                                    {message.sender.lastname.charAt(0).toUpperCase()}
                                </Avatar>
                        }
                        {message.status !== MessageStatus.SENT && (
                            <Typography variant="subtitle2" noWrap>
                                {`${message.sender.firstname} ${message.sender.lastname}`}
                            </Typography>
                        )}
                    </Stack>
                </TableCell>

                <TableCell>{message.title}</TableCell>

                <TableCell>{message.type === MessageType.IMPORTANT ? <Error /> : null}</TableCell>

                <TableCell align="center">
                    {format(message.date, "yyyy-MM-dd")}
                    <Typography>{format(message.date, "HH:mm")}</Typography>
                </TableCell>

                <TableCell align="right">
                    <IconButton
                        onMouseDown={handleOpenMenu}
                    >
                        <MoreVert />
                    </IconButton>
                </TableCell>
            </TableRow>

            <MessageTableRowMenu
                message={message}
                anchorEl={menuAnchorEl}
                visibility={menuVisible}
                status={message.status}
                handleCloseMenu={handleCloseMenu}
                handleUpdateMessage={handleUpdateMessage}
            />
        </>
    )
}
