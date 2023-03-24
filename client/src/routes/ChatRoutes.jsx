import React from 'react'
import { Routes, Route } from "react-router-dom"
import Form from '../pages/login/Form/Form'
import Confirm from '../pages/login/Confirm/Confirm'
import PublicLayout from '../pages/layout/PublicLayout'
import ProtectLayout from '../pages/layout/ProtectLayout'
import ChatPage from '../pages/chatpage/ChatPage'
import Entry from '../pages/login/Entry/Entry'
function ChatRoutes() {
    return (
        <div>
            <Routes element={<PublicLayout />}>
                <Route path='/' element={<Entry />} />
                <Route path='form' element={<Form />} />
                <Route path='form/confirm' element={<Confirm />} />
            </Routes>
            <Routes path="/chat" element={<ProtectLayout />}>
                <Route path='home' element={<ChatPage/>}/>
            </Routes>
        </div>
    )
}

export default ChatRoutes
