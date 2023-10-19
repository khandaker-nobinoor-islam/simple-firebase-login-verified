import React, { useState } from 'react';
import app from '../../firebase/firebase.init';
import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";


const Login = () => {
    const [user, setUser] = useState(null);
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const handleGoogleSignIn = () => {
        // console.log('google mama is coming soon')
        signInWithPopup(auth, provider)
        .then(result => {
            const loggedInUser = result.user;
            console.log(loggedInUser);
            setUser(loggedInUser);
        })
        .catch(error => {
            console.log(error);
        })
    }

    const handleGithubSignIn = () => {
        signInWithPopup(auth, githubProvider)
        .then( result => {
            const loggedUser = result.user;
            console.log(loggedUser);
            setUser(loggedUser);
        })
        .catch(error => {
            console.log(error);
        })
    }

    const handleSignOut = () => {
        signOut(auth)
            .then(result => {
                console.log(result)
                setUser(null);
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div>
            {/* user ? logout :sign in */}

            {
                user ?
                <button onClick={handleSignOut}>Sign Out</button> :
                <>
                    <button onClick={handleGoogleSignIn}>Google Login</button>
                    <button onClick={handleGithubSignIn}>Github Login</button>
                </>
            }
            { user && <div>
                <h2>User: {user.displayName}</h2>
                <p>Email: {user.email}</p>
                <img src={user.photoURL} alt="" />
            </div>
            }
        </div>
    );
};

export default Login;