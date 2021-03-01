import {
  RECIEVED_CHAT_DATA,
  SET_CURRENT_CHAT_PATH,
  RECIEVED_MESSAGES_TIMESTAMP,
} from "./const";
import { db } from "../services/firebase";
export const recevedChat = (data) => {
  console.log("cr", data);
  return {
    type: RECIEVED_CHAT_DATA,
    payload: data,
  };
};
/*export const chatOwner = (info) => {
  return {
    type: CHAT_OWNER,
    payload: info,
  };
};*/
export const recivedMsgTime = (listTs) => {
  return {
    type: RECIEVED_MESSAGES_TIMESTAMP,
    payload: listTs,
  };
};

const obj = {
  Listener: null,
  prevPath: "",
};
export const setCurrentChatPath=(path)=>{
  return{
    type:SET_CURRENT_CHAT_PATH,
    payload:path
  }
}
/*export const contactMessages = (x) => {
  return (dispatch) => {
    if (x.path !== obj.prevPath) {
      dispatch(chatOwner([x.path, x.contactDetail]));

      if (obj.Listener !== null && obj.prevPath) {
        db.ref(`onetoone/${obj.prevPath}`).off("value", obj.Listener);

        var listener = db.ref(`onetoone/${x.path}`).on(
          "value",
          (snapshot) => {
            var a = [];
            snapshot.forEach((snap) => {
              a.push(snap.val());
            });
            obj[x.path] = a;
            dispatch(recevedChat(obj[x.path]));
          },
          (error) => {
            console.log("non null listen ", error);
          }
        );
        if (!x.state) {
          dispatch(recevedChat(obj[x.path]));
        }
        obj.Listener = listener;
        obj.prevPath = x.path;
      } else if (obj.Listener === null) {
        var listener1 = db.ref(`onetoone/${x.path}`).on(
          "value",
          (snapshot) => {
            var b = [];
            snapshot.forEach((snap) => {
              b.push(snap.val());
            });
            obj[x.path] = b;
            dispatch(recevedChat(obj[x.path]));
          },
          (error) => {
            console.log("null listen ", error);
          }
        );
        if (!x.state) {
          console.log("isConnected");
          dispatch(recevedChat(obj[x.path]));
        }
        obj.Listener = listener1;
        obj.prevPath = x.path;
      }
    }
  };
};*/
