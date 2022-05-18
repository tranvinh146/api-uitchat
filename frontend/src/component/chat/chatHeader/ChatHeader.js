import React from 'react'
import { useSelector } from 'react-redux';
import './ChatHeader.css'
import NotificationsIcon from '@mui/icons-material/Notifications';
import PushPinIcon from '@mui/icons-material/PushPin';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SearchIcon from '@mui/icons-material/Search';
import InboxIcon from '@mui/icons-material/Inbox';
import HelpIcon from '@mui/icons-material/Help';
import { selectInfoChannel } from '../../../features/infoChannelSlice';

function ChatHeader() {
  const infoChannel = useSelector(selectInfoChannel)
  return (
    <div className='chatHeader'>
        <div className='chatHeader__left'>
            <h3>
                <span className='chatHeader__hash'>#</span>
                {infoChannel.channel.name}
            </h3>
        </div>

        <div className='chatHeader__right'>
            <div className="chatHeader__search">
                <input placeholder='Search' />
                <SearchIcon/>
            </div>
            <NotificationsIcon/>
            <PushPinIcon/>
            <PeopleAltIcon/>
            <InboxIcon/>
            <HelpIcon/>
        </div>
    </div>
  )
}

export default ChatHeader