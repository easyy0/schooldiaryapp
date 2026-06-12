import * as React from "react";
import { alpha, styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {
    Avatar,
    Box,
    Button,
    Divider,
    Typography,
} from "@mui/material";
import { format } from "date-fns";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { useActiveMessage } from "../../context/ActiveMessageContext";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        overflowY: "auto",
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

interface MessageDialogProps {
    open: boolean
}

export const MessageDialog: React.FC<MessageDialogProps> = ({
    open
}) => {
    const { readingMessage, closeMessage } = useActiveMessage();

    if (!readingMessage) return;

    return (
        <React.Fragment>
            <BootstrapDialog
                open={open}
                onClose={closeMessage}
                aria-labelledby="customized-dialog-title"
                fullScreen
                sx={{
                    m: 15,
                }}
            >
                <DialogTitle
                    sx={{ m: 0, p: 2, display: "flex" }}
                    id="customized-dialog-title"
                >
                    <Box
                        sx={{
                            mr: 2,
                            py: 2,
                            px: 2.5,
                            display: "flex",
                            borderRadius: 1.5,
                            alignItems: "center",
                            minWidth: "10%",
                            bgcolor: (theme) =>
                                alpha(theme.palette.grey[500], 0.12),
                        }}
                    >
                        <Avatar>{readingMessage.sender.firstname.charAt(0)}</Avatar>
                        <Typography sx={{ ml: 1, textWrap: "nowrap" }} variant="subtitle2">
                            {readingMessage.sender.firstname} {readingMessage.sender.lastname}
                        </Typography>

                        <Box
                            sx={{
                                ml: 2,
                                textWrap: "nowrap",
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "column",
                            }}
                        >
                            <Typography variant="subtitle2">
                                {format(readingMessage.date, "yyyy-MM-dd")}
                            </Typography>
                            <Typography variant="subtitle1">
                                {format(readingMessage.date, "HH:mm")}
                            </Typography>
                        </Box>
                    </Box>
                    <Divider orientation="vertical" flexItem />
                    <Box
                        sx={{
                            ml: 2,
                            mr: 5,
                            py: 2,
                            px: 2.5,
                            display: "flex",
                            borderRadius: 1.5,
                            alignItems: "center",
                            width: "75%",
                            flexDirection: "row",
                        }}
                    >
                        <Typography variant="h5">{readingMessage.title}</Typography>
                    </Box>

                    <IconButton
                        aria-label="close"
                        onClick={closeMessage}
                        sx={{
                            alignSelf: "center",
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                {readingMessage.recipients ? (
                    <>
                        <Divider
                            textAlign="left"
                            orientation="horizontal"
                            flexItem
                        >
                            Recipients
                        </Divider>

                        <Box
                            sx={{
                                mr: 2,
                                py: 2,
                                px: 2.5,
                                display: "flex",
                                borderRadius: 1.5,
                                alignItems: "center",
                                minWidth: "10%",
                            }}
                        >
                            {readingMessage.recipients.map((messageRecipient: any) => {
                                return (
                                    <Box
                                        sx={{
                                            mr: 2,
                                            py: 2,
                                            px: 2.5,
                                            display: "flex",
                                            borderRadius: 1.5,
                                            alignItems: "center",
                                            minWidth: "10%",
                                            bgcolor: (theme) =>
                                                alpha(
                                                    theme.palette.grey[500],
                                                    0.12
                                                ),
                                        }}
                                    >
                                        <Avatar>
                                            {messageRecipient.status === "READ" ? (
                                                <VisibilityOutlined />
                                            ) : (
                                                <VisibilityOffOutlined />
                                            )}
                                        </Avatar>
                                        <Typography
                                            sx={{ ml: 1 }}
                                            variant="subtitle2"
                                        >
                                            {`${messageRecipient.recipient.firstname} ${messageRecipient.recipient.lastname}`}
                                        </Typography>
                                    </Box>
                                );
                            })}
                        </Box>
                    </>
                ) : (
                    <></>
                )}

                <DialogContent
                    sx={{
                        whiteSpace: "pre-wrap",
                        overflowX: "auto",
                    }}
                    dividers
                >
                    <Box
                        sx={{
                            mr: 2,
                            py: 2,
                            px: 2.5,
                            display: "flex",
                            height: "100%",
                            borderRadius: 1.5,
                            bgcolor: (theme) =>
                                alpha(theme.palette.grey[500], 0.12),
                        }}
                    >
                        {readingMessage.description}
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button onClick={closeMessage}>OK</Button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}
