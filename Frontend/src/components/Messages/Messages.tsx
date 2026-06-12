import { Card, Container, TablePagination } from "@mui/material";
import { MessagesHeader } from "./MessagesHeader";
import { useAuth } from "../../context/AuthContext";
import { MessagesToolbar } from "./components/MessagesToolbar/MessagesToolbar";
import { useEffect, useState } from "react";
import { useUnreadMessagesCount } from "../../context/UnreadMessagesContext";
import { MessagesService } from "../../services/MessagesService";
import { Message, MessageOrderDirection } from "../../typings/Message";
import { MessagesTable } from "./components/MessagesTable/MessagesTable";
import { useActiveMessage } from "../../context/ActiveMessageContext";
import { MessageDialog } from "../MessagesRead/MessageDialog";
import { MessageWriteDialog } from "../MessagesWrite/MessageWriteDialog";
import { useTranslation } from "react-i18next";

export const MessageComponent : React.FC = () => {
    const { t } = useTranslation();
    const { accessToken, logout } = useAuth();
    const { unreadMessagesCount, setUnreadMessagesCount } = useUnreadMessagesCount();

    const [ orderBy, setOrderBy ] = useState<string>("date");
    const [ orderDirection, setOrderDirection ] = useState<MessageOrderDirection>("asc");

    const { readingMessage } = useActiveMessage();
    const [ isWritingMessage, setIsWritingMessage ] = useState(false);

    const [ page, setPage ] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    
    const [ totalPagesCount, setTotalPagesCount ] = useState<number>(0);
    const [ filterName, setFilterName ] = useState<string>("all");
    const [ searchQuery, setSearchQuery ] = useState<string>("");

    const [ messages, setMessages ] = useState<Message[] | null>(null);
    const [ selectedMessagesIds, setSelectedMessagesIds ] = useState<number[]>([]);

    const handleSelectMessage = (id: number) => {
        let newSelected: number[];
        const selectedIndex = selectedMessagesIds.indexOf(id);
    
        if (selectedIndex === -1) {
            newSelected = [...selectedMessagesIds, id];
        } else {
            newSelected = [
                ...selectedMessagesIds.slice(0, selectedIndex),
                ...selectedMessagesIds.slice(selectedIndex + 1),
            ];
        }
    
        setSelectedMessagesIds(newSelected);
    };

    const handleChangePage = (_: any, newPage: any) => setPage(newPage);

    const handleChangeRowsPerPage = (event: any) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const handleSortMessages = (columnName: string) => {
        const isAsc = orderBy === columnName && orderDirection === "asc";
        
        if (columnName !== "") {
            setOrderDirection(isAsc ? "desc" : "asc");
            setOrderBy(columnName);
        }
    };

    const handleToggleAllMessages = (toggle: boolean) => {
        if (messages) {
            setSelectedMessagesIds(toggle ? messages.map((n) => n.id) : [])
        }
    };
    
    const handleUpdateMessage = async (method: string, messagesIds?: number[]) => {
        try {
            const messagesAffected = await MessagesService.UpdateMessage(accessToken, messagesIds || selectedMessagesIds, method);

            setUnreadMessagesCount(unreadMessagesCount - messagesAffected);

            setSelectedMessagesIds([]);
            retrieveMessages();
        } catch (e) {
            logout();
        }
    }

    const retrieveMessages = async () => {
        try {
            const data = await MessagesService.GetMessages(accessToken, page + 1, filterName, searchQuery);
            const formattedList: Message[] = Array.from(data.content).map((val: any) => ({
                    id: val.id,
                    title: val.title,
                    sender: val.sender,
                    type: val.type,
                    date: val.date,
                    status: val.status,
                    recipients: val.recipients,
                    archived: val.archived
                })
            );

            setTotalPagesCount(data.totalPages);

            setMessages(formattedList);
        } catch (e) {
            logout();
        }
    };

    useEffect(() => {
        retrieveMessages();
    }, [accessToken, page, searchQuery, filterName]);

    return (
        <>
            <Container className="pt-20" maxWidth={false} sx={{ px: { xs: 2, sm: 3, lg: 5 } }}>
                <MessagesHeader
                    setIsWritingMessage={setIsWritingMessage}
                />

                <Card>
                    <MessagesToolbar
                        selectedMessagesCount={selectedMessagesIds.length}
                        filterName={filterName}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        setFilterName={setFilterName}
                        handleUpdateMessage={handleUpdateMessage}
                    />

                    <MessagesTable
                        filterName={filterName}
                        orderBy={orderBy}
                        orderDirection={orderDirection}
                        messages={messages}
                        selectedMessages={selectedMessagesIds}
                        handleToggleAllMessages={handleToggleAllMessages}
                        handleSortMessages={handleSortMessages}
                        handleSelectMessage={handleSelectMessage}
                        handleUpdateMessage={handleUpdateMessage}
                        handleRefreshMessages={retrieveMessages}
                    />

                    <TablePagination
                        page={page}
                        component="div"
                        count={totalPagesCount * rowsPerPage}
                        rowsPerPage={rowsPerPage}
                        onPageChange={handleChangePage}
                        rowsPerPageOptions={[rowsPerPage]}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        labelDisplayedRows={({ page }) => `${t("global:PAGE")} ${page + 1} ${t("global:OF").toLowerCase()} ${totalPagesCount || 1}`}
                    />
                </Card>
            </Container>

            <MessageWriteDialog
                isWritingMessage={isWritingMessage}
                setIsWritingMessage={setIsWritingMessage}
                handleRefreshMessages={retrieveMessages}
            />

            <MessageDialog
                open={!!readingMessage}
            />
        </>
    )
}
