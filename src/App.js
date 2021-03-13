import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "./App.css";
import { firebaseConfig } from "./firebase.config";

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

function App() {
    // const [provider, setProvider] = useState(null);
    const provider = new firebase.auth.GoogleAuthProvider();

    const [signedInUser, setSignedInUser] = useState({
        isLogin: false,
        name: "",
        photo: "",
        email: "",
        credential: {},
        token: {},
    });

    /**
     * Google sign in funtion
     * will sign in with google apies
     */
    const handleSignIn = () => {

        firebase
            .auth()
            .signInWithPopup(provider)
            .then((result) => {
                console.log(result);

                const credential = result.credential;
                const token = credential.accessToken;
                const { displayName, email, photoURL } = result.user;

                setSignedInUser({
                    isLogin: true,
                    name: displayName,
                    email: email,
                    credential: credential,
                    token: token,
                    photo: photoURL,
                })
            }).catch((err) => {
              console.log(err);
            })
    }


    const handleSignOut = () => {
        firebase
        .auth().signOut()
        .then(() => {
            setSignedInUser({
                isLogin: false,
                name: '',
                email: '',
                credential: '',
                token: '',
                photo: '',
            });
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <>
            <div className="sign-in-area">
                <div>
                    {signedInUser.isLogin ? (
                        <button onClick={handleSignOut} className="btn w-100 btn-light"> Sign out</button>
                    ) : (
                        <button onClick={handleSignIn} className="btn w-100 btn-light">
                            Sing in
                        </button>
                    )}
                </div>
                {signedInUser.isLogin ? (
                    <div className="card user-details-card mb-3">
                        <img src={signedInUser.photo} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Welcome to, {signedInUser.name}</h5>
                            <p className="card-text">Email: {signedInUser.email}.</p>
                            <p className="card-text">
                                <small className="text-muted">Last updated 3 mins ago</small>
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="user-details-card">
                        <h1>Please login For Continue</h1>
                    </div>
                )}
            </div>
        </>
    );
}

export default App;
