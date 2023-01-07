import { GitHub, LinkedIn } from "@mui/icons-material"
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material"
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import PhotoCameraOutlinedIcon from '@material-ui/icons/PhotoCameraOutlined';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NotInterestedOutlinedIcon from '@material-ui/icons/NotInterestedOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const gitHub = (
    <GitHub fontSize="medium" />
)

const linkedIn = (
    <LinkedIn color="info" fontSize="medium"/>
)

const email = (
    <EmailOutlinedIcon />
)

const showPassword = (
    <VisibilityOutlinedIcon />
)

const hidePassword = (
    <VisibilityOffOutlinedIcon />
)

const home = (
    <HomeOutlinedIcon color='warning' fontSize="large" />
)

const user = (
    <AccountCircleOutlinedIcon />
)

const photo = (
    <PhotoCameraOutlinedIcon />
)

const remove = (
    <RemoveIcon fontSize="small"/>
)

const add = (
    <AddIcon fontSize="small"/>
)

const search = (
    <SearchIcon />
)

const cart = (
    <ShoppingCartIcon />
)

const wishList = (
    <FavoriteIcon />
)

const notFound = (
    <NotInterestedOutlinedIcon color="error" style={{fontSize: "15vw"}}/>
)

const arrowBack = (
    <ArrowBackIcon fontSize="large" sx={{mt:2,mb:2}} />
)

const arrowLeft = (
    <KeyboardArrowLeft />
)

const arrowRight = (
    <KeyboardArrowRight />
)

const getIcons = { gitHub, linkedIn, email, showPassword, hidePassword, home, user, photo, remove, add, search, cart, wishList, notFound, arrowBack, arrowLeft, arrowRight }
export default getIcons