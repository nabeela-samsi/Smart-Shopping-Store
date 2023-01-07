
import { Grid, IconButton, Typography } from "@mui/material"

import getIcons from "../utilities/getIcon"

const Footer = () => {
    return (
        <footer className="footer">
            <Grid container textAlign="center" justifyContent="center" alignItems={"center"}>
                <Typography component="span">&copy; Nabeela Samsi 2022</Typography>
                <IconButton aria-label="LinkedIn.com" onClick={() => window.open("https://www.linkedin.com/in/nabeela-samsi/", "_blank")}>
                    {getIcons.linkedIn}
                    {getIcons.gitHub}
                </IconButton>
            </Grid>
        </footer>
    )
}

export default Footer