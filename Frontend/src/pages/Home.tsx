import { Helmet } from "react-helmet-async"
import Navigation from "../components/Navigation/Navigation"
import { Routes, Route, useLocation } from "react-router-dom"
import { Box } from "@mui/material"
import HomeComponent from "../components/Home/Home"
import { Header } from "../components/Header/Header"
import { MessageComponent } from "../components/Messages/Messages"
import { TimetableComponent } from "../components/Timetable/Timetable"
import { MarksComponent } from "../components/Marks/Marks"
import { useState } from "react"
import { Config } from "../config"

function Home() {
    const location = useLocation();
    const [navOpen, setNavOpen] = useState(true);

    return (
        <>
            <Helmet>
                <title>School Diary App | Home</title>
            </Helmet>
            
            <Header navOpen={navOpen} />

            <Box
                sx={{
                    minHeight: 1,
                    display: 'flex',
                    flexDirection: { xs: 'column', lg: 'row' },
                }}
            >
                <Navigation open={navOpen} onOpenChange={setNavOpen} />

                <Box
                    sx={(theme) => ({
                        flex: 1,
                        minWidth: 0,
                        width: {
                            xs: "100%",
                            lg: `calc(100% - ${navOpen ? Config.LAYOUT.NAV.WIDTH : 0}px)`,
                        },
                        transition: theme.transitions.create(["width"], {
                            duration: navOpen
                                ? theme.transitions.duration.enteringScreen
                                : theme.transitions.duration.leavingScreen,
                            easing: theme.transitions.easing.sharp,
                        }),
                    })}
                >
                    <Box
                        key={location.pathname}
                        sx={{
                            width: "100%",
                            animation: "page-enter 320ms ease-in-out",
                            "@keyframes page-enter": {
                                "0%": { opacity: 0, transform: "translateY(-16px)" },
                                "100%": { opacity: 1, transform: "translateY(0)" },
                            },
                        }}
                    >
                        <Routes location={location}>
                            <Route path="/" element={<HomeComponent/>} />
                            <Route path="/messages" element={<MessageComponent/>} />
                            <Route path="/timetable" element={<TimetableComponent/>} />
                            <Route path="/marks" element={<MarksComponent/>} />
                        </Routes>
                    </Box>
                </Box>
            </Box>    
        </>
    )
}

export default Home
