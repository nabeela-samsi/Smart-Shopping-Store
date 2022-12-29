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
            {/* <p>&copy; Nabeela Samsi 2022 */}

                {/* <a href = "https://www.linkedin.com/in/nabeela-samsi/">
                    <i className = "fa fa-linkedin"></i>
                </a>
                <a href = "https://github.com/nabeela-samsi">
                    <i className="fa fa-github"></i>
                </a> */}
            {/* </p> */}
        </footer>
    )
}

export default Footer