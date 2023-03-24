import React, { useEffect, useContext } from 'react'
import { styled, alpha } from '@mui/material/styles';
import {
    Button,
    Menu,
    MenuItem,
    Divider
}
    from '@mui/material';
import {
    AccountCircle,
    ExitToApp,
    AttachFile
}
    from '@mui/icons-material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import "./style.css"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from "../../network/axiosInstance"
import { chatContext } from "../../store/ChatContext"

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(

                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));
function UserOptions() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { setAccount } = useContext(chatContext)
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    useEffect(() => {
        let info = JSON.parse(localStorage.getItem("user"))
        setUser(info)
    }, [])
    const handleLogout = () => {
        const id = user.id
        console.log(IdleDeadline)
        axiosInstance.delete(`/auth/logout/${id}`)
        localStorage.removeItem("user")
        navigate("/form")
        setAccount(false)
    }
    return (
        <div className='user-options'>
            <div className='user-img'>
                <img src={user && user.image} alt="" />
            </div>
            <div className='user-name' >
                {user && user.username}
            </div>
            <div className='user-option'>
                <Button
                    id="demo-customized-button"
                    aria-controls={open ? 'demo-customized-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    variant="contained"
                    disableElevation
                    onClick={handleClick}
                    endIcon={<KeyboardArrowDownIcon />}
                    style={
                        {
                            backgroundColor: "transparent",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                >

                </Button>
                <StyledMenu
                    id="demo-customized-menu"
                    MenuListProps={{
                        'aria-labelledby': 'demo-customized-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{ sx: { backgroundColor: "#120F13" } }}
                >
                    <MenuItem onClick={handleClose} disableRipple>
                        <AccountCircle style={{ fill: '#E0E0E0' }} />
                        <span className='option-light'>My Profile</span>
                    </MenuItem>
                    <MenuItem onClick={handleClose} disableRipple>
                        <AttachFile style={{ fill: '#E0E0E0' }} />
                        <span className='option-light'>Tweeter</span>
                    </MenuItem>
                    <Divider sx={{ my: 0.5, backgroundColor: "#3C393F" }} />
                    <MenuItem onClick={handleClose} disableRipple>
                        <button
                            onClick={handleLogout}
                            style={{
                                backgroundColor: "transparent",
                                border: "none",
                                display: "flex",
                                alignItems: "center"
                            }}>
                            <ExitToApp style={{ fill: '#EB5757' }} />
                            <span className='option-red'>Logout</span>
                        </button>
                    </MenuItem>
                </StyledMenu>
            </div>
        </div>
    )
}

export default UserOptions
