import React from 'react'
import {Outlet} from "react-router-dom"
import ChatPage from '../chatpage/ChatPage'
function ProtectLayout() {
  return (
    <div>
      <ChatPage/>
      <Outlet/>
    </div>
  )
}

export default ProtectLayout
