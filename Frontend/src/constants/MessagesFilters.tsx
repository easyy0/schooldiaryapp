import {
    EmailOutlined,
    ArchiveOutlined,
    SendOutlined,
    VisibilityOffOutlined,
    VisibilityOutlined,
    ErrorOutline,
} from "@mui/icons-material";

type MessagesFiltersStructure = {
    [key: string]: { localeKey: string; icon: React.ReactNode };
};

export const MESSAGES_FILTERS: MessagesFiltersStructure = {
    all: {
        localeKey: "FILTER_ALL",
        icon: <EmailOutlined sx={{ alignSelf: "center", mr: 0.5 }} />,
    },
    important: {
        localeKey: "FILTER_IMPORTANT",
        icon: <ErrorOutline sx={{ alignSelf: "center", mr: 0.5 }} />,
    },
    unread: {
        localeKey: "FILTER_UNREAD",
        icon: <VisibilityOffOutlined sx={{ alignSelf: "center", mr: 0.5 }} />,
    },
    read: {
        localeKey: "FILTER_READ",
        icon: <VisibilityOutlined sx={{ alignSelf: "center", mr: 0.5 }} />,
    },
    sent: {
        localeKey: "FILTER_SENT",
        icon: <SendOutlined sx={{ alignSelf: "center", mr: 0.5 }} />,
    },
    archived: {
        localeKey: "FILTER_ARCHIVED",
        icon: <ArchiveOutlined sx={{ alignSelf: "center", mr: 0.5 }} />,
    },
};