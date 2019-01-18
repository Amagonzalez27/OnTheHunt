import React from 'react';
import { f, database, auth } from '../../config/firebase_config';
import { GoogleSignin } from 'react-native-google-signin';

const handleFirebaseLogin = (accessToken, options) => {
  auth()
    .signInWithCredential(accessToken)
    .then(data => {
      const user = auth().currentUser;
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = error.credential;
      if (errorCode === 'auth/account-exists-with-different-credential') {
        console.log('Message:', errorMessage);
        console.log('Email:', error.email);
        console.log('Credential:', error.credential);
      }
    });
};

export const GoogleAuth = () => {
  GoogleSignin.getAccessToken()
    .then(token => {
      const accessToken = auth.GoogleAuthProvide.credential(token);
      handleFirebaseLogin(accessToken);
    })
    .catch(error => console.log('Google Login Error:', error))
    .done();
};
