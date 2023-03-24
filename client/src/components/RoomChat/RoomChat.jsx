import React, { useContext, useEffect, useState } from 'react'
import SideBar from '../SideBar/SideBar';
import userpng from "../../assets/images/user.png"
import {
Send,
Menu,
PermMedia
}
  from '@mui/icons-material';
import {
Box,
Drawer,
Button
}
  from '@mui/material';
import io from "socket.io-client"
import { axiosInstance } from "../../network/axiosInstance"
import { chatContext } from '../../store/ChatContext';
const socket = io("https://slackcloneappbygulsen.herokuapp.com", { transports: ['websocket', 'polling', 'flashsocket'] })
import "./style.css"

function RoomChat() {
  const { roomID } = useContext(chatContext)
  const [user, setUser] = useState(null)
  const [file, setFile] = useState(false)
  const [value, setValue] = useState("")
  const [roomDetails, setRoomDetails] = useState(null)
  const [roomMessages, setMessages] = useState([])
  useEffect(() => {
    socket.on("groupmessage", (res) => {
      setMessages((prev) => [...prev, res])
    })
  }, [socket])

  useEffect(() => {
    axiosInstance.get(`/group/get/conservation?id=${roomID}`).then((res) => {
      setRoomDetails(res.data[0].channelName)
      setMessages(res.data[0].conservation)
    })
  }, [roomID])

  useEffect(() => {
    const info = JSON.parse(localStorage.getItem("info"))
    setUser(info)
  }, [])

  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const sendMsg = (e) => {
    const info = JSON.parse(localStorage.getItem("user"))
    e.preventDefault()
    const messageContent = {
      user: info.username,
      message: value,
      messageType: "text",
      room: roomID,
      userİmage: info.image,
      liked: false,
      timeStamp: (new Date(Date.now())).getHours() + ":" + (new Date(Date.now())).getMinutes()
    }
    console.log(messageContent)
    if (value != "") {
      socket.emit("send", messageContent)
      setMessages((prev) => [...prev, messageContent])
      axiosInstance.post(`/group/new/newmessage?id=${roomID}`, {
        user: info.username,
        message: value,
        messageType: "text",
        room: roomID,
        userİmage: info.image,
        liked: false,
        timeStamp: (new Date(Date.now())).getHours() + ":" + (new Date(Date.now())).getMinutes()
      })
      setValue("")
    }
    socket.emit("room", roomID)
  }
  const handleİnput = (e) => {
    setValue(e.target.value)
  }
  return (
    <div className='group-chat'>
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
            <h3>{roomDetails}</h3>
          </div>
        </div>
      </div>
      <div className='chat-container'>
        <div className='group-chat-messagges'>
          {
            roomMessages && (
              roomMessages.map((msg, i) => (
                <div className='group-chat-messagge' key={i}>
                  <div className='messagge-img'>
                    <img
                      style={
                        { width: "50px", height: "50px" }
                      }
                      src={msg.userİmage ? msg.userİmage : userpng} alt="" />
                  </div>
                  <div className='messagge-info'>
                    <div className='messagge-desc'>
                      <span className='sender-name'>{msg?.user}</span>
                      <span className='send-date'>{msg?.timeStamp}</span>
                    </div>
                    <div className='messagge-content'>
                          <p>{msg?.message}</p>
                    </div>
                  </div>
                </div>
              ))
            )
          }
        </div>
      </div>
      <div className='chat-container'>
        <form className='messagge-form'>
          <input
            type="text"
            value={value}
            onChange={handleİnput}
            placeholder='Type a message here' />
            <button
              className='send-btn'
              onClick={sendMsg}>
              <Send style={{ color: "white", fontSize: "17px" }} />
            </button>
        </form>
      </div>
      <div>
      </div>
    </div>

  )
}

export default RoomChat

