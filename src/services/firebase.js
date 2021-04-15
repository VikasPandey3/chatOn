import firebase from "firebase";
const config = {
/* Add your firebase configuration */
apiKey: "AIzaSyAugK31kqa_uU9I2NBJHkFric-FVwVvuuA",
authDomain: "chaton-a0a3c.firebaseapp.com",
databaseURL: "https://chaton-a0a3c.firebaseio.com",
projectId: "chaton-a0a3c",
storageBucket: "chaton-a0a3c.appspot.com",
messagingSenderId: "661716078834",
appId: "1:661716078834:web:1a71df1deb3dfaf729006b",
measurementId: "G-ELGZ48N2CF",
};

firebase.initializeApp(config);
export const auth = firebase.auth;
export const db = firebase.database();
export const serverTime = firebase.database.ServerValue.TIMESTAMP;
export const Storage = firebase.storage()
