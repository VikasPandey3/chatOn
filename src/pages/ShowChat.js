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
      chats:[]
    };
  }

  componentDidUpdate(preProp) {
    console.log(preProp.path)
    console.log(this.props.path)
    if(this.props.path!==preProp.path){
      console.log("upadate")
      db.ref(`onetoone/${this.props.path}/chats`).on('value',(snapshot)=>{
        var chats=[]
      snapshot.forEach((snap)=>{
          chats.push(snap.val())
      })
      this.setState({chats:chats})
    })
  }
    const container = document.getElementById("chat-view");
    if (container) {
      container.scrollTo(0, container.scrollHeight);
    } 
  }
  
  render() {
    return (
    <div id="chat-view" className=" flex flex-col bg-white h-full overflow-auto justify-end p-4">
      {this.state.chats.map((chat, i) => {
      return <div key={i}><p className={'p-2 m-2 font-serif rounded-md '+(chat.from===this.state.user.uid?'float-right bg-indigo-400 text-white':'float-left bg-indigo-200 text-black')}>{chat.content}</p></div>
      
      })}
    </div>  
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
