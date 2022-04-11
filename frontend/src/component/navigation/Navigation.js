import { Avatar } from '@mui/material'
import React from 'react'
import './Navigation.css'
import DownloadIcon from '@mui/icons-material/Download';
import AddIcon from '@mui/icons-material/Add';
import ExploreIcon from '@mui/icons-material/Explore';
function Navigation() {
  return (
    <div className='navigation'>
        <div className="nav__home">
            <Avatar className='nav__avt' src='https://pngset.com/images/discord-icon-background-discord-logo-sphere-graphics-art-moon-transparent-png-792846.png'/>
        </div>
        <div className="nav__server">
            <Avatar className='nav__avt' src=''/>
            <Avatar className='nav__avt' src=''/>
            <Avatar className='nav__avt' src=''/>
            <Avatar className='nav__avt' src=''/>
        </div>
        <div className="nav__footer">
            <AddIcon/>
            <ExploreIcon/>
            <DownloadIcon/>
        </div>

    </div>
  )
}

export default Navigation