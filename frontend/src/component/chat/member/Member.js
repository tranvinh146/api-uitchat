import React from 'react'
import './Member.css'
import { useSelector } from 'react-redux'
import { Avatar } from '@mui/material'
import {selectInfoServer} from '../../../features/infoServerSlice'
function Member() {
  const infoServer = useSelector(selectInfoServer)
  console.log(infoServer)
  return (
    <div className='member'>
        <h4 className='member__status'>Online - 2</h4>
        <div className="member__users">
          <div className="member__user user__on">
            {infoServer.ownerIds.map((owner) => (
              <>
                <Avatar/>
                <h4>{owner.name}</h4>
              </>
            ))}
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