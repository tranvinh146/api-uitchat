import React from 'react'
import Server from '../server/Server'
import Sidebar from '../sidebar/Sidebar'
import Chat from '../chat/Chat'
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import './Home.css'
function Home() {
  const { user: currentUser } = useSelector((state) => state.auth);
  if (!currentUser) {
    return <Redirect to="/login" />;
  }
  return (
    <div className='home'>
        <Server/>
        <Sidebar />
        <Chat />
    </div>
  )
}

export default Home