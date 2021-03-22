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
{/*<div style={{height:'589px', marginTop:'62px'}} className='overflow-hidden'>
      <div className='grid grid-cols-6 h-full'>
        <div className='hidden sm:block sm:col-span-2 bg-yellow-200 overflow-y-auto'>
          <div className='h-20 bg-green-300 border-b-2'>
            <AddContact userUid={this.state.user.uid}/>
          </div>
          {this.state.contacts.length > 0 ? (
          <>
            {this.state.contacts.map((contact, i) => {
              const path = this.getUid(this.state.user.uid, contact.uid);
              return (
                <Contacts
                  key={i}
                  contactDetail={contact}
                  path={path}
                  userUid={this.state.user.uid}
                />
              );
            })}
          </>
        ) : (
          <div className="p-4">No contacts is available please add contacs</div>
        )}
        </div>
        <div className='col-span-6 sm:col-span-4 bg-teal-700 h-full'>
          <div style={{height:'62px'}}><Status/></div>
          <div  style={{height:'468px'}} className=' flex flex-col bg-white'>
            <div className='flex flex-1 min-h-0' >
              <div className='flex-1 overflow-auto' id="chat-view">
               <ShowChat/>
              </div>       
            </div>
          </div>
          <MessageBox/>
          
        </div>
        </div>
        </div>*/}
const mapStateToProps = (state) => {
  return {
    path: state.getChat.path,
    //ownerDetail: state.getChat.contactDetail,
  };
};

export default connect(mapStateToProps, null)(ShowChat);
