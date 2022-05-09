import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddIcon from '@mui/icons-material/Add';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CallIcon from '@mui/icons-material/Call';
import { Avatar } from '@mui/material';
import SidebarChannel from './SidebarChannel';
import MicIcon from '@mui/icons-material/Mic';
import HeadsetIcon from '@mui/icons-material/Headset';
import SettingsIcon from '@mui/icons-material/Settings';
import { useSelector } from 'react-redux';
import {selectChannel} from '../../features/channelSlice'
import {selectInfoServer} from '../../features/infoServerSlice'

function Sidebar() {
    const channels = useSelector(selectChannel)
    const { user: currentUser } = useSelector((state) => state.auth);
    const infoServer = useSelector(selectInfoServer)
    const handleAddChannel = () => {
        
    }
  return (
    <div className='sidebar'>
        <div className="sidebar__top">
            <h4>{infoServer.name}</h4>
            <KeyboardArrowDownIcon/>
        </div>
        <div className="sidebar__channels">
            <div className="sidebar__channelsHeader">
                <div className="sidebar__header">
                    <KeyboardArrowDownIcon/>
                    <h5>Text channel</h5>
                </div>
                <AddIcon onClick={handleAddChannel} className='sidebar__addChannel'></AddIcon>
            </div>
            <div className="sidebar__channelsList">
                {channels.map((channel) => (
                    <SidebarChannel key={channel._id} dataFromParent={channel}/>
                ))}
            </div>
        </div>
        <div className="sidebar__voice">
            <SignalCellularAltIcon
                className='sidebar__voiceIcon'
                fontSize='large'
            />
            <div className="sidebar__voiceInfo">
                <h4>Voice connected</h4>
                <p>Play game</p>
            </div>
            <div className="sidebar__voiceIcons">
                <InfoOutlinedIcon/>
                <CallIcon/>
            </div>
        </div>
        <div className="sidebar__profile">
            {/* <Avatar  src={currenUser.user.avatar}/> */}
            <Avatar />
            <div className="sidebar__profileInfo">
                <h5>{currentUser.user.name}</h5>
                <p>#{currentUser.access_token.substring(0,5)}</p>
            </div>
            <div className="sidebar__profileIcon">
                <MicIcon/>
                <HeadsetIcon/>
                <SettingsIcon/>
            </div>
        </div>
    </div>
  )
}

export default Sidebar