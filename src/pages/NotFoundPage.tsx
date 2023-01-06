import { Box, Typography } from '@mui/material';
import WarningTwoToneIcon from '@mui/icons-material/WarningTwoTone';

const NotFound = () => {
    return (
        <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
        >
            <WarningTwoToneIcon color='warning' sx={{height:"10%", width:"10%"}}/>
            <Typography variant={"h4"} sx={{mb:10}}>404: Page Not Found.</Typography>
        </Box>
    )
}

export default NotFound