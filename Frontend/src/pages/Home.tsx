import { Helmet } from "react-helmet-async"
import Navigation from "../components/Navigation/Navigation"
import { Routes, Route, useNavigate } from "react-router-dom"
import { Box, Button } from "@mui/material"

function Home() {
    const navigate = useNavigate()

    return (
        <>
            <Helmet>
                <title>School Diary App | Home</title>
            </Helmet>
            
            <Box
              sx={{
                minHeight: 1,
                display: 'flex',
                flexDirection: { xs: 'column', lg: 'row' },
              }}
            >
                <Navigation />

                <Routes>
                    <Route path="/" element={<p>Glowna</p>} />
                    <Route path="/messages" element={<p>Messages</p>} />
                </Routes>
            </Box>
            
            {/* <Button onClick={() => navigate('/messages')}>Go to Messages</Button> */}
        </>
    )
}

export default Home
