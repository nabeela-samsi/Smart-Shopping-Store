import { GitHub, LinkedIn } from "@mui/icons-material"
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material"
import EmailOutlined from '@material-ui/icons/EmailOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'
import PhotoCameraOutlinedIcon from '@material-ui/icons/PhotoCameraOutlined'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from "@mui/icons-material/Search"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import FavoriteIcon from '@mui/icons-material/Favorite'
import NotInterestedOutlinedIcon from '@material-ui/icons/NotInterestedOutlined'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined'
import EuroIcon from '@mui/icons-material/Euro';
import Brightness4Icon from '@mui/icons-material/Brightness4';

const gitHub = (
    <GitHub fontSize="medium" />
)

const linkedIn = (
    <LinkedIn color="info" fontSize="medium" />
)

const email = (
    <EmailOutlined />
)

const showPassword = (
    <VisibilityOutlinedIcon />
)

const hidePassword = (
    <VisibilityOffOutlinedIcon />
)

const home = (
    <HomeOutlinedIcon color='warning' />
)

const user = (
    <AccountCircleOutlinedIcon />
)

const photo = (
    <PhotoCameraOutlinedIcon />
)

const remove = (
    <RemoveIcon fontSize="small" />
)

const add = (
    <AddIcon fontSize="small" />
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
    <NotInterestedOutlinedIcon color="error" style={{ fontSize: "15vw" }} />
)

const arrowBack = (
    <ArrowBackIcon fontSize="large" sx={{ mt: 2, mb: 2 }} />
)

const arrowLeft = (
    <KeyboardArrowLeft />
)

const arrowRight = (
    <KeyboardArrowRight />
)

const trash = (
    <DeleteRoundedIcon />
)

const edit = (
    <BorderColorOutlinedIcon />
)

const euro = (
    <EuroIcon />
)

const modeSwitcher = (
    <Brightness4Icon />
)

const getIcons = { gitHub, linkedIn, email, showPassword, hidePassword, home, user, photo, remove, add, search, cart, wishList, notFound, arrowBack, arrowLeft, arrowRight, trash, edit, euro, modeSwitcher }
export default getIcons