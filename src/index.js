import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const firebase = require('firebase');
require('firebase/firestore');

// Initialize Firebase
firebase.initializeApp({
    apiKey: "AIzaSyBMlu88elq-PaRO0fLn5jguYtN78nqR028",
    authDomain: "evernote-clone-99383.firebaseapp.com",
    databaseURL: "https://evernote-clone-99383.firebaseio.com",
    projectId: "evernote-clone-99383",
    storageBucket: "evernote-clone-99383.appspot.com",
    messagingSenderId: "399190679188",
    appId: "1:399190679188:web:e7694d6fa0d309d7b9de81"
});

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
