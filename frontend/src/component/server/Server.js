import { Avatar } from '@mui/material'
import React, {useEffect} from 'react'
import {useDispatch, useSelector}  from 'react-redux'
import { useNavigate, Outlet } from 'react-router-dom'
import {fetchServerData, selectServer} from '../../features/serverSlice'
import { selectChannel } from '../../features/channelSlice'
import './Server.css'
import DownloadIcon from '@mui/icons-material/Download';
import ExploreIcon from '@mui/icons-material/Explore';
import AddSerVer from './AddServer'
import { fetchChannelData } from '../../features/channelSlice'
import {fetchInfoServerData} from '../../features/infoServerSlice'
import {fetchInfoChannelData} from '../../features/infoChannelSlice'

function Server() {
  const { user: currentUser } = useSelector((state) => state.auth);
  const channels = useSelector(selectChannel)
  let navigate = useNavigate()
  useEffect(() => {
    if (!currentUser) {
      navigate('/login')
    }
  },[currentUser])
  const servers = useSelector(selectServer)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchServerData())
  }, [dispatch])
  const handleOpenServer = (serverId) => (
            Promise.resolve(dispatch(fetchChannelData(serverId))).then(
            () => dispatch(fetchInfoServerData(serverId))).then(
              () => dispatch(fetchInfoChannelData(channels[0]._id, serverId)))
            .then(() => navigate(`/servers/${serverId}/${channels[0]._id}`)) 
  )
  return (
    <div className='flexColumn'>
      <div className='server'>
          <div className="server__home">
              <Avatar onClick={() => {navigate("/servers/@me")}} className='server__avt' src='https://pngset.com/images/discord-icon-background-discord-logo-sphere-graphics-art-moon-transparent-png-792846.png'/>
          </div>
          <div className="server__servers">
              {servers.map((server) => (
                <div key={server._id} className='server__server'>
                <Avatar onClick={() => {handleOpenServer(server._id)}} className='server__avt' src=''/>
                  <div className="hide">{server.name}</div>
                </div>
              ))}
          </div>
          <div className="server__footer">
              <AddSerVer dataFromParent={currentUser}/>
          </div>
      </div>
      <div className="server__place">
        <Outlet/>
      </div>
    </div>
  )
}
export default Server