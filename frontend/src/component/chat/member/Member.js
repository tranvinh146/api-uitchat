import React from 'react'
import './Member.css'
import { Avatar } from '@mui/material'

function Member() {
  return (
    <div className='member'>
        <h4 className='member__status'>Online - 2</h4>
        <div className="member__users">
          <div className="member__user user__on">
            <Avatar/>
            <h4>Thang</h4>
          </div>
          <div className="member__user user__on">
            <Avatar/>
            <h4>Nhan</h4>
          </div>
        </div>
        <h4 className='member__status'>Offline - 4</h4>
        <div className="member__users">
          <div className="member__user user__off ">
            <Avatar/>
            <h4>Vinh</h4>
          </div>
          <div className="member__user user__off">
            <Avatar/>
            <h4>Tra</h4>
          </div>
          <div className="member__user user__off">
            <Avatar/>
            <h4>Lan</h4>
          </div>
          <div className="member__user user__off">
            <Avatar/>
            <h4>Quan</h4>
          </div>
          <div className="member__user user__off">
            <Avatar/>
            <h4>Hieu</h4>
          </div>
        </div>
    </div>
  )
}

export default Member