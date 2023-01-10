import { Link } from "react-router-dom"
import { Avatar, Box, TextField } from "@mui/material"
import { useAppSelector } from "../hooks/reduxHook"
import { v4 } from "uuid";

import ErrorMessage from "../components/ErrorMessage"
import { profileFields } from "../utilities/formFields"

const UserProfile = () => {
    const {userInfo} = useAppSelector(state => state.auth)
    const formFields = profileFields
    const setUserImage = () => {
        if(userInfo && userInfo.avatar) {
            return (
                <Avatar
                    alt={userInfo.name}
                    src={userInfo.avatar}
                    sx={{height:"20vh", width: "10vw"}}
                />
            )
        }
    }

    return (
        <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
        >
            {userInfo ?
                (
                    <>
                       {setUserImage()}
                       <br/>
                       {formFields.map((field) => {
                            const uniqueKey = v4()
                            console.log(uniqueKey)
                            return (
                                <>
                                    <TextField
                                        key={`${uniqueKey}`}
                                        id={`${uniqueKey}`}
                                        label={field.label}
                                        type={field.label === 'Password' ? "password" : "text"}
                                        variant="outlined"
                                        value={field.value}
                                        InputProps={{
                                            readOnly: true
                                        }}
                                    />
                                    <br/>
                                </>
                            )

                       })}
                        <Link to={`/userprofile/edit/${userInfo.id}`}>
                            Edit Profile
                        </Link>
                       <br/>
                       <br/>
                    </>
                )
                :
                <ErrorMessage
                    title="403 Unauthorized"
                    message="Permission denied to access"
                />
            }
        </Box>
    )
}

export default UserProfile