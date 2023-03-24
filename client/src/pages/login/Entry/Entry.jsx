import React from 'react'
import "./style.css"
import { Link } from "react-router-dom";
import slacklogo from "../../../assets/images/slack-logo.svg"
function Entry() {
  return (
    <div className='welcome'>
    <img src={slacklogo} alt="" style={{width:"300px",height:"300px"}} />
    <h4 className='title'>SLACK</h4>
    <p className='tagline'>Make work life simpler, more pleasant and more productive.</p>
    <button className='startbtn'><Link className='link' to="/form">Get Started</Link></button>
  </div>
  )
}

export default Entry
