import { Alert, AlertTitle, Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { useState } from "react";
import { loginFormValidation } from "../utilities/FormValidation";
import { FormError } from "../type/Form";
import { useForm } from "react-hook-form";

// const LogInForm =  () => {
//     const [showPassword, setPasswordVisibilty] = useState(false)
//     const [email, setEmail] = useState<string>('')
//     const [password, setPassword] = useState<string>('')
//     const [{error,errorMessage,fieldErrorInfo}, setFormError] = useState<FormError>({
//         error: false,
//         errorMessage: '',
//         fieldErrorInfo: {email: "", password: ""}
//     })
//     const [disableSubmit, setDisableSubmit] = useState(false)

//     const handlePasswordVisibility = () => {
//         setPasswordVisibilty(!showPassword)
//     }

//     const handlePasswordField = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
//         const {value} = e.currentTarget
//         setPassword(value)
//         if(value.trim().length > 0) {
//             fieldErrorInfo.password = ""
//         }
//     }

//     const handleEmailField = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
//         const {value} = e.currentTarget
//         setEmail(value)
//         if(value.trim().length > 0) {
//             fieldErrorInfo.email = ""
//         }
//     }

//     const handleFormSubmission = (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault()
//         const formValidation = loginFormValidation({email, password})
//         console.log(formValidation)
//         setFormError(formValidation)
//     }
//     return (
//         <>
//             <Box
//                 component={"form"}
//                 display="flex"
//                 flexDirection={"column"}
//                 alignContent={"center"}
//                 justifyContent={"center"}
//                 noValidate
//                 onSubmit={handleFormSubmission}
//             >
//             {(error) &&
//                 <Alert severity="error">
//                     <AlertTitle>Error: Login failed</AlertTitle>
//                     Invalid credentials
//                 </Alert>
//             }
//             <TextField
//                     required
//                     type={"email"}
//                     label={"Email Address"}
//                     placeholder={"john@domain.com"}
//                     InputProps={{
//                         startAdornment: <InputAdornment position="start"><EmailOutlinedIcon /></InputAdornment>
//                     }}
//                     value={email}
//                     onChange={handleEmailField}
//                     error = {Boolean(fieldErrorInfo['email'].length)}
//                     helperText = {fieldErrorInfo['email']}
//                     sx={{m:2}}
//                 />
//                 <TextField
//                     required
//                     type={showPassword ? "text" : "password"}
//                     label={"Password"}
//                     InputProps={{
//                         endAdornment: (
//                             <InputAdornment position="end">
//                                 <IconButton
//                                     onClick={handlePasswordVisibility}
//                                 >
//                                 {showPassword ? <VisibilityOutlinedIcon/> : <VisibilityOffOutlinedIcon/>}
//                                 </IconButton>
//                             </InputAdornment>
//                         )
//                     }}
//                     value={password}
//                     onChange={handlePasswordField}
//                     error = {Boolean(fieldErrorInfo['password'].length)}
//                     helperText = {fieldErrorInfo['password']}
//                     sx={{m:2}}
//                 />
//                 <Button
//                     type="submit"
//                     variant="contained"
//                     color="primary"
//                     sx={{m:2, fontWeight:"bold"}}
//                     disabled={disableSubmit}
//                 >
//                     Log In
//                 </Button>
//             </Box>
//             <Box
//                 display="flex"
//                 alignContent={"center"}
//                 justifyContent={"center"}

//             >
//                <Button variant="contained" color="inherit" sx={{m:2}}>
//                     New to Smart Shopping? create an account
//                </Button>
//             </Box>

//         </>
//     )
// }

const LogInForm =  () => {
    const [showPassword, setPasswordVisibilty] = useState(false)
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [{error,errorMessage,fieldErrorInfo}, setFormError] = useState<FormError>({
        error: false,
        errorMessage: '',
        fieldErrorInfo: {email: "", password: ""}
    })
    const [disableSubmit, setDisableSubmit] = useState(false)
    const {register, handleSubmit,watch, formState:{errors}} = useForm()
    const onSubmit = (data: any) => console.log(data)
    console.log(watch("example"))

    const handlePasswordVisibility = () => {
        setPasswordVisibilty(!showPassword)
    }

    const handlePasswordField = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const {value} = e.currentTarget
        setPassword(value)
        if(value.trim().length > 0) {
            fieldErrorInfo.password = ""
        }
    }

    const handleEmailField = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const {value} = e.currentTarget
        setEmail(value)
        if(value.trim().length > 0) {
            fieldErrorInfo.email = ""
        }
    }

    const handleFormSubmission = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formValidation = loginFormValidation({email, password})
        console.log(formValidation)
        setFormError(formValidation)
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
            {/* {(error) &&
                <Alert severity="error">
                    <AlertTitle>Error: Login failed</AlertTitle>
                    Invalid credentials
                </Alert>
            } */}
            <TextField
                    required
                    type={"email"}
                    label={"Email Address"}
                    placeholder={"john@domain.com"}
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><EmailOutlinedIcon /></InputAdornment>
                    }}
                    value={email}
                    onChange={handleEmailField}
                    error = {Boolean(fieldErrorInfo['email'].length)}
                    helperText = {fieldErrorInfo['email']}
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
                    onChange={handlePasswordField}
                    error = {Boolean(fieldErrorInfo['password'].length)}
                    helperText = {fieldErrorInfo['password']}
                    sx={{m:2}}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{m:2, fontWeight:"bold"}}
                    disabled={disableSubmit}
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