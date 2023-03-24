import React from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { chatContext } from '../../store/ChatContext';
import { axiosInstance } from "../../network/axiosInstance"
import { useEffect, useState, useContext } from 'react';

function Members() {
    const { roomID, setVisible } = useContext(chatContext)
    const [channel, setChannel] = useState(null)
    const [channelDescription, setDescription] = useState(null)
    const [members, setMembers] = useState([])
    useEffect(() => {
        console.log(roomID)
        axiosInstance.get(`/group/get/members?id=${roomID}`).then((res) => {
            setMembers(res.data[0].members)
            setChannel(res.data[0].channelName)
            setDescription(res.data[0].channelDescription)
        })
    }, [roomID])
    const handleClose = () => {
        setVisible(true)
    }
    return (
        <div className='side'>
            <div className='sidebar-header'>
                <button
                    className='addbtn'
                    onClick={handleClose}>
                    < ArrowBackIosIcon
                        style={
                            { width: "20px", height: "20px" }} />
                </button>
                <span className='title'>All Channels</span>
            </div>
            <div className='sidebar-main'>
                <div className='sidebar-description'>
                    <span className='channel-name'>{channel ? channel : ""}</span>
                    <p>{channelDescription ? channelDescription : ""}</p>
                </div>
                <div className='main-title'>
                    <h3>Members</h3>
                </div>
                <div className='sidebar-group'>
                    {
                        members.length > 0 && (
                            members.map((member, index) => (
                                <div className='sidebar-group-item' key={index}>
                                    <img
                                        style={{ width: "50px", height: "50px" }}
                                        src={member ? member.userİmage : ""}
                                        alt=""
                                    />
                                    <span className='group-name'>{member.userName ? member.userName : ""}</span>
                                </div>
                            ))
                        ) 
                    }
                </div>
            </div>
        </div>
    )
}

export default Members
