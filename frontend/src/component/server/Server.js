import { Avatar } from '@mui/material'
import React, {useEffect} from 'react'
import {useDispatch, useSelector}  from 'react-redux'
import {fetchServerData, selectServer} from '../../features/serverSlice'
import './Server.css'
import DownloadIcon from '@mui/icons-material/Download';
import AddIcon from '@mui/icons-material/Add';
import ExploreIcon from '@mui/icons-material/Explore';

function Server() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchServerData())
  }, [dispatch])
  const servers = useSelector(selectServer)
  console.log(typeof(servers))
  return (
    <div className='Server'>
        <div className="nav__home">
            <Avatar className='nav__avt' src='https://pngset.com/images/discord-icon-background-discord-logo-sphere-graphics-art-moon-transparent-png-792846.png'/>
        </div>
        <div className="nav__servers">
            {servers.map((server) => (
              <div className='nav__server'>
                <Avatar className='nav__avt' src=''/>
                <div class="hide">{server.name}</div>
              </div>
            ))}
        </div>
        <div className="nav__footer">
            <AddIcon/>
            <ExploreIcon/>
            <DownloadIcon/>
        </div>

    </div>
  )
}

export default Server