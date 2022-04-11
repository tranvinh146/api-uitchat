import React from 'react'
import './Login.css'
import {auth, provider} from '../../firebase'
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function Login() {
    // const signIn = () => {
    //     auth.signInWithPopup(provider).catch((error) => alert(error.message))
    // }
    const signIn = () => {
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // ...
        }).catch((error) => {
            alert(error.message)
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
    });}
    return (
        <div className='login'>
            <div className="login__logo">
                <img src="https://logos-download.com/wp-content/uploads/2021/01/Discord_Logo-1.png" alt="" />
            </div>
            <button onClick={signIn}>SIGN IN</button>
        </div>
    )
}

export default Login