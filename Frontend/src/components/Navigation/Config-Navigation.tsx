import {
    Assignment,
    DateRange,
    Email,
    Home,
} from "@mui/icons-material";

const navConfig = [
    {
        localeKey: "HOME",
        path: "/",
        icon: <Home></Home>,
    },
    {
        localeKey: "MESSAGES",
        path: "/messages",
        icon: <Email />,
        badgeContent: 0,
    },
    {
        localeKey: "TIMETABLE",
        path: "/timetable",
        icon: <DateRange />,
    },
    {
        localeKey: "MARKS",
        path: "/marks",
        icon: <Assignment />,
    },
];

export default navConfig;
