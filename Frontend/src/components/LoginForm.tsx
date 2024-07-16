import { VisibilityOff, Visibility } from "@mui/icons-material"
import { LoadingButton } from "@mui/lab"
import { Box, Card, Stack, Typography, Divider, TextField, InputAdornment, IconButton, Link } from "@mui/material"
import { services } from "../services/services"
import { useState } from "react"
import { useAuth } from "./AuthContext"
import { useNavigate } from "react-router-dom"

export default function LoginForm() {
    const { accessToken } = useAuth();
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [wrongPassword, setWrongPassword] = useState(false)
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    return (
        <Box className="
            bg-gradient-to-r
          from-gray-100
          to-gray-200
            w-screen
            h-screen
            flex
            items-center
            justify-center"
        >
            <Card className="w-full max-w-420">
            <Stack className="p-10" spacing={3}>
                <Typography variant="h4">Sign in to School Diary App</Typography>
                <Typography variant="body2">Don’t have an account? <Link variant="subtitle2">Get account</Link></Typography>

                <Divider sx={{ my: 3 }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    OR
                    </Typography>
                </Divider>
                <TextField name="username" label="Username" onChange={(e) => setUsername(e.target.value)} />

                <TextField
                    name="password"
                    label="Password"
                    type= {showPassword ? 'text' : 'password'}
                    InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                        <IconButton
                            onClick={() => {
                            setShowPassword((previousBool) => !previousBool)
                            }}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                        </InputAdornment>
                    ),
                    }}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Link className="self-end font-bold" variant="subtitle2" underline="hover">
                    Forgot password?
                </Link>

                {wrongPassword ? <Typography className="self-center" variant="body2" color="error">Wrong username or password!</Typography> : null}

                <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="inherit"
                    onClick={() => {
                        services.LoginService(username, password, accessToken)
                        .then(() => {
                            navigate('/')
                        })
                        .catch(() => setWrongPassword(true))
                    }}
                >
                    Login
                </LoadingButton>
            </Stack>
            </Card>
        </Box>
    )
}