import { GitHub, LinkedIn } from "@mui/icons-material"
import { Grid, IconButton, Typography } from "@mui/material"

const Footer = () => {
    return (
        <footer className="footer">
            <Grid container textAlign="center" justifyContent="center" alignItems={"center"}>
                <Typography>&copy; Nabeela Samsi 2022</Typography>
                <IconButton aria-label="LinkedIn.com" onClick={() => window.open("https://www.linkedin.com/in/nabeela-samsi/", "_blank")}>
                    <LinkedIn color="info" fontSize="medium"/>
                    <GitHub fontSize="medium" />
                </IconButton>
            </Grid>
        </footer>
    )
}

export default Footer