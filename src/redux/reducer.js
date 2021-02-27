import { RECIEVED_CHAT_DATA, CHAT_OWNER,RECIEVED_MESSAGES_TIMESTAMP } from "./const";

const initChat = {
  path: "",
  contactDetail:{},
};
const initTimestamp = {
  lastTimestamp:{},
  chats:[]
}
export const chatUpdateReducer = (state = initChat, action) => {
  switch (action.type) {
    case CHAT_OWNER:
      if (state.path !== action.payload[0]) {
        console.log("passowner");
        return {
          ...state,
          path: action.payload[0],
          contactDetail: action.payload[1],
          
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