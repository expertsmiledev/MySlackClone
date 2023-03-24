import React, { useState } from 'react'
import Room from '../../components/Room/Room'
import SideBar from '../../components/SideBar/SideBar'
import "./style.css"
function ChatPage() {
    return (
        <div className='chatpage'>
            <div className='sidebar'>
                <SideBar />
            </div>
            <div className='room'>
                <Room/>
            </div>
        </div>
    )
}
export default ChatPage
