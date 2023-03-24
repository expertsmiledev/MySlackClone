import React, { useContext} from 'react'
import RoomWelcome from '../RoomWelcome/RoomWelcome'
import RoomChat from '../RoomChat/RoomChat'
import { chatContext } from '../../store/ChatContext'
function Room() {
  const {showChat}=useContext(chatContext)
  return (
    <div>
      {
        showChat? (
          <RoomWelcome/>
        ):(
          <RoomChat/>
        )
      }
    </div>
  )
}

export default Room
