import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Autocomplete, Button, Divider, TextField, ToggleButton, Typography } from "@mui/material";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { services } from "../../services/services";
import { useAuth } from "../../context/AuthContext";
import { User } from "../../typings/User";
import { useTranslation } from "react-i18next";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialog-paper": {
        width: "min(980px, calc(100% - 48px))",
        height: "min(760px, calc(100% - 48px))",
        maxWidth: "980px",
        maxHeight: "calc(100% - 48px)",
        margin: theme.spacing(3),
        [theme.breakpoints.down("md")]: {
            width: `calc(100% - ${theme.spacing(4)})`,
            height: `calc(100% - ${theme.spacing(4)})`,
            margin: theme.spacing(2),
        },
    },
    "& .MuiDialogContent-root": {
        flex: 1,
        minHeight: 0,
    },
    "& .message-write-form": {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        minHeight: 0,
    },
    "& .message-write-fields": {
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing(2),
        height: "100%",
        minHeight: 0,
    },
    "& .message-write-editor": {
        flex: 1,
        minHeight: 220,
    },
    "& .message-write-editor .MuiInputBase-root": {
        height: "100%",
        alignItems: "flex-start",
    },
    "& .message-write-editor textarea": {
        height: "100% !important",
        overflowY: "auto !important",
    },
    "& .MuiTextField-root, & .MuiAutocomplete-root": {
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
    },
    "& .MuiToggleButton-root": {
        borderRadius: theme.shape.borderRadius,
    },
}));

interface MessageWriteDialogProps {
    isWritingMessage: boolean;
    setIsWritingMessage: (toggle: boolean) => void;
    handleRefreshMessages: () => void;
}

export const MessageWriteDialog: React.FC<MessageWriteDialogProps> = ({
    isWritingMessage,
    setIsWritingMessage,
    handleRefreshMessages
}) => {
    const { t } = useTranslation();
    const { accessToken, logout } = useAuth();

    const [users, setUsers] = useState<User[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
    const [isImportant, setIsImportant] = useState(false);

    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (selectedUsers.length === 0) {
            alert("Please select at least one receiver.");
            return;
        }

        const messageData = {
            receivers: selectedUsers.map(
                (selectedUser: User) => selectedUser.id
            ),
            title: title,
            message: message,
            isImportant: isImportant,
        };

        await services.MessagesService.SendMessage(accessToken, messageData);

        setIsWritingMessage(false);
        handleRefreshMessages();
    };

    /* SERVICE */
    const getUsers = useCallback(async () => {
        try {
            const data = await services.UtilsService.GetUsers(
                accessToken,
                "TEACHER"
            );

            setUsers(data);
        } catch (e) {
            logout();
        }
    }, [accessToken, logout]);

    useEffect(() => {
        setSelectedUsers([]);
        if (isWritingMessage) {
            getUsers();
        }
    }, [getUsers, isWritingMessage]);

    return (
        <BootstrapDialog
            fullScreen
            onClose={() => setIsWritingMessage(false)}
            aria-labelledby="customized-dialog-title"
            open={isWritingMessage}
        >
            <DialogTitle
                sx={{
                    m: 0,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
                id="customized-dialog-title"
            >
                <Typography variant="h6" fontWeight={700}>
                    {t("messages:WRITE_A_MESSAGE")}
                </Typography>
                <IconButton
                    aria-label="close"
                    onClick={() => setIsWritingMessage(false)}
                    sx={{
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <form
                className="message-write-form"
                onSubmit={handleSubmit}
            >
                <DialogContent
                    sx={{
                        whiteSpace: "pre-wrap",
                        flex: 1,
                        minHeight: 0,
                    }}
                    dividers
                >
                    <div className="message-write-fields">
                        <Autocomplete
                            multiple
                            disablePortal
                            options={users}
                            getOptionLabel={(option) => `${option.firstname} ${option.lastname}`}
                            value={selectedUsers}
                            onChange={(_, newValue) => {
                                setSelectedUsers(newValue);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label={t("messages:RECIPIENTS")}
                                    required={selectedUsers.length === 0}
                                />
                            )}
                        />

                        <Divider />

                        <TextField
                            sx={{ width: "100%" }}
                            name="title"
                            label={t("global:TITLE")}
                            required
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <Divider />

                        <TextField
                            className="message-write-editor"
                            sx={{ width: "100%" }}
                            label={t("messages:MESSAGE_CONTENT")}
                            placeholder={t("messages:MESSAGE_CONTENT_PLACEHOLDER")}
                            multiline
                            required
                            minRows={8}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </div>
                </DialogContent>

                <DialogActions>
                    <ToggleButton
                        value="important"
                        color="primary"
                        selected={isImportant}
                        onChange={() => {
                            setIsImportant(!isImportant);
                        }}
                    >
                        {t("messages:IMPORTANT")}
                    </ToggleButton>
                    <Button
                        color="inherit"
                        onClick={() => setIsWritingMessage(false)}
                    >
                        {t("global:CANCEL")}
                    </Button>
                    <Button color="primary" variant="contained" type="submit">
                        {t("global:SUBMIT")}
                    </Button>
                </DialogActions>
            </form>
        </BootstrapDialog>
    );
}
