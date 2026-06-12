import { Notifications } from "@mui/icons-material"
import { Badge, Avatar } from "@mui/material"
import { User } from "../../../../../typings/User"

interface MessageTableRowSenderProps {
    sender: User
}

export const MessageTableRowSender : React.FC<MessageTableRowSenderProps> = ({
    sender
}) => {
    return (
        <>
            <Badge
                badgeContent={
                    <Notifications
                        sx={{ fontSize: 16, color: "white" }}
                    />
                }
                color="error"
                sx={{
                    "& .MuiBadge-badge": {
                        minWidth: "25px",
                        height: "25px",
                        borderRadius: "50%",
                        padding: "4px",
                        boxShadow: "0 0 0 2px #f5f5f5",
                    },
                }}
            >
                <Avatar>
                    {sender.firstname.charAt(0).toUpperCase()}
                    {sender.lastname.charAt(0).toUpperCase()}
                </Avatar>
            </Badge>
        </>
    )
}