import { Alert, AlertTitle, Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { useState } from "react";

const LogInForm =  () => {
    const [showPassword, setPasswordVisibilty] = useState(false)
    const [email, setEmail] = useState<string | null>(null)
    const [password, setPassword] = useState<string | null>(null)

    const handlePasswordVisibility = () => {
        setPasswordVisibilty(!showPassword)
    }
    const handleFormSubmission = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }
    return (
        <>
            <Box
                component={"form"}
                display="flex"
                flexDirection={"column"}
                alignContent={"center"}
                justifyContent={"center"}
                noValidate
                onSubmit={handleFormSubmission}
            >
            <Alert severity="error">
                <AlertTitle>Error: Login failed</AlertTitle>
                Invalid credentials
            </Alert>
            <TextField
                    required
                    type={"email"}
                    label={"Email Address"}
                    placeholder={"john@domain.com"}
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><EmailOutlinedIcon /></InputAdornment>
                    }}
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    error
                    sx={{m:2}}
                />
                <TextField
                    required
                    type={showPassword ? "text" : "password"}
                    label={"Password"}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handlePasswordVisibility}
                                >
                                {showPassword ? <VisibilityOutlinedIcon/> : <VisibilityOffOutlinedIcon/>}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    value={password}
                    onChange={(e) => setPassword(e.currentTarget.value)}
                    error
                    sx={{m:2}}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{m:2, fontWeight:"bold"}}
                >
                    Log In
                </Button>
            </Box>
            <Box
                display="flex"
                alignContent={"center"}
                justifyContent={"center"}

            >
               <Button variant="contained" color="inherit" sx={{m:2}}>
                    New to Smart Shopping? create an account
               </Button>
            </Box>

        </>
    )
}

export default LogInForm