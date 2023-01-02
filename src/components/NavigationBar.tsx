import { useState } from "react"
import { Avatar, Button, Menu, MenuItem, Tooltip, Typography} from "@mui/material"
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

import Modal from "./Modal"

const NavigationBar = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [modalIsOpen, setIsOpen] = useState(false)
    const open = Boolean(anchorEl)

    const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget)
     }

    const handleMenuClose = () => {
        setAnchorEl(null)
    }

    const handleModalToggle = () => {
        setIsOpen(!modalIsOpen)
    }

    const handleModalAction = () => {
        handleModalToggle()
    }

    return (
        <>
            <Tooltip
                title="account-menu"
                arrow
            >
                <Button
                    aria-controls={open ? "simple-menu" : undefined}
                    aria-expanded = {open ? 'true' : undefined}
                    arai-haspopup="true"
                    onMouseOver={handleMenuOpen}
                    variant="text"
                    color="inherit"
                >
                   <PersonOutlineOutlinedIcon fontSize="large"/>
                   Profile
                </Button>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleMenuClose}
                disableAutoFocusItem
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root':{
                            width:32,
                            height:32,
                            ml:-0.5,
                            mr:1
                        },
                        '&:before': {
                            content:'""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex:0
                        }
                    }
                }}
                transformOrigin={{
                    horizontal: 'right',
                    vertical: 'top'
                }}
                anchorOrigin={{
                    horizontal: 'right',
                    vertical: 'bottom'
                }}
                MenuListProps={{onMouseLeave: handleMenuClose}}
            >
                <MenuItem>
                    <Typography>
                        <Typography fontWeight={"bold"} noWrap={true}>
                            Welcome <br/>
                        </Typography>
                        <Typography variant="subtitle2">
                            To access wishlist and cart please login <br/>
                        </Typography>
                        <Button
                            sx={{ml:"18%"}}
                            onClick={handleModalAction}
                            variant="outlined"
                        >
                            Log In / Sign Up
                        </Button>
                    </Typography>

                </MenuItem>
                <MenuItem>
                    <Avatar /> My profile
                </MenuItem>
                <MenuItem>

                </MenuItem>
            </Menu>
            <Modal
                modalIsOpen={modalIsOpen}
                toggle={handleModalToggle}
                formType={"Log In"}
            />
            {/*  */}
            {/* <Button>
                <PersonOutlineTwoToneIcon color="info" fontSize="large" sx={{mr: "1em"}} />
                <Typography>Profile</Typography>
            </Button>
            <ShoppingCartTwoToneIcon color="info" fontSize="large" sx={{mr: "1em"}}/>
            <FavoriteTwoToneIcon color="info" fontSize="large" sx={{mr: "1em"}}/>
            <Brightness4SharpIcon fontSize="large" sx={{mr: "1em"}} /> */}
        </>
    )
}

export default NavigationBar