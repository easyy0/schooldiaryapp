import { TableBody } from "@mui/material";
import React from "react";
import { MessagesTableRow } from "./MessagesTableRow";
import { Message } from "../../../../../typings/Message";

interface MessagesTableBodyProps {
    messages: Message[];
    selectedMessages: number[];
    handleSelectMessage: (id: number) => void;
    handleUpdateMessage: (method: string, messagesIds?: number[]) => void;
    handleRefreshMessages: () => void;
}

export const MessagesTableBody : React.FC<MessagesTableBodyProps> = ({
    messages,
    selectedMessages,
    handleSelectMessage,
    handleUpdateMessage,
    handleRefreshMessages
}) => {
    const isMessageSelected = (id: number) => selectedMessages.includes(id);

    return (
        <>
            <TableBody>
                {messages.map(message => 
                    <MessagesTableRow
                        key={message.id}
                        selected={isMessageSelected(message.id)}
                        message={message}
                        handleSelectMessage={handleSelectMessage}
                        handleUpdateMessage={handleUpdateMessage}
                        handleRefreshMessages={handleRefreshMessages}
                    />
                )}
                
            </TableBody>
        </>
    )
}