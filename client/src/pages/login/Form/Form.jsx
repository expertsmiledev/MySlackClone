import React, { useState } from 'react'
import Register from '../Register/Register'
import { useContext } from 'react'
import { authContext } from '../../../store/AuthContext'
import Login from '../Login/Login'
import {chatContext} from "../../../store/ChatContext"
function Form() {
    const {account,setAccount}=useContext(chatContext)
  return (
    <div>
        {
            account ? (
                <Register /> 
            ):(
                <Login />
            )
        }
    </div>
  )
}

export default Form
