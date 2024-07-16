import { AdminPanelSettings, Assignment, AssignmentTurnedIn, CalendarMonth, ContentPaste, DateRange, Email, Home, MenuBook, Schedule, School } from "@mui/icons-material";
import Badge from '@mui/material/Badge';

const navConfig = [
    {
      title: 'Home',
      path: '/',
      icon: <Home></Home>
    },
    {
      title: 'Messages',
      path: '/messages',
      icon: <Badge badgeContent={10} color="error">
      <Email />
    </Badge>
    },
    {
      title: 'Timetable',
      path: '/timetable',
      icon: <DateRange></DateRange>
    },
    {
      title: 'Marks',
      path: '/marks',
      icon: <Assignment></Assignment>
    },
    {
      title: 'Frequence',
      path: '/frequence',
      icon: <Schedule></Schedule>
    },
    {
      title: 'Lessons',
      path: '/lessons',
      icon: <MenuBook></MenuBook>
    },
    {
      title: 'Calendar',
      path: '/calendar',
      icon: <CalendarMonth></CalendarMonth>
    },
    {
      title: 'Notes',
      path: '/notes',
      icon: <ContentPaste></ContentPaste>
    },
    {
      title: 'Exams',
      path: '/exams',
      icon: <School></School>
    },
    {
      title: 'Homeworks',
      path: '/homeworks',
      icon: <AssignmentTurnedIn></AssignmentTurnedIn>
    },
    {
      title: 'Admin Panel',
      path: '/adminPanel',
      icon: <AdminPanelSettings></AdminPanelSettings>
    },
];

export default navConfig;