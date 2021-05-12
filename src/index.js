import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/storage";

function initialize() {
  // [START storage_initialize]
  // Set the configuration for your app
  // TODO: Replace with your app's config object
  var firebaseConfig = {
    apiKey: "AIzaSyCl3oIfPsWIw_u1tvi9T4vO1khHfyDBEoA",
    authDomain: "doogysitter-9e956.firebaseapp.com",
    projectId: "doogysitter-9e956",
    storageBucket: "doogysitter-9e956.appspot.com",
    messagingSenderId: "1006315594122",
    appId: "1:1006315594122:web:696872bf6db385311da873",
    measurementId: "G-GFPJ3KZZ9G"
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app(); // if already initialized, use that one
 }

  // Get a reference to the storage service, which is used to create references in your storage bucket
  var storage = firebase.storage();
  // [END storage_initialize]
}
initialize()


ReactDOM.render(
  <>
    <Router>
    <App />
    </Router>
  </>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
