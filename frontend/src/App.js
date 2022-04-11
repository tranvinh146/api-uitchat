import React from 'react';
import './App.css';
import Sidebar from './component/sidebar/Sidebar';
import Chat from './component/chat/Chat';
import Navigation from './component/navigation/Navigation';
import Login from './component/login/Login';

import {auth} from './firebase'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {selectUser} from './features/userSlice'
import {login, logout} from './features/userSlice'

function App() {
  
  const dispatch = useDispatch();
  const user = useSelector(selectUser)
  useEffect(() => {
    console.log('eff')
    auth.onAuthStateChanged((authUser) => {
      console.log("user is", authUser)
      if(authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName
          })
        )
      }
      else {
        dispatch(logout())
      }
    })
  }, [dispatch])
  return (
    <div className="app">
      
      {console.log('com1')}
      {user ? (
        <>
          {console.log('com2')}
          <Navigation/>
          <Sidebar />
          <Chat />
        </>
      ): (
        <>
          {console.log('com3')}
          <Login/>
        </>
      )}
      {console.log('com4')}
    </div>
  );
}
export default App;
