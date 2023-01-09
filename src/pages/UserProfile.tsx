import { Avatar, Box, Button, Card, CardActionArea, IconButton, Input, TextField, Typography } from "@mui/material"
import { useAppSelector } from "../hooks/reduxHook"
import ErrorMessage from "../components/ErrorMessage"
import getIcons from "../utilities/getIcon"
import { Link } from "react-router-dom"

const UserProfile = () => {
    const {userInfo} = useAppSelector(state => state.auth)
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
                       <TextField
                            label="Name"
                            variant="outlined"
                            value={userInfo.name}
                            InputProps={{
                                readOnly: true
                            }}
                       /> <br/>
                        <TextField
                            label="Email"
                            variant="outlined"
                            value={userInfo.email}
                            InputProps={{
                                readOnly: true
                            }}
                       /> <br/>
                        <TextField
                            label="Role"
                            variant="outlined"
                            value={userInfo.role}
                            InputProps={{
                                readOnly: true
                            }}
                       /><br />
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