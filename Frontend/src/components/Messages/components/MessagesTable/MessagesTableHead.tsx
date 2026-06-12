import { Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material"
import { ChangeEvent } from "react"
import { MessageOrderDirection } from "../../../../typings/Message"
import { MESSAGES_TABLE_HEAD_STRUCTURE, MessagesTableHeadCell } from "../../../../constants/MessagesTableHead"
import { useTranslation } from "react-i18next"

interface MessagesTableHeadProps {
    filterName: string,
    orderBy: string,
    orderDirection: MessageOrderDirection,
    selectedMessagesCount: number,
    retrievedMessagesCount: number,
    handleToggleAllMessages: (toggle: boolean) => void,
    handleSortMessages: (columnName: string) => void
}

export const MessagesTableHead : React.FC<MessagesTableHeadProps> = ({
    filterName,
    orderBy,
    orderDirection,
    selectedMessagesCount,
    retrievedMessagesCount,
    handleToggleAllMessages,
    handleSortMessages
}) => {
    const { t } = useTranslation();

    const allMessagesChecked = (event: ChangeEvent<HTMLInputElement>) => {
        handleToggleAllMessages(event.target.checked)
    }

    const sortMessages = (columName: string) => {
        handleSortMessages(columName);
    }

    const headerLabel = (headCell: MessagesTableHeadCell) => {
        if (headCell.id === "sender") {
            if (filterName === "sent") {
                return t("messages:RECIPIENTS");
            } 
            if (filterName === "archived") {
                return `${t("messages:RECIPIENTS")}/${t("messages:SENDER")}`;
            }
        }

        if (headCell.label) {
            return t(headCell.label);
        }
    };

    return (
        <>
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            indeterminate={selectedMessagesCount > 0 && selectedMessagesCount < retrievedMessagesCount}
                            checked={retrievedMessagesCount > 0 && selectedMessagesCount === retrievedMessagesCount}
                            onChange={allMessagesChecked}
                        />
                    </TableCell>

                    {MESSAGES_TABLE_HEAD_STRUCTURE.map(headCell => (
                        <TableCell
                            key={headCell.id}
                            align={headCell.align || "left"}
                            sortDirection={orderBy === headCell.id ? orderDirection : false}
                            sx={{
                                width: headCell.width,
                                minWidth: headCell.minWidth,
                            }}
                        >
                            
                            {headCell.label ?
                                <TableSortLabel
                                    active={orderBy === headCell.id}
                                    direction={orderBy === headCell.id ? orderDirection : "asc"}
                                    onClick={() => sortMessages(headCell.id)}
                                >
                                    {headerLabel(headCell)}
                                </TableSortLabel>
                            :
                                ""
                            }
                        </TableCell>   
                    ))}
                </TableRow>
            </TableHead>
        </>
    )
}
