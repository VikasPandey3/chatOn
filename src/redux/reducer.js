import { RECIEVED_CHAT_DATA, SET_CURRENT_CHAT_PATH,RECIEVED_MESSAGES_TIMESTAMP } from "./const";

const initChat = {
  path: "",
  reveiver:""
};
const initTimestamp = {
  lastTimestamp:{},
  chats:[]
}
export const chatUpdateReducer = (state = initChat, action) => {
  switch (action.type) {
    case SET_CURRENT_CHAT_PATH:
      if (state.path !== action.payload[0]) {
        console.log("passowner");
        return {
          ...state,
          path: action.payload[0],
          receiver: action.payload[1],
          
        };
      } else {
        return state;
      }
    default:
      return state;
  }
};

export const msgTimestampreducer=(state=initTimestamp,action)=>{
  switch(action.type){
    case RECIEVED_MESSAGES_TIMESTAMP:
      return{
        ...state,
        lastTimestamp:{...action.payload}
      }
      case RECIEVED_CHAT_DATA:
      return{
            ...state,
            chats: action.payload,
          };
      default:
        return state
  }
}