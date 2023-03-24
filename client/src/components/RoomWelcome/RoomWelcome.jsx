import React from 'react'
import slacklogo from "../../assets/images/slack.svg"
import SideBar from '../SideBar/SideBar';
import { Menu } from '@mui/icons-material';
import {
Box,
Drawer,
Button
}
  from '@mui/material';
import "./style.css"
function RoomWelcome() {
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  return (
    <div className='welcome'>
      <div className='group-chat-name'>
        <div className='chat-container'>
          <div className='chat-title'>
            <div className='chat-menu'>
              {['left'].map((anchor) => (
                <React.Fragment key={anchor}>
                  <Button
                    onClick={toggleDrawer(anchor, true)}
                    className="menubtn">
                    <Menu />
                  </Button>
                  <Drawer
                    anchor={anchor}
                    open={state[anchor]}
                    onClose={toggleDrawer(anchor, false)}
                  >
                    <Box
                      sx={
                        {
                          width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 300,
                          backgroundColor: "#252329",
                          height: "100vh"
                        }
                      }
                      role="presentation"
                      onClick={toggleDrawer(anchor, true)}
                      onKeyDown={toggleDrawer(anchor, true)}
                    >
                      {
                        <SideBar />
                      }
                    </Box>
                  </Drawer>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
      <img
        src={slacklogo}
        className="room-welcome-image"
        alt="" />
      <h4 className='title'>SLACK</h4>
      <p className='tagline'>Make work life simpler, more pleasant and more productive.</p>
    </div>
  )
}

export default RoomWelcome
