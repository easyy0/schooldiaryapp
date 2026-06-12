import { Avatar, Typography } from "@mui/material"
import { MessageRecipient } from "../../../../../typings/Message"

interface MessageTableRowRecipientsProps {
    recipients: MessageRecipient[]
}

export const MessageTableRowRecipients : React.FC<MessageTableRowRecipientsProps> = ({
    recipients
}) => {

    if (!recipients) return

    return (
        <>
            {recipients.slice(0, 3).map((messageRecipient: MessageRecipient) => (
                <Avatar
                    key={messageRecipient.id}
                    alt={
                        messageRecipient.recipient
                            .firstname
                    }
                >
                    {messageRecipient.recipient.firstname.charAt(0).toUpperCase()}
                    {messageRecipient.recipient.lastname.charAt(0).toUpperCase()}
                </Avatar>
            ))}

            {recipients.length <= 1 && (
                <Typography>{recipients[0].recipient.firstname} {recipients[0].recipient.lastname}</Typography>
            )}

            {recipients.length > 3 && (
                <Avatar>+{recipients.length - 3}</Avatar>
            )}
        </>
    )
}
