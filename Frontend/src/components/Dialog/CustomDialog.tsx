import { useState } from "react";
import { styled, Link, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Button, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

interface CustomizedDialog {
    linkText: string,
    dialogContent: string
}

export const CustomizedDialog : React.FC<CustomizedDialog> = ({
    linkText,
    dialogContent
}) => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Link
                className="self-end font-bold ml-1 cursor-pointer"
                variant="subtitle2"
                underline="hover"
                onClick={handleClickOpen}
            >
                {linkText}
            </Link>

            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    {t("login:INFORMATION")}
                </DialogTitle>

                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>

                <DialogContent dividers>
                    <>
                        <Typography gutterBottom>{dialogContent}</Typography>
                    </>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>OK</Button>
                </DialogActions>

            </BootstrapDialog>
        </>
    );
}
