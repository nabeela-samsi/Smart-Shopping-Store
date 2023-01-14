import { useNavigate } from "react-router-dom"
import { Grid, IconButton, Typography } from "@mui/material"
import getIcons from "../utilities/getIcon"

const Footer = () => {
    const navigate = useNavigate()
    return (
        <footer className="footer">
            <Grid container textAlign="center" justifyContent="center" alignItems={"center"} pt={5}>
                <Typography component="span">
                    &copy; Nabeela Samsi 2022
                </Typography>
                <IconButton aria-label="LinkedIn.com" onClick={() => window.open("https://www.linkedin.com/in/nabeela-samsi/", "_blank")}>
                    {getIcons.linkedIn}
                </IconButton>
                <IconButton aria-label="GitHub.com" onClick={() => window.open("https://github.com/nabeela-samsi", "_blank")}>
                    {getIcons.gitHub}
                </IconButton>
                <IconButton aria-label="Home" onClick={() => navigate("/")}>
                    {getIcons.home}
                </IconButton>
            </Grid>
        </footer>
    )
}

export default Footer