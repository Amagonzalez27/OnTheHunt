import firebase from 'firebase';
import { FB_API } from 'react-native-dotenv';

// API details

const config = {
  apiKey: 'AIzaSyDfyymC1DS8IJTu1oGjscoONyFlgXms0L4',
  authDomain: 'onthehunt-8336a.firebaseapp.com',
  databaseURL: 'https://onthehunt-8336a.firebaseio.com',
  projectId: 'onthehunt-8336a',
  storageBucket: 'onthehunt-8336a.appspot.com',
  messagingSenderId: '692514104587',
};
firebase.initializeApp(config);

export const f = firebase;
export const database = firebase.database();
export const auth = firebase.auth();
