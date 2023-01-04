import { useState } from "react"
import {
    Avatar,
    Button,
    Menu,
    MenuItem,
    Tooltip,
    Typography
} from "@mui/material"
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

import { Link } from "react-router-dom";

const NavigationBar = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget)
     }

    const handleMenuClose = () => {
        setAnchorEl(null)
    }

    return (
        <div className="header__action">
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
                            variant="outlined"
                        >
                            <Link
                                to={`/login`}
                                style={{textDecoration: 'none'}}
                                state={{formType: "Log In" }}
                            >
                                Log In / Sign Up
                            </Link>
                        </Button>
                    </Typography>

                </MenuItem>
                <MenuItem>
                    <Avatar /> My profile
                </MenuItem>
                <MenuItem>

                </MenuItem>
            </Menu>
        </div>
    )
}

export default NavigationBar