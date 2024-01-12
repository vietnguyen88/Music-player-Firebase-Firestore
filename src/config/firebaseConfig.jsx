// Import the functions you need from the SDKs you need
import { initializeApp, getApp } from 'firebase/app';
import { getStorage, ref } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA0xXU_0O2clYTkMoUBURopISLR2UgwFfw',
  authDomain: 'music-player-14c90.firebaseapp.com',
  projectId: 'music-player-14c90',
  storageBucket: 'music-player-14c90.appspot.com',
  messagingSenderId: '304678527586',
  appId: '1:304678527586:web:b7d1b43fc5e24fc7eea73b',
  measurementId: 'G-1X7KB44MSS',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firebaseApp = getApp();

export const storage = getStorage(
  firebaseApp,
  'gs://music-player-14c90.appspot.com'
);

const analytics = getAnalytics(app);
