import React, { useEffect } from 'react'
import Sidebar from '../sidebar/Sidebar'
import './ServerPlace.css'
import {Outlet} from 'react-router-dom'
function ServerPlace() {
    return(
      <div className='serverPlace'>
        <Sidebar/>
        <Outlet/>
      </div>
    )
}
export default ServerPlace