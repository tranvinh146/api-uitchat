import { Avatar } from '@mui/material'
import React, {useEffect} from 'react'
import {useDispatch, useSelector}  from 'react-redux'
import {fetchServerData, selectServer} from '../../features/serverSlice'
import './Server.css'
import DownloadIcon from '@mui/icons-material/Download';
import ExploreIcon from '@mui/icons-material/Explore';
import AddSerVer from './AddServer'

function Server() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchServerData())
  }, [dispatch])
  const servers = useSelector(selectServer)
  return (
    <div className='server'>
        <div className="server__home">
            <Avatar className='server__avt' src='https://pngset.com/images/discord-icon-background-discord-logo-sphere-graphics-art-moon-transparent-png-792846.png'/>
        </div>
        <div className="server__servers">
            {servers.map((server) => (
              <div className='server__server'>
                <Avatar className='server__avt' src=''/>
                <div class="hide">{server.name}</div>
              </div>
            ))}
        </div>
        <div className="server__footer">
            <ExploreIcon/>
            <DownloadIcon/>
            <AddSerVer/>
        </div>

    </div>
  )
}

export default Server