import React, { Component } from "react";
import { connect } from "react-redux";
import { auth, db } from "../services/firebase";
class ShowChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: auth().currentUser,
      chats:{},
    };
    this.onChatChange=this.onChatChange.bind(this);
  }
  onChatChange(snapshot){
    console.log('showchat invoke')
        var chats={};
        var y="";
        console.log(snapshot.val())
      snapshot.forEach((snap)=>{
          // chats.push(snap.val())
          var x=snap.val().date
          if(y!=x){
            chats[x]=[]
            y=x;
          }
          console.log(x)
          
          chats[x].push(snap.val())
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
    return (
    <>
      <div className="flex-grow flex-shrink relative order-2 overflow-auto"style={{ flexBasis: "0" }}>
        <div className="visible border-gray-300">
          <div id='chat-view' className="absolute top-0 left-0 flex flex-col h-full w-full overflow-x-hidden overflow-y-auto">
             {Object.keys(this.state.chats).map((chatsOnDate, i) => {
                return(
                <div className='flex flex-col' key={i}> 
                  <div className='text-center w-full py-1 relative sticky top-0' key={i}><div style={{minWidth:'30px' ,padding:'3px 10px',}} className='inline-block bg-white rounded-lg m-auto text-black shadow'>{chatsOnDate}</div></div>
                  {this.state.chats[chatsOnDate].map((chat,j)=>{
                      return(
                       <div className='w-full text-center py-2 my-8' key={j}>
                         <div  className={'rounded-md font-light '+(chat.from===this.state.user.uid?'float-right bg-green-400 text-white mr-4 sm:mr-20':'float-left bg-green-200 text-black ml-4 sm:ml-20')}>
                           <div className='flex justify-end items-end' style={{minWidth:'30px' ,padding:'3px 10px'}}>
                            <div className='pr-2'>{chat.content}</div>
                            <div className=' text-xs font-hairline mb-px h-4 text-black'>{chat.time}</div>
                           </div>
                          </div>
                        </div>
                      )
                  })
                  }
                </div>
                )
              
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
