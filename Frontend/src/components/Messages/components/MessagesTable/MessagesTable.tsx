import { TableContainer, Table, Typography, TableBody, Box } from "@mui/material"
import { MessagesTableHead } from "./MessagesTableHead"
import { Message, MessageOrderDirection } from "../../../../typings/Message"
import { MessagesTableBody } from "./MessagesTableBody/MessagesTableBody"
import { LoadingCircle } from "../../../LoadingCircle/LoadingCircle";
import { useTranslation } from "react-i18next";

interface MessagesTableProps {
    filterName: string,
    orderBy: string;
    orderDirection: MessageOrderDirection;
    messages: Message[] | null;
    selectedMessages: number[];
    handleToggleAllMessages: (toggle: boolean) => void;
    handleSortMessages: (columnName: string) => void;
    handleSelectMessage: (id: number) => void;
    handleUpdateMessage: (method: string, messagesIds?: number[]) => void;
    handleRefreshMessages: () => void;
}

export const MessagesTable : React.FC<MessagesTableProps> = ({
    filterName,
    orderBy,
    orderDirection,
    messages,
    selectedMessages,
    handleToggleAllMessages,
    handleSortMessages,
    handleSelectMessage,
    handleUpdateMessage,
    handleRefreshMessages
}) => {
    const { t } = useTranslation();

    return (
        <TableContainer sx={{ overflow: "unset" }}>
            <Table sx={{ minWidth: 800 }}>
                <MessagesTableHead
                    filterName={filterName}
                    orderBy={orderBy}
                    orderDirection={orderDirection}
                    selectedMessagesCount={selectedMessages.length}
                    retrievedMessagesCount={messages ? messages.length : 0}
                    handleToggleAllMessages={handleToggleAllMessages}
                    handleSortMessages={handleSortMessages}
                />
                
                {messages ?
                    (messages.length > 0 ?
                        <MessagesTableBody
                            messages={messages}
                            selectedMessages={selectedMessages}
                            handleSelectMessage={handleSelectMessage}
                            handleUpdateMessage={handleUpdateMessage}
                            handleRefreshMessages={handleRefreshMessages}
                        />
                    :
                        <TableBody style={{ height: 50 }}>
                            <Box sx={{ position: 'absolute', left: '50%', top: '75%', transform: 'translate(-50%)', display: 'flex', flexDirection: 'column' }}>
                                <Typography>{t("messages:NO_MESSAGES_FOUND")} 😞</Typography>
                            </Box>
                        </TableBody>
                    )
                    
                :
                    <TableBody style={{ height: 75 }}>
                        <Box sx={{ position: 'absolute', left: '50%', top: '65%', transform: 'translate(-50%)', display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <LoadingCircle size={30} />
                            <Typography>{t("messages:LOADING_MESSAGES")}</Typography>
                        </Box>
                    </TableBody>
                    
                }
            </Table>
        </TableContainer>
    )
}
