import { Box, Typography } from '@mui/material';
import getIcons from '../utilities/getIcon';

const NotFound = () => {
    return (
        <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
        >
            {getIcons.notFound}
            <Typography variant={"h4"} sx={{ mb: 10 }}>404: Page Not Found.</Typography>
        </Box>
    )
}

export default NotFound