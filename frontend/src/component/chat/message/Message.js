import { Avatar } from '@mui/material'
import React from 'react'
import './Message.css'
function Message() {
  return (
    <div className='message'>
        <Avatar/>
        <div className="message__info">
            <h4>
                Thang
                <span className='message__timestamp'>1/10/2001</span>
            </h4>
            <p>This is message</p>
        </div>
    </div>

  )
}

export default Message