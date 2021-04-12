import firebase from "firebase";
const config = {
/* Add your firebase configuration */
};

firebase.initializeApp(config);
export const auth = firebase.auth;
export const db = firebase.database();
export const serverTime = firebase.database.ServerValue.TIMESTAMP;
export const Storage = firebase.storage()
