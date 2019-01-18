import firebase from 'firebase';

// API details

const config = {
  apiKey: 'AIzaSyCHA5tK-dtM6K_Vh5_ckRN0eE7c2VzZ-5o',
  authDomain: 'onthehunt.firebaseapp.com',
  databaseURL: 'https://onthehunt.firebaseio.com',
  projectId: 'onthehunt',
  storageBucket: 'onthehunt.appspot.com',
  messagingSenderId: '544245579193',
};
firebase.initializeApp(config);

export const f = firebase;
export const database = firebase.database();
export const auth = firebase.auth();
