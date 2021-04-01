import React, { Component } from "react";
import { connect } from "react-redux";
import { auth, db } from "../services/firebase";
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
    if(this.props.path!==preProp.path){
      db.ref(`onetoone/${preProp.path}/chats`).off('value',this.onChatChange)
      db.ref(`onetoone/${this.props.path}/chats`).on('value',this.onChatChange)
  }
   const container = document.getElementById("chat-view");
     if (container) {
      container.scrollTo(0, container.scrollHeight);
     } 
  }
  
  componentWillUnmount(){
    db.ref(`onetoone/${this.props.path}/chats`).off('value',this.onChatChange)
  }
  render() {
    var initDate=0;
    var initMonth=0;
    var initYear=0;
    return (
    <>
      <div className="flex-grow flex-shrink relative order-2"style={{ zIndex: "1", flexBasis: "0" }}>
        <div className="visible border-gray-300">
          <div id='chat-view' className="absolute top-0 left-0 flex flex-col h-full w-full overflow-x-hidden overflow-y-auto">
            {this.state.chats.map((chat, i) => {
              var d= new Date(chat.timestamp);
              var date= d.getDate()
              var month= d.getMonth()
              var year=d.getFullYear()
              console.log(year)
              if((date!==initDate||month!=initMonth)||year!==initYear){
                initDate=date
                initMonth=month
                initYear=year
                return(
                <div key={i} className='flex flex-col my-2'> 
                  <div className='text-center w-full py-1'><div style={{minWidth:'30px' ,padding:'3px 10px'}} className='inline-block bg-white rounded-lg m-auto text-black shadow'>{d.toDateString()}</div></div>
                  <div className='w-full text-center'><div style={{minWidth:'30px' ,padding:'3px 10px'}} className={'rounded-md  font-light '+(chat.from===this.state.user.uid?'float-right bg-green-400 text-white mr-4 sm:mr-20':'float-left bg-green-200 text-black ml-4 sm:ml-20')}>{chat.content}</div></div>
                </div>
                )
              }
              else{ 
                return  <div key={i} className='my-2 text-center'><p style={{minWidth:'30px' ,padding:'3px 10px'}} className={'font-light rounded-md '+(chat.from===this.state.user.uid?'float-right bg-green-400 text-white mr-4 sm:mr-20':'float-left bg-green-200 text-black ml-4 sm:ml-20')}>{chat.content}</p></div>
              }
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
  };
};

export default connect(mapStateToProps, null)(ShowChat);
