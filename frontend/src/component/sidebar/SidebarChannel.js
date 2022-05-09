import React from 'react'
import './SidebarChannel.css'
function SidebarChannel(props) {
  return (
    <div className='sidebarChannel'>
        <h5><span className='sidebarChannel__hash'>#</span>{props.dataFromParent.name}</h5>
    </div>
  )
}

export default SidebarChannel