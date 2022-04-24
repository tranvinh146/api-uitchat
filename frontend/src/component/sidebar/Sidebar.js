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

function Sidebar(props) {
    const [channels, setChannels] = useState([])
    const { user: currentUser } = useSelector((state) => state.auth);
    const handleAddChannel = () => {

    }
    const user = props.dataFromParent
  return (
    <div className='sidebar'>
        <div className="sidebar__top">
            <h4>Le Duc Thang</h4>
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
            {console.log(currentUser)}
            {/* <Avatar  src={user.photo}/> */}
            <div className="sidebar__profileInfo">
                {/* <h5>{currentUser.displayName}</h5>
                <p>#{currentUser.user_id.substring(0,5)}</p> */}
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