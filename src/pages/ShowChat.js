import React, { Component } from "react";
import { connect } from "react-redux";
import { auth, db } from "../services/firebase";
//import Message from "../components/Message";
//import "../assets/ChatBox.css";
class ShowChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: auth().currentUser,
      chats:[],
    };
    this.onChatChange=this.onChatChange.bind(this);
  }
  onChatChange(snapshot){
    console.log('showchat invoke')
        var chats=[]
        console.log(snapshot.val())
      snapshot.forEach((snap)=>{
          chats.push(snap.val())
      })
      this.setState({chats:chats})
  }
  componentDidUpdate(preProp) {
    console.log(preProp.path)
    console.log(this.props.path)
    console.log("show chat updated")
    if(this.props.path!==preProp.path){
      console.log("path change")
      db.ref(`onetoone/${preProp.path}/chats`).off('value',this.onChatChange)
      db.ref(`onetoone/${this.props.path}/chats`).on('value',this.onChatChange)
  }
   const container = document.getElementById("chat-view");
     if (container) {
       console.log('scroll')
      container.scrollTo(0, container.scrollHeight);
     } 
  }
  
  componentWillUnmount(){
    db.ref(`onetoone/${this.props.path}/chats`).off('value',this.onChatChange)
  }
  render() {
    return (
    <>
      <div className="flex-grow flex-shrink relative order-2"style={{ zIndex: "1", flexBasis: "0" }}>
        <div className="visible border-gray-300">
          <div id='chat-view' className="absolute top-0 left-0 flex flex-col h-full w-full overflow-x-hidden overflow-y-auto">
            {this.state.chats.map((chat, i) => {
                  return <div key={i}><p className={'p-2 m-2 font-serif rounded-md '+(chat.from===this.state.user.uid?'float-right bg-indigo-400 text-white':'float-left bg-indigo-200 text-black')}>{chat.content}</p></div>
        
              })
            }
          </div>
        </div>
      </div>
      
    </> 
    );
  }
}

const mapStateToProps = (state) => {
  return {
    path: state.getChat.path,
    //ownerDetail: state.getChat.contactDetail,
  };
};

export default connect(mapStateToProps, null)(ShowChat);
