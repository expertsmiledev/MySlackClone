import React from 'react'
import Channel from '../Channel/Channel';
import UserOptions from '../UserOptions/UserOptions';
import Members from '../Members/Members';
import { useContext } from 'react';
import {chatContext} from "../../store/ChatContext"
function SideBar() {
   const {visible}=useContext(chatContext)
  return (
        <div>
            {
               visible ? (
                  <Channel/> 
               ):(
                  <Members/>
               )
            }
            <UserOptions/>
        </div>
  )
}

export default SideBar
